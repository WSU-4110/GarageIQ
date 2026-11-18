import assert from 'node:assert/strict';
import test from 'node:test';
import { MOD_MAINTENANCE_RULES, getModMaintenanceRecommendations, isInstalledModification } from './modMaintenanceRules.js';

const query = mods => getModMaintenanceRecommendations(mods);
const has = (rs,id) => rs.some(x=>x.id===id);
const recommend = (r,id) => r.find(x=>x.id===id);

test('catalog ids and aliases are unique and nonempty',()=>{
  assert.equal(new Set(MOD_MAINTENANCE_RULES.map(x=>x.id)).size,MOD_MAINTENANCE_RULES.length);
  for (const rule of MOD_MAINTENANCE_RULES) {
    assert.ok(rule.aliases.length && rule.checks.length && rule.why);
    assert.equal(rule.reviewStatus,'DRAFT');
  }
});
test('burble maps produce exhaust checks and conditional ignition checks',()=>{
  const result=query([{category:'Tune',title:'Aggressive Burble Tune',status:'Installed'}]);
  assert.ok(has(result,'exhaust-heat'));
  assert.ok(has(result,'spark-plugs'));
  assert.ok(recommend(result,'spark-plugs').triggers.every(x=>x.conditional));
  assert.equal(recommend(result,'spark-plugs').intervalMiles,null);
});
test('coilovers and camber arms check tire wear and deduplicate checks',()=>{
  const out=query([{category:'Suspension',title:'Coilovers',status:'Installed'},
    {category:'Suspension',title:'Adjustable rear camber arms',status:'Installed'}]);
  assert.equal(out.filter(x=>x.id==='tire-edge-wear').length,1);
  assert.ok(recommend(out,'tire-edge-wear').triggers.length>=2);
  assert.ok(has(out,'alignment'));
});
test('a catback alone never invents a spark plug check',()=>{
  const out=query([{category:'Exhaust',title:'Cat-back exhaust',status:'Installed'}]);
  assert.ok(has(out,'exhaust-mounts'));
  assert.equal(has(out,'spark-plugs'),false);
});
test('planned and researching modifications are ignored',()=>{
  const out=query([{category:'Tune',title:'Stage 2 tune',status:'Planned'},
    {category:'Suspension',title:'Coilovers',status:'Researching'}]);
  assert.deepEqual(out,[]);
});
test('active vehicle isolation is the callers responsibility and rule engine uses only supplied modifications',()=>{
  assert.ok(has(query([{category:'Suspension',title:'Coilovers',status:'Installed'}]),'alignment'));
  assert.equal(has(query([{category:'Brakes',title:'Big brake kit',status:'Installed'}]),'alignment'),false);
});
test('legacy string modifications can match, empty/unknown values cannot',()=>{
  assert.equal(isInstalledModification('coilovers'),true);
  assert.equal(isInstalledModification({title:'coilovers',status:'Planned'}),false);
  assert.ok(has(query(['coilovers']),'alignment'));
  assert.deepEqual(query(['',null,{},{}]),[]);
});
test('uncategorized unknown mods do not get fabricated service checks',()=>{
  assert.deepEqual(query([{category:'Custom',title:'Personalized decorative sticker',status:'Installed'}]),[]);
});
test('unknown category item gets only a modest fallback',()=>{
  const out=query([{category:'Tune',title:'My custom map A',status:'Installed'}]);
  assert.ok(has(out,'engine-logs'));
  assert.equal(has(out,'spark-plugs'),false);
});
test('review engine never invents a numeric schedule',()=>{
  for (const x of query([{title:'JB4 piggyback tuner',category:'Tune',status:'Installed'},
    {title:'Coilovers',category:'Suspension',status:'Installed'}])) {
    assert.equal(x.intervalMiles,null);
    assert.equal(x.intervalMonths,null);
    assert.equal(x.type,'inspection');
  }
});
test('word boundary prevents boost gauge being classified as a boost tune',()=>{
  const out=query([{title:'Boost gauge',category:'Custom',status:'Installed'}]);
  assert.equal(has(out,'spark-plugs'),false);
  assert.ok(has(out,'electrical-connections'));
});
test('representative mod names are recognized across groups',()=>{
  const examples = [
    'JB4 piggyback tuner','Stage 2 tune','Burble Tune','KW V3 Coilovers',
    'Adjustable Rear Camber Arms','Catback Exhaust','Big brake kit',
    'AEM Cold Air Intake','E85 flex fuel kit','APR Oil Catch Can',
    'Lift kit','Air Lift Performance air suspension','Aftermarket wheels',
    'Supercharger kit','Transmission cooler','High output alternator',
    'Short throw shifter','Performance clutch','Tuning box','Roll cage',
  ];
  for (const title of examples) {
    assert.ok(query([{title,status:'Installed'}]).length>0,`Unmatched common mod: ${title}`);
  }
});
test('multiple identical modifications do not change the number of check types',()=>{
  const out=query([{title:'Coilovers',category:'Suspension'},{title:'Coilovers',category:'Suspension'}]);
  assert.equal(new Set(out.map(x=>x.id)).size,out.length);
});

test('window tint gets only film checks and carbonfiber trim triggers no electrical advice',()=>{
  const tint=query([{title:'Window tint',category:'Custom',status:'Installed'}]);
  assert.ok(has(tint,'window-film'));
  assert.equal(has(tint,'electrical-connections'),false);
  const trim=query([{title:'Carbonfiber Trim',category:'Interior',status:'Installed'}]);
  assert.equal(trim.length,0);
});
