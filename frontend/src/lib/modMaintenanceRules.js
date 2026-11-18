// Draft GarageIQ maintenance-impact catalog (review before production use).
// These are component-inspection suggestions, NOT replacement schedules.
// No mileage/time reductions are applied or persisted by this module.
// References support representative mechanical links, not every individual mod.

export const MOD_MAINTENANCE_SOURCES = {
  "S1": {
    "name": "Tire Rack — Lowering suspension and alignment",
    "url": "https://www.tirerack.com/upgrade-garage/how-low-can-i-go"
  },
  "S2": {
    "name": "Continental — Wheel alignment and tire wear",
    "url": "https://www.continental-tires.com/tire-knowledge/wheel-alignment/"
  },
  "S3": {
    "name": "NGK — Plugs in modified engines",
    "url": "https://ngksparkplugs.com/en/resources/special-plugs-modified-engine"
  },
  "S4": {
    "name": "NGK — Spark plug gap and modified engines",
    "url": "https://ngksparkplugs.com/en/resources/set-gap-when-installing-new-plugs"
  },
  "S5": {
    "name": "Garrett — Turbo installation checks",
    "url": "https://www.garrettmotion.com/knowledge-center-category/turbo-replacement/part-1-garrett-turbocharger-installation-guide/"
  },
  "S6": {
    "name": "Garrett — Oil cleanliness and turbo wear",
    "url": "https://www.garrettmotion.com/news/newsroom/article/turbo-damage-oil-leakage-and-external-influences-from-installer-connect-experts/"
  },
  "S7": {
    "name": "K&N — Reusable filter servicing",
    "url": "https://www.knfilters.com/faq"
  },
  "S8": {
    "name": "APR / Holley — Catch-can maintenance",
    "url": "https://documents.holley.com/fsi_catch_can_na.pdf"
  },
  "S9": {
    "name": "Air Lift Performance — Air suspension care",
    "url": "https://www.airliftperformance.com/support/faqs"
  },
  "S10": {
    "name": "Brembo — Brake-fluid compatibility and replacement",
    "url": "https://www.brembo.com/en/solutions/for-your-car/brake-fluid-car"
  },
  "S11": {
    "name": "EBC Brakes — Track-pad inspection",
    "url": "https://www.ebcbrakes.com/products/ebc-bluestuff-ndx-super-street-trackday-brake-pads/"
  },
  "S12": {
    "name": "Continental — Tire up-sizing and clearances",
    "url": "https://www.continental-tires.com/ca/fr/tire-knowledge/how-do-i-properly-up-size-my-tires/"
  },
  "S13": {
    "name": "Continental — Tire wear and care",
    "url": "https://www.continental-tires.com/tire-knowledge/replacing-tires/"
  },
  "S14": {
    "name": "EQT — Technical explanation of burble calibration",
    "url": "https://eqtuning.com/blogs/technical-write-ups/burbles-pops-and-bangs-crackles"
  },
  "S15": {
    "name": "Holley — E85 fuel-care considerations",
    "url": "https://documents.holley.com/199r10659-1rev.pdf"
  },
  "S16": {
    "name": "Tire Rack — Alignment after wheel/suspension changes",
    "url": "https://www.tirerack.com/FAQ/"
  },
  "S17": {
    "name": "Continental — Tire balancing after refit",
    "url": "https://www.continental-tires.com/tire-knowledge/balancing-tires/"
  },
  "S18": {
    "name": "MINI technical bulletin — Aftermarket tune reliability risks",
    "url": "https://static.nhtsa.gov/odi/tsbs/2017/MC-10215026-9999.pdf"
  },
  "S19": {
    "name": "Continental — Tire pressure reference",
    "url": "https://www.continental-tires.com/tire-knowledge/tire-pressure/"
  }
};

export const MOD_MAINTENANCE_CHECKS = {
  "window-film": {
    "group": "Body & exterior",
    "label": "Window tint film condition",
    "action": "Check for peeling, bubbles and damaged film affecting visibility. Follow the film maker's cleaning and cure guidance; no recurring mileage service is implied."
  },
  "body-wrap": {
    "group": "Body & exterior",
    "label": "Wrap and protective film condition",
    "action": "Inspect edges for peeling, lifting or contamination, and follow the film/wrap manufacturer's cleaning advice."
  },
  "spark-plugs": {
    "group": "Ignition",
    "label": "Spark plugs and ignition gap",
    "action": "Inspect plug condition, wear, fouling and misfires; verify plug specification/gap with the engine and calibration supplier. Do not automatically shorten replacement intervals."
  },
  "coil-boots": {
    "group": "Ignition",
    "label": "Ignition coils and boots",
    "action": "Check for misfire codes, damaged coil boots and loose connectors; replace only if diagnosed."
  },
  "engine-oil": {
    "group": "Engine",
    "label": "Engine oil and filter",
    "action": "Monitor oil level, contamination and leaks; follow the engine/oil/tuner service guidance rather than a universal shortened oil interval."
  },
  "engine-leaks": {
    "group": "Engine",
    "label": "Engine seals and fluid leaks",
    "action": "Inspect modified seals, hoses and fittings for oil, coolant or fuel leakage."
  },
  "engine-logs": {
    "group": "Engine",
    "label": "Engine operating health",
    "action": "Check warning lights, misfires and abnormal operating data; have a qualified calibrator review concerning readings."
  },
  "valvetrain": {
    "group": "Engine",
    "label": "Valvetrain inspection",
    "action": "Inspect valvetrain noise, lubrication and clearance only when the engine/parts supplier calls for it."
  },
  "engine-mounts": {
    "group": "Engine",
    "label": "Mounts and fasteners",
    "action": "Inspect engine/transmission mount fasteners, rubber or bushings and nearby hose or wiring clearance."
  },
  "belts-pulleys": {
    "group": "Engine",
    "label": "Belts and pulleys",
    "action": "Inspect belt condition, tracking, pulley alignment and tension to the component manufacturer’s requirements."
  },
  "timing-components": {
    "group": "Engine",
    "label": "Timing components",
    "action": "Monitor timing-belt/chain service requirements and investigate abnormal noise; follow engine-builder specifications."
  },
  "compression-health": {
    "group": "Engine",
    "label": "Engine compression / leakdown",
    "action": "Use compression or leakdown testing when engine symptoms, tuning changes or builder guidance justify it."
  },
  "intake-filter": {
    "group": "Intake",
    "label": "Air filter service",
    "action": "Inspect intake filter condition and clean/replace per its manufacturer and local dust exposure."
  },
  "intake-seals": {
    "group": "Intake",
    "label": "Air intake and sensor connections",
    "action": "Inspect filter/intake mounting, clamps and unmetered-air leaks; check sensor connections."
  },
  "boost-couplers": {
    "group": "Boost",
    "label": "Boost/charge pipes",
    "action": "Inspect couplers, clamps and pipes for leaks, rubbing and heat damage."
  },
  "boost-controls": {
    "group": "Boost",
    "label": "Boost control and hoses",
    "action": "Inspect boost-reference lines, wastegate plumbing, connections and diagnostic codes; check for abnormal boost behavior."
  },
  "turbo-oil": {
    "group": "Boost",
    "label": "Turbo oil feed and drain",
    "action": "Inspect oil feed/drain seals, routing and leaks; maintain clean oil per engine/turbo documentation."
  },
  "turbo-coolant": {
    "group": "Boost",
    "label": "Turbo coolant lines",
    "action": "Inspect water-cooled turbo coolant connections and leaks, if applicable."
  },
  "turbo-hotparts": {
    "group": "Boost",
    "label": "Turbo and exhaust heat shielding",
    "action": "Inspect heat shields, nearby hoses/wiring and hot-side mounting for heat-related deterioration."
  },
  "supercharger-belt": {
    "group": "Boost",
    "label": "Supercharger drive system",
    "action": "Inspect belt, pulleys and tensioner; follow the particular blower drive-system instructions."
  },
  "blower-fluid": {
    "group": "Boost",
    "label": "Supercharger lubricant",
    "action": "Check lubricant level or service only if the specific supercharger manufacturer requires it."
  },
  "fuel-lines": {
    "group": "Fuel",
    "label": "Fuel lines, seals and fittings",
    "action": "Inspect modified fuel lines, connectors and seals for leaks and material compatibility; repair any leaks before driving."
  },
  "fuel-filter": {
    "group": "Fuel",
    "label": "Fuel filter or strainer",
    "action": "Monitor restriction/pressure issues and service filters only to the fuel-system manufacturer’s instructions."
  },
  "fuel-pressure": {
    "group": "Fuel",
    "label": "Fuel pressure and delivery",
    "action": "Verify fuel-delivery pressure and related diagnostic codes when hardware or calibration changes are made."
  },
  "fuel-quality": {
    "group": "Fuel",
    "label": "Fuel type and storage",
    "action": "Confirm fuel compatibility, contamination/water concerns and the correct fuel for the calibration, especially after storage."
  },
  "fuel-injectors": {
    "group": "Fuel",
    "label": "Injector seals and performance",
    "action": "Inspect injector sealing and diagnose leakage, misfires or abnormal fueling after injector changes."
  },
  "watermeth": {
    "group": "Fuel",
    "label": "Water-methanol injection system",
    "action": "Inspect tank, fittings, pump, nozzle and level/failsafe alarms; follow system manufacturer maintenance and calibration guidance."
  },
  "nitrous-system": {
    "group": "Fuel",
    "label": "Nitrous system connections",
    "action": "Inspect bottle mounts, hoses, fittings, arming controls and leaks according to the kit manufacturer; verify ignition/fueling suitability with a professional."
  },
  "catch-can": {
    "group": "Engine",
    "label": "Catch can / PCV separator",
    "action": "Inspect and drain the separator as needed; monitor condensate, hose security and cold-weather restrictions."
  },
  "exhaust-heat": {
    "group": "Exhaust",
    "label": "Exhaust thermal stress / catalyst",
    "action": "Inspect hot-side exhaust components, converter or particulate-filter warning indicators and heat shields for abnormal heat-related damage; maintain emissions compliance."
  },
  "exhaust-mounts": {
    "group": "Exhaust",
    "label": "Exhaust joints and mounting",
    "action": "Inspect gaskets, clamps, flex joints, hangers and contact with nearby underbody components for leaks or rubbing."
  },
  "exhaust-sensors": {
    "group": "Exhaust",
    "label": "Exhaust sensors and fault codes",
    "action": "Check oxygen/temperature sensor wiring and emissions-related fault codes if modified exhaust or thermal changes cause symptoms."
  },
  "exhaust-valves": {
    "group": "Exhaust",
    "label": "Active exhaust valves and actuators",
    "action": "Inspect valve linkage, actuator wiring and abnormal sticking/rattles."
  },
  "coolant-system": {
    "group": "Cooling",
    "label": "Coolant and hose integrity",
    "action": "Inspect coolant level, hoses, clamps and leaks; follow manufacturer coolant specifications."
  },
  "cooling-fans": {
    "group": "Cooling",
    "label": "Fans, radiators and shrouds",
    "action": "Confirm fan operation, airflow clearance, radiator mounting and absence of leaks after cooling changes."
  },
  "thermal-conditions": {
    "group": "Cooling",
    "label": "Operating-temperature trends",
    "action": "Monitor temperature warnings and investigate overheating, including under sustained load."
  },
  "alignment": {
    "group": "Wheels & suspension",
    "label": "Four-wheel alignment",
    "action": "Check alignment after ride-height, control-arm or wheel/tire fitment changes; set values appropriate to the car and use."
  },
  "tire-edge-wear": {
    "group": "Wheels & suspension",
    "label": "Inner/outer tire tread wear",
    "action": "Inspect inner and outer shoulders, feathering and uneven tread wear; excessive camber/toe can shorten tire life."
  },
  "tire-pressure": {
    "group": "Wheels & suspension",
    "label": "Tire pressure and load rating",
    "action": "Check cold pressure and load/speed ratings against the vehicle and tire manufacturers’ guidance."
  },
  "tire-clearance": {
    "group": "Wheels & suspension",
    "label": "Tire and wheel clearance",
    "action": "Inspect rubbing at full steering lock, suspension compression and around brakes, fenders and hoses."
  },
  "tire-track-wear": {
    "group": "Wheels & suspension",
    "label": "Track tire tread and damage",
    "action": "Inspect tread depth, cuts, heat-related wear and damage before/after demanding use; follow tire manufacturer limits."
  },
  "tire-rotation": {
    "group": "Wheels & suspension",
    "label": "Tire rotation suitability",
    "action": "Rotate tires only where sizes, directional design and drivetrain requirements permit; monitor uneven wear."
  },
  "wheel-fasteners": {
    "group": "Wheels & suspension",
    "label": "Wheel and hub fasteners",
    "action": "Verify compatible wheel hardware, seat type and torque/recheck practice from the wheel/vehicle supplier."
  },
  "wheel-balance": {
    "group": "Wheels & suspension",
    "label": "Wheel balance and vibration",
    "action": "Balance wheel/tire assemblies after fitting and investigate vibration, bent rims and lost weights."
  },
  "wheel-bearings": {
    "group": "Wheels & suspension",
    "label": "Wheel bearings and steering feel",
    "action": "Investigate play, noise and vibration, especially after substantial fitment/load changes."
  },
  "beadlock-fasteners": {
    "group": "Wheels & suspension",
    "label": "Beadlock ring fasteners",
    "action": "Follow wheel maker’s beadlock-specific fastener inspection and torque procedure; verify road legality where relevant."
  },
  "shift-linkage": {
    "group": "Driveline",
    "label": "Shift linkage and cables",
    "action": "Inspect shifter linkage, cable adjustment and bushings for looseness or binding after installation."
  },
  "suspension-joints": {
    "group": "Suspension",
    "label": "Control arms, joints and mounts",
    "action": "Inspect ball joints, control arms, rod ends, bushings and fasteners for looseness, damage or noise."
  },
  "coilover-condition": {
    "group": "Suspension",
    "label": "Coilover / damper condition",
    "action": "Inspect shock leakage, spring seat locking rings, threads, mounts and clearance."
  },
  "air-suspension": {
    "group": "Suspension",
    "label": "Air suspension bags and airlines",
    "action": "Check air-spring clearance, line routing, fittings, leaks and compressor operation."
  },
  "air-tank": {
    "group": "Suspension",
    "label": "Air tank moisture / dryer",
    "action": "Drain moisture and inspect water trap or dryer as recommended by the air-suspension supplier."
  },
  "chassis-fasteners": {
    "group": "Suspension",
    "label": "Chassis reinforcement and mounts",
    "action": "Inspect mounting bolts, welds and adjacent fatigue/corrosion around added chassis parts."
  },
  "cv-boots": {
    "group": "Driveline",
    "label": "CV boots and axle angles",
    "action": "Inspect CV boots, joints and operating angles after suspension height or driveline changes."
  },
  "driveline-vibration": {
    "group": "Driveline",
    "label": "Driveline vibration and joints",
    "action": "Inspect universal joints, couplers, mounts and shaft clearances if added driveline load or vibration occurs."
  },
  "clutch-wear": {
    "group": "Driveline",
    "label": "Clutch operation and wear",
    "action": "Monitor slipping, engagement noise and abnormal launch behavior; follow clutch maker break-in/service guidance."
  },
  "clutch-hydraulics": {
    "group": "Driveline",
    "label": "Clutch hydraulics",
    "action": "Inspect clutch master/slave cylinders, lines and fluid leakage; follow specified fluid and bleed instructions."
  },
  "gearbox-fluid": {
    "group": "Driveline",
    "label": "Gearbox / transmission fluid",
    "action": "Monitor leaks and operating behavior; use required fluid specification and service plan for the modified transmission."
  },
  "differential-fluid": {
    "group": "Driveline",
    "label": "Differential oil and seals",
    "action": "Verify the differential manufacturer’s specified gear oil/friction modifier and inspect seals, leaks and noises."
  },
  "transfer-case": {
    "group": "Driveline",
    "label": "Transfer case / 4WD system",
    "action": "Inspect transfer-case seals, lubricant and drivetrain engagement under the relevant manufacturer schedule."
  },
  "transmission-cooling": {
    "group": "Driveline",
    "label": "Transmission temperature / cooler",
    "action": "Inspect cooler hoses and connections and monitor transmission temperature under higher load."
  },
  "brake-pads": {
    "group": "Brakes",
    "label": "Brake pad thickness and wear",
    "action": "Inspect pad thickness, glazing and uneven wear; high-load/track setups require usage-appropriate checks."
  },
  "brake-rotors": {
    "group": "Brakes",
    "label": "Brake rotors and heat damage",
    "action": "Inspect rotor thickness and surface condition for cracks, heat damage or uneven wear; follow rotor maker discard limits."
  },
  "brake-fluid": {
    "group": "Brakes",
    "label": "Brake fluid condition/specification",
    "action": "Use the vehicle/brake supplier’s approved brake fluid; inspect fluid condition and monitor temperature-related fade or service requirements."
  },
  "brake-lines": {
    "group": "Brakes",
    "label": "Brake lines and fittings",
    "action": "Inspect hoses and braided lines for rubbing, kinks, leaks, correct routing and secure connections."
  },
  "brake-clearance": {
    "group": "Brakes",
    "label": "Brake/wheel clearance",
    "action": "Verify caliper, wheel, spoke and brake-hose clearance through steering and suspension travel."
  },
  "brake-calipers": {
    "group": "Brakes",
    "label": "Brake calipers and mounting",
    "action": "Inspect caliper fasteners, slider/piston condition and signs of overheating or leaks."
  },
  "brake-bias": {
    "group": "Brakes",
    "label": "Brake balance and warning systems",
    "action": "Check brake balance, electronic warnings and safe pedal operation after hydraulic/bias changes; use qualified inspection."
  },
  "electrical-connections": {
    "group": "Electrical",
    "label": "Wiring, grounds and fuses",
    "action": "Inspect added wiring routing, protective fuses, connectors and grounding for corrosion, abrasion or overheating."
  },
  "charging-system": {
    "group": "Electrical",
    "label": "Battery and charging system",
    "action": "Monitor starting/charging behavior and inspect battery terminals and mounting with added electrical loads."
  },
  "aux-battery": {
    "group": "Electrical",
    "label": "Auxiliary battery system",
    "action": "Inspect isolators, fuses, battery attachment, charging compatibility and ventilation/thermal protections per supplier."
  },
  "body-mounts": {
    "group": "Body & safety",
    "label": "Body kit / underbody fasteners",
    "action": "Inspect brackets, clips and mounting points for rubbing, loosening, cracks or corrosion."
  },
  "aero-mounts": {
    "group": "Body & safety",
    "label": "Aero mounting and ground clearance",
    "action": "Inspect splitter/wing/diffuser brackets, fasteners and clearance after impacts or demanding use."
  },
  "seat-mounts": {
    "group": "Body & safety",
    "label": "Seat rails, mounts and restraints",
    "action": "Inspect seat mounts, fasteners and seatbelt/airbag functionality after seat changes; use approved parts."
  },
  "harness-safety": {
    "group": "Body & safety",
    "label": "Harness and roll-bar safety",
    "action": "Inspect belts, anchors, cage attachment and applicable certifications/expiration information; verify appropriate road/track setup."
  },
  "roof-load": {
    "group": "Body & safety",
    "label": "Roof rack / cargo attachments",
    "action": "Inspect rack fasteners, load limits, roof seals and the condition of mounted cargo."
  },
  "towing-checks": {
    "group": "Body & safety",
    "label": "Trailer and towing checks",
    "action": "Inspect hitch mounting, trailer wiring, tire loading and cooling/braking behavior within vehicle ratings."
  },
  "offroad-damage": {
    "group": "Body & safety",
    "label": "Underbody and off-road damage",
    "action": "Inspect skid plates, trapped debris, exposed hoses, protective mounts and damage after off-road driving."
  },
  "windshield-visibility": {
    "group": "Body & safety",
    "label": "Glass, lighting and visibility",
    "action": "Verify modifications preserve legal, unobstructed visibility and lighting operation."
  }
};

export const MOD_MAINTENANCE_RULES = [
  {
    "id": "ecu-performance",
    "group": "Tuning",
    "modification": "ECU performance/stage tune",
    "aliases": [
      "stage 1 tune",
      "stage 2 tune",
      "stage 1 ecu tune",
      "stage 2 ecu tune",
      "ecu stage 1 tune",
      "ecu stage 2 tune",
      "stage 1 ecu remap",
      "stage 2 ecu remap",
      "performance ecu tune",
      "ecu remap",
      "ecu performance tune",
      "stage 3 tune",
      "custom dyno tune",
      "engine remap",
      "chip tune",
      "chiptune",
      "race tune"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "spark-plugs",
        "conditional": true
      },
      {
        "checkId": "coil-boots",
        "conditional": true
      },
      {
        "checkId": "engine-logs",
        "conditional": false
      },
      {
        "checkId": "engine-oil",
        "conditional": true
      }
    ],
    "why": "Higher cylinder pressures or altered fueling can make ignition health and operating data more important.",
    "sourceIds": [
      "S3",
      "S4",
      "S18"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "piggyback",
    "group": "Tuning",
    "modification": "Piggyback/JB4 performance module",
    "aliases": [
      "jb4",
      "piggyback tuner",
      "piggyback tune",
      "racechip",
      "tuning box",
      "power module"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "engine-logs",
        "conditional": false
      },
      {
        "checkId": "spark-plugs",
        "conditional": true
      },
      {
        "checkId": "boost-couplers",
        "conditional": true
      }
    ],
    "why": "A piggyback may change boost or fueling; monitor drivability and verify approved calibration.",
    "sourceIds": [
      "S3",
      "S18"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "burble",
    "group": "Tuning",
    "modification": "Burble / pops-and-bangs tune",
    "aliases": [
      "burble tune",
      "pops and bangs",
      "pop and bang",
      "pops & bangs",
      "crackle tune",
      "crackle map",
      "overrun tune",
      "burble map",
      "exhaust pop tune",
      "flame tune"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "exhaust-heat",
        "conditional": false
      },
      {
        "checkId": "exhaust-mounts",
        "conditional": false
      },
      {
        "checkId": "spark-plugs",
        "conditional": true
      },
      {
        "checkId": "coil-boots",
        "conditional": true
      }
    ],
    "why": "Overrun ignition/fuel changes primarily affect exhaust heat and emissions hardware; ignition checks are conditional on fouling or misfires.",
    "sourceIds": [
      "S14",
      "S3"
    ],
    "reviewStatus": "DRAFT",
    "notes": "Do NOT mark spark plugs due solely because a burble tune exists. No forced interval reduction."
  },
  {
    "id": "antilag",
    "group": "Tuning",
    "modification": "Anti-lag system",
    "aliases": [
      "anti lag",
      "antilag",
      "rolling anti lag",
      "rolling antilag"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "exhaust-heat",
        "conditional": false
      },
      {
        "checkId": "turbo-hotparts",
        "conditional": false
      },
      {
        "checkId": "spark-plugs",
        "conditional": true
      },
      {
        "checkId": "engine-logs",
        "conditional": false
      }
    ],
    "why": "Aggressive anti-lag adds thermal and mechanical stress; follow motorsport system documentation.",
    "sourceIds": [
      "S5",
      "S14"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "launch-control",
    "group": "Tuning",
    "modification": "Launch control / two-step",
    "aliases": [
      "launch control",
      "2 step",
      "two step",
      "flat foot shift",
      "no lift shift",
      "nls tune"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "clutch-wear",
        "conditional": true
      },
      {
        "checkId": "driveline-vibration",
        "conditional": true
      },
      {
        "checkId": "engine-logs",
        "conditional": false
      },
      {
        "checkId": "exhaust-heat",
        "conditional": true
      }
    ],
    "why": "Repeated hard launches or ignition-cut operation can stress driveline components, and some configurations increase exhaust heat.",
    "sourceIds": [
      "S18"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "boost-tune",
    "group": "Tuning",
    "modification": "Higher boost / boost-target tune",
    "aliases": [
      "high boost tune",
      "increased boost",
      "boost increase",
      "boost map",
      "boost controller tune",
      "boost target",
      "higher boost"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "spark-plugs",
        "conditional": false
      },
      {
        "checkId": "boost-couplers",
        "conditional": false
      },
      {
        "checkId": "boost-controls",
        "conditional": false
      },
      {
        "checkId": "engine-oil",
        "conditional": true
      }
    ],
    "why": "Boost-pressure increases warrant checking ignition gap and charge-system sealing.",
    "sourceIds": [
      "S3",
      "S4",
      "S5"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "flex-fuel-map",
    "group": "Tuning",
    "modification": "Flex-fuel / ethanol ECU map",
    "aliases": [
      "flex fuel tune",
      "flexfuel tune",
      "e85 tune",
      "e85 map",
      "ethanol tune",
      "e30 tune",
      "e50 tune"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "fuel-lines",
        "conditional": false
      },
      {
        "checkId": "fuel-quality",
        "conditional": false
      },
      {
        "checkId": "fuel-pressure",
        "conditional": true
      },
      {
        "checkId": "spark-plugs",
        "conditional": true
      }
    ],
    "why": "Fuel composition and the calibration must agree, and fuel-system materials must be compatible.",
    "sourceIds": [
      "S15",
      "S3"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "diesel-performance",
    "group": "Tuning",
    "modification": "Diesel power tune",
    "aliases": [
      "diesel tune",
      "diesel remap",
      "diesel stage 1",
      "diesel performance map"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "engine-logs",
        "conditional": false
      },
      {
        "checkId": "boost-couplers",
        "conditional": false
      },
      {
        "checkId": "transmission-cooling",
        "conditional": true
      },
      {
        "checkId": "exhaust-heat",
        "conditional": true
      }
    ],
    "why": "Increased diesel torque and sustained load may stress charge plumbing and drivetrain; maintain emissions compliance.",
    "sourceIds": [
      "S18"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "transmission-tune",
    "group": "Tuning",
    "modification": "Transmission / TCU tune",
    "aliases": [
      "tcu tune",
      "dsg tune",
      "transmission tune",
      "gearbox tune",
      "shift tune"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "gearbox-fluid",
        "conditional": false
      },
      {
        "checkId": "transmission-cooling",
        "conditional": true
      },
      {
        "checkId": "driveline-vibration",
        "conditional": true
      }
    ],
    "why": "Changed shift behavior requires monitoring fluid compatibility, temperatures and drivability.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "governor-speed",
    "group": "Tuning",
    "modification": "Raised rev limit / launch map",
    "aliases": [
      "raised rev limiter",
      "raised redline",
      "higher redline",
      "rev limit tune",
      "hardcut limiter"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "valvetrain",
        "conditional": true
      },
      {
        "checkId": "engine-oil",
        "conditional": true
      },
      {
        "checkId": "engine-logs",
        "conditional": false
      }
    ],
    "why": "Higher engine-speed use can raise loads; confirm builder/manufacturer guidance before changing any service schedule.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "cold-air-intake",
    "group": "Intake & boost",
    "modification": "Cold-air / short-ram intake",
    "aliases": [
      "cold air intake",
      "short ram intake",
      "aftermarket intake",
      "air intake kit",
      "intake system"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "intake-filter",
        "conditional": false
      },
      {
        "checkId": "intake-seals",
        "conditional": false
      }
    ],
    "why": "Aftermarket intake filters and clamps need installation and condition checks.",
    "sourceIds": [
      "S7"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "oiled-filter",
    "group": "Intake & boost",
    "modification": "Washable/oiled cotton air filter",
    "aliases": [
      "oiled filter",
      "oiled air filter",
      "k&n filter",
      "kn air filter",
      "washable filter",
      "cotton gauze filter"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "intake-filter",
        "conditional": false
      },
      {
        "checkId": "intake-seals",
        "conditional": true
      }
    ],
    "why": "Cleaning and re-oiling intervals depend on the actual filter and exposure.",
    "sourceIds": [
      "S7"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "foam-filter",
    "group": "Intake & boost",
    "modification": "Foam air filter",
    "aliases": [
      "foam air filter",
      "pod filter",
      "performance cone filter",
      "cone air filter"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "intake-filter",
        "conditional": false
      },
      {
        "checkId": "intake-seals",
        "conditional": false
      }
    ],
    "why": "Filter material and driving conditions determine care requirements.",
    "sourceIds": [
      "S7"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "turbo-upgrade",
    "group": "Intake & boost",
    "modification": "Larger / upgraded turbocharger",
    "aliases": [
      "big turbo",
      "upgraded turbo",
      "turbo upgrade",
      "turbo kit",
      "single turbo conversion",
      "twin turbo conversion",
      "hybrid turbo",
      "aftermarket turbo"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "turbo-oil",
        "conditional": false
      },
      {
        "checkId": "turbo-coolant",
        "conditional": false
      },
      {
        "checkId": "boost-couplers",
        "conditional": false
      },
      {
        "checkId": "turbo-hotparts",
        "conditional": false
      },
      {
        "checkId": "spark-plugs",
        "conditional": true
      },
      {
        "checkId": "engine-oil",
        "conditional": false
      }
    ],
    "why": "Turbocharger upgrades rely on proper filtered air, lubrication, plumbing and calibration.",
    "sourceIds": [
      "S5",
      "S6",
      "S3"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "supercharger",
    "group": "Intake & boost",
    "modification": "Supercharger kit / pulley upgrade",
    "aliases": [
      "supercharger kit",
      "aftermarket supercharger",
      "roots blower",
      "centrifugal supercharger",
      "blower kit",
      "supercharger pulley",
      "smaller pulley kit"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "supercharger-belt",
        "conditional": false
      },
      {
        "checkId": "blower-fluid",
        "conditional": true
      },
      {
        "checkId": "boost-couplers",
        "conditional": false
      },
      {
        "checkId": "spark-plugs",
        "conditional": true
      },
      {
        "checkId": "engine-logs",
        "conditional": false
      }
    ],
    "why": "A driven compressor introduces drive-belt/charge plumbing checks; lubrication needs depend on model.",
    "sourceIds": [
      "S3"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "intercooler",
    "group": "Intake & boost",
    "modification": "Front-mount / upgraded intercooler",
    "aliases": [
      "front mount intercooler",
      "front-mount intercooler",
      "fmic",
      "upgraded intercooler",
      "intercooler kit",
      "top mount intercooler",
      "tmic"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "boost-couplers",
        "conditional": false
      },
      {
        "checkId": "intake-seals",
        "conditional": false
      }
    ],
    "why": "New charge piping and mounts should be checked for leaks and rub points.",
    "sourceIds": [
      "S5"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "charge-pipes",
    "group": "Intake & boost",
    "modification": "Charge pipes / turbo inlet",
    "aliases": [
      "charge pipe",
      "chargepipe",
      "boost pipe",
      "turbo inlet",
      "inlet pipe",
      "silicone coupler",
      "silicone intake hose"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "boost-couplers",
        "conditional": false
      },
      {
        "checkId": "intake-seals",
        "conditional": false
      }
    ],
    "why": "Modified pressurized-air joints can loosen or rub.",
    "sourceIds": [
      "S5"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "boost-control",
    "group": "Intake & boost",
    "modification": "Electronic / manual boost controller",
    "aliases": [
      "ebcs",
      "3 port boost",
      "three port boost",
      "electronic boost controller",
      "manual boost controller",
      "boost solenoid"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "boost-controls",
        "conditional": false
      },
      {
        "checkId": "boost-couplers",
        "conditional": false
      },
      {
        "checkId": "engine-logs",
        "conditional": false
      }
    ],
    "why": "Boost solenoid and reference-line failures can cause abnormal pressure.",
    "sourceIds": [
      "S5"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "bov",
    "group": "Intake & boost",
    "modification": "Blow-off / bypass valve",
    "aliases": [
      "blow off valve",
      "blow-off valve",
      "bov",
      "diverter valve",
      "recirculation valve",
      "bpv"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "boost-couplers",
        "conditional": false
      },
      {
        "checkId": "boost-controls",
        "conditional": false
      },
      {
        "checkId": "engine-logs",
        "conditional": true
      }
    ],
    "why": "Valve installation and vacuum plumbing can affect boost sealing and drivability.",
    "sourceIds": [
      "S5"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "wastegate",
    "group": "Intake & boost",
    "modification": "External wastegate / actuator",
    "aliases": [
      "external wastegate",
      "wastegate actuator",
      "boost actuator",
      "screamer pipe"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "boost-controls",
        "conditional": false
      },
      {
        "checkId": "exhaust-heat",
        "conditional": false
      },
      {
        "checkId": "exhaust-mounts",
        "conditional": false
      }
    ],
    "why": "Wastegate plumbing and hot-side routing require secure mounting and leak checks.",
    "sourceIds": [
      "S5"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "intake-manifold",
    "group": "Intake & boost",
    "modification": "Aftermarket intake manifold / throttle body",
    "aliases": [
      "intake manifold upgrade",
      "aftermarket intake manifold",
      "ported intake manifold",
      "bigger throttle body",
      "larger throttle body"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "intake-seals",
        "conditional": false
      },
      {
        "checkId": "engine-logs",
        "conditional": true
      }
    ],
    "why": "Changed intake seals and controls warrant leak and drivability checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "snorkel",
    "group": "Intake & boost",
    "modification": "Snorkel / raised air intake",
    "aliases": [
      "intake snorkel",
      "raised air intake",
      "offroad snorkel",
      "off road snorkel"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "intake-seals",
        "conditional": false
      },
      {
        "checkId": "intake-filter",
        "conditional": false
      },
      {
        "checkId": "offroad-damage",
        "conditional": false
      }
    ],
    "why": "Exposed intake plumbing needs seal and filter inspections, especially after dusty/wet travel.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "catback",
    "group": "Exhaust",
    "modification": "Cat-back / axle-back exhaust",
    "aliases": [
      "catback exhaust",
      "cat back exhaust",
      "cat-back exhaust",
      "axle back exhaust",
      "axleback exhaust",
      "muffler delete",
      "performance muffler",
      "resonator delete",
      "straight pipe exhaust"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "exhaust-mounts",
        "conditional": false
      },
      {
        "checkId": "exhaust-sensors",
        "conditional": true
      }
    ],
    "why": "New exhaust joints/hangers can leak or rub; a muffler alone is not a reason to shorten spark-plug intervals.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "headers",
    "group": "Exhaust",
    "modification": "Headers / exhaust manifold",
    "aliases": [
      "performance headers",
      "long tube headers",
      "longtube headers",
      "shorty headers",
      "aftermarket exhaust manifold",
      "exhaust header"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "exhaust-mounts",
        "conditional": false
      },
      {
        "checkId": "exhaust-heat",
        "conditional": false
      },
      {
        "checkId": "exhaust-sensors",
        "conditional": true
      }
    ],
    "why": "Exhaust manifold fitment changes heat, gaskets and sensor routing.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "downpipe",
    "group": "Exhaust",
    "modification": "Aftermarket downpipe",
    "aliases": [
      "downpipe",
      "down pipe",
      "turbo downpipe",
      "high flow downpipe"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "exhaust-mounts",
        "conditional": false
      },
      {
        "checkId": "exhaust-heat",
        "conditional": false
      },
      {
        "checkId": "exhaust-sensors",
        "conditional": false
      }
    ],
    "why": "Downpipe work may affect heat shielding, sensor positioning, leak points and compliance.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "sports-cat",
    "group": "Exhaust",
    "modification": "High-flow catalyst / sports cat",
    "aliases": [
      "high flow catalytic",
      "high flow cat",
      "sports cat",
      "sport cat",
      "high flow catted"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "exhaust-heat",
        "conditional": false
      },
      {
        "checkId": "exhaust-sensors",
        "conditional": false
      },
      {
        "checkId": "exhaust-mounts",
        "conditional": false
      }
    ],
    "why": "Catalyst changes warrant heat, leaks and emissions-readiness checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "cat-delete",
    "group": "Exhaust",
    "modification": "Catalyst/DPF delete or emissions alteration",
    "aliases": [
      "catless downpipe",
      "cat delete",
      "catalytic converter delete",
      "dpf delete",
      "egr delete",
      "gpf delete",
      "op f delete"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "exhaust-heat",
        "conditional": false
      },
      {
        "checkId": "exhaust-sensors",
        "conditional": false
      },
      {
        "checkId": "exhaust-mounts",
        "conditional": false
      }
    ],
    "why": "Changes to emissions hardware can affect warning systems and heat behavior; check applicable laws and restore compliance.",
    "sourceIds": [
      "S18"
    ],
    "reviewStatus": "DRAFT",
    "notes": "Do not provide instructions to defeat emissions equipment; informational checks only."
  },
  {
    "id": "valved-exhaust",
    "group": "Exhaust",
    "modification": "Valved / active exhaust",
    "aliases": [
      "valved exhaust",
      "active exhaust",
      "exhaust cutout",
      "exhaust valve controller",
      "electric cutout"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "exhaust-valves",
        "conditional": false
      },
      {
        "checkId": "exhaust-mounts",
        "conditional": false
      },
      {
        "checkId": "electrical-connections",
        "conditional": false
      }
    ],
    "why": "Added actuator hardware needs mounting and wiring checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "exhaust-wrap",
    "group": "Exhaust",
    "modification": "Exhaust wrap / thermal blanket",
    "aliases": [
      "exhaust wrap",
      "turbo blanket",
      "heat wrap",
      "thermal blanket",
      "heat shield wrap"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "turbo-hotparts",
        "conditional": false
      },
      {
        "checkId": "exhaust-heat",
        "conditional": false
      },
      {
        "checkId": "body-mounts",
        "conditional": true
      }
    ],
    "why": "Heat-management changes should be inspected for fraying, component clearance and trapped heat.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "e85-hardware",
    "group": "Fuel",
    "modification": "E85 / flex-fuel hardware conversion",
    "aliases": [
      "e85 conversion",
      "flex fuel conversion",
      "flex fuel kit",
      "ethanol sensor",
      "flexfuel sensor",
      "e85 kit"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "fuel-lines",
        "conditional": false
      },
      {
        "checkId": "fuel-quality",
        "conditional": false
      },
      {
        "checkId": "fuel-pressure",
        "conditional": false
      },
      {
        "checkId": "fuel-filter",
        "conditional": true
      }
    ],
    "why": "Ethanol compatibility, seal integrity and fuel composition are critical after conversion.",
    "sourceIds": [
      "S15"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "injectors",
    "group": "Fuel",
    "modification": "Larger fuel injectors / rail",
    "aliases": [
      "bigger injectors",
      "larger injectors",
      "fuel injector upgrade",
      "injector upgrade",
      "aftermarket fuel rail",
      "fuel rail upgrade"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "fuel-injectors",
        "conditional": false
      },
      {
        "checkId": "fuel-pressure",
        "conditional": false
      },
      {
        "checkId": "fuel-lines",
        "conditional": false
      }
    ],
    "why": "Changed injectors/rail connections require sealing and pressure checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "fuel-pump",
    "group": "Fuel",
    "modification": "Upgraded fuel pump / pressure regulator",
    "aliases": [
      "high pressure fuel pump",
      "hpfp",
      "upgraded fuel pump",
      "fuel pump upgrade",
      "fuel pressure regulator",
      "lpfp upgrade",
      "auxiliary fuel pump"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "fuel-pressure",
        "conditional": false
      },
      {
        "checkId": "fuel-lines",
        "conditional": false
      },
      {
        "checkId": "fuel-filter",
        "conditional": true
      }
    ],
    "why": "Modified pump or regulation hardware requires leak and pressure monitoring.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "fuel-cell",
    "group": "Fuel",
    "modification": "Fuel cell / surge tank",
    "aliases": [
      "fuel cell",
      "surge tank",
      "fuel surge tank",
      "fuel catch tank",
      "race fuel tank"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "fuel-lines",
        "conditional": false
      },
      {
        "checkId": "fuel-filter",
        "conditional": false
      },
      {
        "checkId": "body-mounts",
        "conditional": false
      }
    ],
    "why": "Fuel-cell routing, secure mounts and line integrity require regular inspection.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "water-meth",
    "group": "Fuel",
    "modification": "Water/meth injection",
    "aliases": [
      "water meth injection",
      "water methanol injection",
      "meth kit",
      "methanol injection",
      "wmi kit"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "watermeth",
        "conditional": false
      },
      {
        "checkId": "fuel-lines",
        "conditional": false
      },
      {
        "checkId": "engine-logs",
        "conditional": true
      }
    ],
    "why": "Pump, nozzle, fluid supply and failsafe malfunction can affect engine operation.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "nitrous",
    "group": "Fuel",
    "modification": "Nitrous oxide system",
    "aliases": [
      "nitrous kit",
      "nitrous oxide",
      "nos kit",
      "nitrous injection",
      "wet shot nitrous",
      "dry shot nitrous"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "nitrous-system",
        "conditional": false
      },
      {
        "checkId": "spark-plugs",
        "conditional": false
      },
      {
        "checkId": "fuel-pressure",
        "conditional": false
      },
      {
        "checkId": "engine-logs",
        "conditional": true
      }
    ],
    "why": "Nitrous applications need kit-specific leakage, spark and fueling checks.",
    "sourceIds": [
      "S3"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "catch-can",
    "group": "Engine & cooling",
    "modification": "Oil catch can",
    "aliases": [
      "oil catch can",
      "catch can",
      "pcv catch can",
      "oil separator"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "catch-can",
        "conditional": false
      },
      {
        "checkId": "intake-seals",
        "conditional": false
      }
    ],
    "why": "Collection rate varies with engine and climate; cold condensation needs special attention.",
    "sourceIds": [
      "S8"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "aos",
    "group": "Engine & cooling",
    "modification": "Air-oil separator / PCV overhaul",
    "aliases": [
      "air oil separator",
      "air-oil separator",
      "aos kit",
      "pcv upgrade",
      "crankcase breather kit"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "catch-can",
        "conditional": false
      },
      {
        "checkId": "intake-seals",
        "conditional": false
      },
      {
        "checkId": "engine-leaks",
        "conditional": true
      }
    ],
    "why": "Crankcase ventilation plumbing must stay clear and leak-free.",
    "sourceIds": [
      "S8"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "radiator",
    "group": "Engine & cooling",
    "modification": "Performance radiator",
    "aliases": [
      "aluminum radiator",
      "aftermarket radiator",
      "upgraded radiator",
      "radiator upgrade",
      "triple pass radiator"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "coolant-system",
        "conditional": false
      },
      {
        "checkId": "cooling-fans",
        "conditional": false
      },
      {
        "checkId": "thermal-conditions",
        "conditional": false
      }
    ],
    "why": "Changed radiator connections require coolant and cooling-airflow checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "oil-cooler",
    "group": "Engine & cooling",
    "modification": "Engine oil cooler / relocation",
    "aliases": [
      "oil cooler",
      "oil filter relocation",
      "oil cooler kit",
      "external oil cooler"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "engine-oil",
        "conditional": false
      },
      {
        "checkId": "engine-leaks",
        "conditional": false
      },
      {
        "checkId": "thermal-conditions",
        "conditional": true
      }
    ],
    "why": "Added oil lines and thermostats increase potential leak and flow points.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "trans-cooler",
    "group": "Engine & cooling",
    "modification": "Transmission / differential cooler",
    "aliases": [
      "transmission cooler",
      "trans cooler",
      "diff cooler",
      "differential cooler",
      "atf cooler"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "transmission-cooling",
        "conditional": false
      },
      {
        "checkId": "gearbox-fluid",
        "conditional": false
      }
    ],
    "why": "Added driveline-fluid coolers require hose/leak and temperature checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "thermostat",
    "group": "Engine & cooling",
    "modification": "Thermostat / coolant hose upgrade",
    "aliases": [
      "low temp thermostat",
      "low temperature thermostat",
      "silicone coolant hose",
      "water pump upgrade",
      "coolant pipe upgrade"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "coolant-system",
        "conditional": false
      },
      {
        "checkId": "thermal-conditions",
        "conditional": false
      }
    ],
    "why": "Modified cooling components need leak and operating-temperature checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "engine-mounts",
    "group": "Engine & cooling",
    "modification": "Performance engine/transmission mounts",
    "aliases": [
      "solid motor mount",
      "poly engine mount",
      "motor mounts",
      "engine mount upgrade",
      "transmission mount upgrade",
      "solid engine mount"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "engine-mounts",
        "conditional": false
      },
      {
        "checkId": "driveline-vibration",
        "conditional": true
      }
    ],
    "why": "Stiffer or new mounts can change vibration and nearby component clearance.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "camshaft",
    "group": "Engine & cooling",
    "modification": "Performance camshafts / valvetrain",
    "aliases": [
      "performance camshaft",
      "camshaft upgrade",
      "high lift cam",
      "performance cams",
      "valve spring upgrade",
      "upgraded valve springs",
      "adjustable cam gears"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "valvetrain",
        "conditional": false
      },
      {
        "checkId": "timing-components",
        "conditional": false
      },
      {
        "checkId": "engine-logs",
        "conditional": true
      }
    ],
    "why": "Valvetrain changes may have part-specific clearance and lubrication requirements.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "forged",
    "group": "Engine & cooling",
    "modification": "Forged engine internals / high compression",
    "aliases": [
      "forged pistons",
      "forged rods",
      "built motor",
      "built engine",
      "stroker kit",
      "high compression pistons",
      "engine build"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "engine-oil",
        "conditional": false
      },
      {
        "checkId": "compression-health",
        "conditional": true
      },
      {
        "checkId": "spark-plugs",
        "conditional": true
      },
      {
        "checkId": "engine-logs",
        "conditional": false
      }
    ],
    "why": "Engine-builder specifications should govern modified internal-component inspections.",
    "sourceIds": [
      "S3"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "headgasket",
    "group": "Engine & cooling",
    "modification": "Head studs / head gasket",
    "aliases": [
      "head studs",
      "arp head studs",
      "head gasket upgrade",
      "metal head gasket",
      "mls head gasket"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "engine-leaks",
        "conditional": false
      },
      {
        "checkId": "compression-health",
        "conditional": true
      },
      {
        "checkId": "coolant-system",
        "conditional": false
      }
    ],
    "why": "After top-end work, monitor sealing, heat cycling and fluid condition per builder directions.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "pulley",
    "group": "Engine & cooling",
    "modification": "Underdrive / crank pulley",
    "aliases": [
      "underdrive pulley",
      "lightweight crank pulley",
      "crank pulley upgrade",
      "accessory pulley kit"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "belts-pulleys",
        "conditional": false
      },
      {
        "checkId": "charging-system",
        "conditional": true
      }
    ],
    "why": "Changes to pulley geometry should be checked for belt tracking and accessory operation.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "ignition-upgrade",
    "group": "Engine & cooling",
    "modification": "Ignition coils / plug upgrade",
    "aliases": [
      "coil pack upgrade",
      "ignition coil upgrade",
      "high output ignition",
      "performance ignition coil",
      "colder spark plugs",
      "spark plug upgrade"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "spark-plugs",
        "conditional": false
      },
      {
        "checkId": "coil-boots",
        "conditional": false
      }
    ],
    "why": "Changed ignition hardware requires correct part selection, gap and connector checks.",
    "sourceIds": [
      "S3",
      "S4"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "coilovers",
    "group": "Suspension",
    "modification": "Adjustable coilover suspension",
    "aliases": [
      "coilover",
      "coilovers",
      "coilover kit",
      "coil overs",
      "coil-overs",
      "coil over suspension",
      "height adjustable shock"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "alignment",
        "conditional": false
      },
      {
        "checkId": "tire-edge-wear",
        "conditional": false
      },
      {
        "checkId": "coilover-condition",
        "conditional": false
      },
      {
        "checkId": "suspension-joints",
        "conditional": false
      }
    ],
    "why": "Ride-height changes affect alignment and tire wear; threaded dampers also need periodic inspection.",
    "sourceIds": [
      "S1",
      "S2"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "lowering-springs",
    "group": "Suspension",
    "modification": "Lowering springs",
    "aliases": [
      "lowering springs",
      "lowered springs",
      "sport lowering spring",
      "drop springs",
      "spring drop"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "alignment",
        "conditional": false
      },
      {
        "checkId": "tire-edge-wear",
        "conditional": false
      },
      {
        "checkId": "coilover-condition",
        "conditional": false
      },
      {
        "checkId": "tire-clearance",
        "conditional": true
      }
    ],
    "why": "Lowering changes suspension geometry and available travel.",
    "sourceIds": [
      "S1",
      "S2"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "camber-parts",
    "group": "Suspension",
    "modification": "Camber plates / adjustable camber arms",
    "aliases": [
      "camber arms",
      "camber kit",
      "camber plates",
      "camber bolts",
      "adjustable camber",
      "negative camber",
      "front camber",
      "rear camber"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "alignment",
        "conditional": false
      },
      {
        "checkId": "tire-edge-wear",
        "conditional": false
      },
      {
        "checkId": "suspension-joints",
        "conditional": false
      }
    ],
    "why": "Camber and toe alignment can change inner/outer tire loading and shoulder wear.",
    "sourceIds": [
      "S2"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "toe-arms",
    "group": "Suspension",
    "modification": "Adjustable toe arms / links",
    "aliases": [
      "toe arms",
      "toe links",
      "toe kit",
      "adjustable toe",
      "rear toe arms",
      "toe control arm"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "alignment",
        "conditional": false
      },
      {
        "checkId": "tire-edge-wear",
        "conditional": false
      },
      {
        "checkId": "suspension-joints",
        "conditional": false
      }
    ],
    "why": "Incorrect toe is particularly important for tire scrub and abnormal wear.",
    "sourceIds": [
      "S2"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "caster",
    "group": "Suspension",
    "modification": "Adjustable caster / tension rods",
    "aliases": [
      "caster arms",
      "caster plates",
      "caster kit",
      "tension rods",
      "adjustable caster"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "alignment",
        "conditional": false
      },
      {
        "checkId": "suspension-joints",
        "conditional": false
      },
      {
        "checkId": "tire-edge-wear",
        "conditional": true
      }
    ],
    "why": "Caster adjustments can affect steering feel; inspect alignment and mounting joints.",
    "sourceIds": [
      "S2"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "control-arms",
    "group": "Suspension",
    "modification": "Adjustable control arms / ball joints",
    "aliases": [
      "adjustable control arms",
      "control arm upgrade",
      "aftermarket control arm",
      "ball joint upgrade",
      "roll center correction",
      "bump steer kit"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "alignment",
        "conditional": false
      },
      {
        "checkId": "suspension-joints",
        "conditional": false
      },
      {
        "checkId": "tire-edge-wear",
        "conditional": true
      }
    ],
    "why": "New steering geometry and joints require alignment and fastener inspection.",
    "sourceIds": [
      "S16"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "sway-bars",
    "group": "Suspension",
    "modification": "Sway / anti-roll bars",
    "aliases": [
      "sway bar",
      "anti roll bar",
      "anti-roll bar",
      "stabilizer bar",
      "adjustable sway bar"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "suspension-joints",
        "conditional": false
      },
      {
        "checkId": "alignment",
        "conditional": true
      }
    ],
    "why": "New anti-roll bar mounts and end links should be inspected for wear and noise.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "endlinks",
    "group": "Suspension",
    "modification": "Sway bar end links",
    "aliases": [
      "end link",
      "endlink",
      "drop link",
      "swaybar link"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "suspension-joints",
        "conditional": false
      }
    ],
    "why": "End-link mounts and joints can develop play or loosen.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "poly-bushings",
    "group": "Suspension",
    "modification": "Polyurethane / solid suspension bushings",
    "aliases": [
      "poly bushings",
      "polyurethane bushings",
      "solid bushings",
      "delrin bushings",
      "spherical bushings",
      "uniball",
      "heim joint"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "suspension-joints",
        "conditional": false
      },
      {
        "checkId": "chassis-fasteners",
        "conditional": true
      }
    ],
    "why": "Alternative bushing materials and rod ends may require supplier-defined lubrication/play checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "strut-brace",
    "group": "Suspension",
    "modification": "Strut brace / chassis bracing",
    "aliases": [
      "strut tower brace",
      "strut bar",
      "chassis brace",
      "lower tie bar",
      "subframe brace"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "chassis-fasteners",
        "conditional": false
      }
    ],
    "why": "Added bracing relies on secure mounts and corrosion-free attachment points.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "air-ride",
    "group": "Suspension",
    "modification": "Air ride / air suspension",
    "aliases": [
      "air suspension",
      "air ride",
      "airlift",
      "air lift performance",
      "bagged suspension",
      "air struts"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "air-suspension",
        "conditional": false
      },
      {
        "checkId": "air-tank",
        "conditional": false
      },
      {
        "checkId": "alignment",
        "conditional": false
      },
      {
        "checkId": "tire-edge-wear",
        "conditional": false
      }
    ],
    "why": "Air lines, compressor moisture control and ride-height alignment need attention.",
    "sourceIds": [
      "S9",
      "S2"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "lift-kit",
    "group": "Suspension",
    "modification": "Suspension lift kit",
    "aliases": [
      "suspension lift",
      "lift kit",
      "body lift kit",
      "long travel suspension",
      "suspension lift kit"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "alignment",
        "conditional": false
      },
      {
        "checkId": "cv-boots",
        "conditional": false
      },
      {
        "checkId": "suspension-joints",
        "conditional": false
      },
      {
        "checkId": "tire-clearance",
        "conditional": false
      }
    ],
    "why": "Lifting changes suspension and driveline geometry and may affect tire fitment.",
    "sourceIds": [
      "S2",
      "S12"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "leveling",
    "group": "Suspension",
    "modification": "Leveling / spacer lift",
    "aliases": [
      "leveling kit",
      "levelling kit",
      "spacer lift",
      "strut spacer",
      "lift spacer"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "alignment",
        "conditional": false
      },
      {
        "checkId": "cv-boots",
        "conditional": false
      },
      {
        "checkId": "suspension-joints",
        "conditional": false
      }
    ],
    "why": "Ride-height change requires alignment and angle/boot checks.",
    "sourceIds": [
      "S2"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "steering-mod",
    "group": "Suspension",
    "modification": "Steering rack / angle kit",
    "aliases": [
      "steering angle kit",
      "angle kit",
      "steering rack upgrade",
      "quick steering rack",
      "tie rod upgrade"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "suspension-joints",
        "conditional": false
      },
      {
        "checkId": "alignment",
        "conditional": false
      },
      {
        "checkId": "tire-clearance",
        "conditional": false
      }
    ],
    "why": "Steering travel and rack/tie-rod components need clearance and joint checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "aftermarket-wheels",
    "group": "Wheels & tires",
    "modification": "Aftermarket wheels / rims",
    "aliases": [
      "aftermarket wheels",
      "new rims",
      "alloy wheel upgrade",
      "forged wheels",
      "wheels upgrade",
      "aftermarket rims"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "wheel-fasteners",
        "conditional": false
      },
      {
        "checkId": "wheel-balance",
        "conditional": false
      },
      {
        "checkId": "tire-clearance",
        "conditional": false
      },
      {
        "checkId": "tire-pressure",
        "conditional": false
      }
    ],
    "why": "Wheel hardware, tire fitment and balancing should be verified after replacement.",
    "sourceIds": [
      "S12",
      "S17"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "wheel-spacers",
    "group": "Wheels & tires",
    "modification": "Wheel spacers / adapters",
    "aliases": [
      "wheel spacers",
      "wheel spacer",
      "hub spacer",
      "wheel adapter",
      "bolt pattern adapter"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "wheel-fasteners",
        "conditional": false
      },
      {
        "checkId": "tire-clearance",
        "conditional": false
      },
      {
        "checkId": "wheel-bearings",
        "conditional": true
      }
    ],
    "why": "Spacers/adapters alter mounting and clearances; hardware must match supplier requirements.",
    "sourceIds": [
      "S12"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "wide-wheels",
    "group": "Wheels & tires",
    "modification": "Wide wheels / aggressive offset",
    "aliases": [
      "wide wheels",
      "aggressive offset",
      "deep dish wheels",
      "wide wheel setup",
      "low offset wheels"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "tire-clearance",
        "conditional": false
      },
      {
        "checkId": "tire-edge-wear",
        "conditional": false
      },
      {
        "checkId": "wheel-fasteners",
        "conditional": false
      },
      {
        "checkId": "wheel-bearings",
        "conditional": true
      }
    ],
    "why": "Fitment changes can create rubbing and modify scrub radius and tire wear.",
    "sourceIds": [
      "S12"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "low-profile",
    "group": "Wheels & tires",
    "modification": "Low-profile tire conversion",
    "aliases": [
      "low profile tires",
      "low-profile tires",
      "rubber band tires",
      "stretched tire",
      "stretched tires"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "tire-pressure",
        "conditional": false
      },
      {
        "checkId": "tire-clearance",
        "conditional": false
      },
      {
        "checkId": "tire-edge-wear",
        "conditional": false
      }
    ],
    "why": "Tire-to-rim compatibility, load and pressure matter with nonstandard profiles.",
    "sourceIds": [
      "S12",
      "S19"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "track-tires",
    "group": "Wheels & tires",
    "modification": "Track / semi-slick / R-compound tires",
    "aliases": [
      "track tires",
      "r compound",
      "r-compound tires",
      "semi slick",
      "semi-slick tires",
      "slick tires",
      "racing slicks"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "tire-track-wear",
        "conditional": false
      },
      {
        "checkId": "tire-pressure",
        "conditional": false
      },
      {
        "checkId": "alignment",
        "conditional": false
      },
      {
        "checkId": "tire-rotation",
        "conditional": false
      }
    ],
    "why": "Track use creates distinct wear and pressure considerations; follow tire manufacturer cold/hot limits.",
    "sourceIds": [
      "S13",
      "S19"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "offroad-tires",
    "group": "Wheels & tires",
    "modification": "Mud-terrain / off-road tires",
    "aliases": [
      "mud terrain tire",
      "mud-terrain tires",
      "all terrain tire",
      "all-terrain tires",
      "off road tire",
      "offroad tire"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "tire-pressure",
        "conditional": false
      },
      {
        "checkId": "tire-track-wear",
        "conditional": false
      },
      {
        "checkId": "wheel-balance",
        "conditional": false
      },
      {
        "checkId": "tire-clearance",
        "conditional": false
      }
    ],
    "why": "Aggressive tread and off-road use warrant sidewall, pressure, clearance and damage inspections.",
    "sourceIds": [
      "S13"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "oversized-tires",
    "group": "Wheels & tires",
    "modification": "Oversized / larger-diameter tires",
    "aliases": [
      "oversized tires",
      "larger tires",
      "bigger tires",
      "plus size tires",
      "plus-size tires",
      "tire upsize"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "tire-pressure",
        "conditional": false
      },
      {
        "checkId": "tire-clearance",
        "conditional": false
      },
      {
        "checkId": "wheel-bearings",
        "conditional": true
      },
      {
        "checkId": "alignment",
        "conditional": false
      }
    ],
    "why": "Larger fitments must meet load, clearance and wheel/tire compatibility criteria.",
    "sourceIds": [
      "S12"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "staggered",
    "group": "Wheels & tires",
    "modification": "Staggered wheel/tire setup",
    "aliases": [
      "staggered wheels",
      "staggered tires",
      "staggered setup",
      "staggered fitment"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "tire-rotation",
        "conditional": false
      },
      {
        "checkId": "tire-edge-wear",
        "conditional": false
      },
      {
        "checkId": "tire-pressure",
        "conditional": false
      }
    ],
    "why": "Different axle sizes may limit rotation options and affect AWD requirements.",
    "sourceIds": [
      "S13"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "beadlocks",
    "group": "Wheels & tires",
    "modification": "Beadlock wheels",
    "aliases": [
      "beadlock wheels",
      "bead locks",
      "beadlocks",
      "beadlock rims"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "beadlock-fasteners",
        "conditional": false
      },
      {
        "checkId": "tire-pressure",
        "conditional": false
      },
      {
        "checkId": "tire-track-wear",
        "conditional": false
      }
    ],
    "why": "Beadlock assemblies require manufacturer-specific fastener inspection.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "stud-kit",
    "group": "Wheels & tires",
    "modification": "Extended wheel studs / lug conversion",
    "aliases": [
      "extended wheel studs",
      "wheel stud conversion",
      "stud conversion",
      "aftermarket lug nuts",
      "titanium lug nuts"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "wheel-fasteners",
        "conditional": false
      }
    ],
    "why": "Nonstandard fastening hardware requires correct seats, engagement and torque.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "big-brakes",
    "group": "Brakes",
    "modification": "Big brake kit",
    "aliases": [
      "big brake kit",
      "bbk",
      "big brakes",
      "brembo caliper upgrade",
      "six piston brakes",
      "6 piston brakes",
      "4 piston brakes"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "brake-pads",
        "conditional": false
      },
      {
        "checkId": "brake-rotors",
        "conditional": false
      },
      {
        "checkId": "brake-fluid",
        "conditional": false
      },
      {
        "checkId": "brake-clearance",
        "conditional": false
      },
      {
        "checkId": "brake-calipers",
        "conditional": false
      }
    ],
    "why": "Brake hardware upgrades must maintain clearance and be inspected for wear, fluid and fitting integrity.",
    "sourceIds": [
      "S10",
      "S11"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "track-pads",
    "group": "Brakes",
    "modification": "Track / race brake pads",
    "aliases": [
      "track pads",
      "race pads",
      "racing brake pads",
      "high friction pads",
      "performance brake pads"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "brake-pads",
        "conditional": false
      },
      {
        "checkId": "brake-rotors",
        "conditional": false
      },
      {
        "checkId": "brake-fluid",
        "conditional": true
      }
    ],
    "why": "Pad and rotor wear can increase with track heat and usage.",
    "sourceIds": [
      "S11"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "drilled-rotors",
    "group": "Brakes",
    "modification": "Slotted / drilled rotor upgrade",
    "aliases": [
      "drilled rotors",
      "slotted rotors",
      "cross drilled rotors",
      "two piece rotors",
      "2 piece rotors",
      "floating rotors"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "brake-rotors",
        "conditional": false
      },
      {
        "checkId": "brake-pads",
        "conditional": false
      },
      {
        "checkId": "brake-calipers",
        "conditional": true
      }
    ],
    "why": "Modified rotors need wear and heat inspection using the rotor maker’s criteria.",
    "sourceIds": [
      "S11"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "brake-lines",
    "group": "Brakes",
    "modification": "Braided brake hoses",
    "aliases": [
      "stainless brake lines",
      "braided brake lines",
      "steel braided lines",
      "performance brake hose"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "brake-lines",
        "conditional": false
      },
      {
        "checkId": "brake-fluid",
        "conditional": false
      }
    ],
    "why": "Flexible replacement lines require proper routing, abrasion protection and leak checks.",
    "sourceIds": [
      "S10"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "brake-fluid-upgrade",
    "group": "Brakes",
    "modification": "High-temperature brake fluid",
    "aliases": [
      "race brake fluid",
      "racing brake fluid",
      "high temp brake fluid",
      "high temperature brake fluid",
      "dot 4 racing fluid"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "brake-fluid",
        "conditional": false
      },
      {
        "checkId": "brake-lines",
        "conditional": false
      }
    ],
    "why": "Brake fluids and service intervals depend on compatible specifications and usage.",
    "sourceIds": [
      "S10"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "brake-cooling",
    "group": "Brakes",
    "modification": "Brake cooling ducts",
    "aliases": [
      "brake duct",
      "brake cooling kit",
      "brake cooling ducts",
      "brake air duct"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "brake-rotors",
        "conditional": false
      },
      {
        "checkId": "brake-lines",
        "conditional": false
      },
      {
        "checkId": "brake-clearance",
        "conditional": false
      }
    ],
    "why": "Added brake ducts need routing and attachment checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "hydraulic-handbrake",
    "group": "Brakes",
    "modification": "Hydraulic handbrake",
    "aliases": [
      "hydraulic handbrake",
      "hydro handbrake",
      "hydraulic e brake",
      "drift handbrake"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "brake-lines",
        "conditional": false
      },
      {
        "checkId": "brake-fluid",
        "conditional": false
      },
      {
        "checkId": "brake-bias",
        "conditional": false
      }
    ],
    "why": "Modified brake hydraulics require leak, pedal and brake-balance checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "brake-bias-adjuster",
    "group": "Brakes",
    "modification": "Brake proportioning valve / bias adjuster",
    "aliases": [
      "brake bias adjuster",
      "brake proportioning valve",
      "pedal box",
      "brake bias valve"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "brake-bias",
        "conditional": false
      },
      {
        "checkId": "brake-lines",
        "conditional": false
      },
      {
        "checkId": "brake-fluid",
        "conditional": false
      }
    ],
    "why": "Changes to braking balance are safety critical; verify function professionally.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "performance-clutch",
    "group": "Drivetrain",
    "modification": "Performance clutch / flywheel",
    "aliases": [
      "stage 2 clutch",
      "stage 3 clutch",
      "performance clutch",
      "clutch upgrade",
      "ceramic clutch",
      "lightweight flywheel",
      "single mass flywheel",
      "twin disc clutch"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "clutch-wear",
        "conditional": false
      },
      {
        "checkId": "clutch-hydraulics",
        "conditional": false
      },
      {
        "checkId": "driveline-vibration",
        "conditional": true
      }
    ],
    "why": "Changes in clutch friction material and engagement need supplier-specific break-in and hydraulic inspections.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "lsd",
    "group": "Drivetrain",
    "modification": "Limited-slip differential",
    "aliases": [
      "limited slip diff",
      "limited slip differential",
      "lsd differential",
      "aftermarket differential",
      "torsen differential"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "differential-fluid",
        "conditional": false
      },
      {
        "checkId": "driveline-vibration",
        "conditional": true
      }
    ],
    "why": "Some LSD designs require specific lubricant or friction modifiers and monitoring for noise.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "gear-ratio",
    "group": "Drivetrain",
    "modification": "Final-drive / ring-and-pinion change",
    "aliases": [
      "final drive gear",
      "ring and pinion",
      "gear ratio change",
      "regear kit",
      "differential gear set"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "differential-fluid",
        "conditional": false
      },
      {
        "checkId": "driveline-vibration",
        "conditional": false
      }
    ],
    "why": "New differential gearing requires installer-specific lubricant/break-in and noise checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "shift-kit",
    "group": "Drivetrain",
    "modification": "Transmission shift kit / valve body",
    "aliases": [
      "shift kit",
      "built transmission",
      "upgraded valve body",
      "transmission rebuild",
      "performance transmission"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "gearbox-fluid",
        "conditional": false
      },
      {
        "checkId": "transmission-cooling",
        "conditional": false
      },
      {
        "checkId": "driveline-vibration",
        "conditional": true
      }
    ],
    "why": "Shift hardware changes require fluid compatibility, leak and temperature checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "high-stall",
    "group": "Drivetrain",
    "modification": "High-stall converter",
    "aliases": [
      "high stall torque converter",
      "stall converter",
      "aftermarket torque converter"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "transmission-cooling",
        "conditional": false
      },
      {
        "checkId": "gearbox-fluid",
        "conditional": false
      }
    ],
    "why": "Converter load can affect transmission heat; inspect cooling and fluid according to builder guidance.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "short-shifter",
    "group": "Drivetrain",
    "modification": "Short shifter / shift linkage",
    "aliases": [
      "short shifter",
      "short throw shifter",
      "shift linkage upgrade",
      "shifter bushings"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "shift-linkage",
        "conditional": false
      }
    ],
    "why": "Shift linkage and bushings should be checked for looseness or binding; this does not automatically shorten gearbox oil intervals.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": "Inspect linkage adjustments without assuming a shorter gearbox oil interval."
  },
  {
    "id": "axles",
    "group": "Drivetrain",
    "modification": "Axle / CV shaft upgrade",
    "aliases": [
      "axle upgrade",
      "aftermarket axles",
      "heavy duty axle",
      "cv axle upgrade",
      "driveshaft shop axles"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "cv-boots",
        "conditional": false
      },
      {
        "checkId": "driveline-vibration",
        "conditional": false
      },
      {
        "checkId": "differential-fluid",
        "conditional": true
      }
    ],
    "why": "Revised axle assemblies require boot, clearance and vibration checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "driveshaft",
    "group": "Drivetrain",
    "modification": "Aftermarket driveshaft",
    "aliases": [
      "carbon driveshaft",
      "carbon fiber driveshaft",
      "one piece driveshaft",
      "aluminum driveshaft",
      "driveshaft upgrade"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "driveline-vibration",
        "conditional": false
      },
      {
        "checkId": "chassis-fasteners",
        "conditional": false
      }
    ],
    "why": "New driveline rotating hardware requires alignment, mounting and vibration checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "diff-mounts",
    "group": "Drivetrain",
    "modification": "Differential bushings / mounts",
    "aliases": [
      "diff bushings",
      "differential mounts",
      "subframe bushings",
      "solid diff mount"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "suspension-joints",
        "conditional": false
      },
      {
        "checkId": "driveline-vibration",
        "conditional": false
      },
      {
        "checkId": "chassis-fasteners",
        "conditional": false
      }
    ],
    "why": "More rigid differential/subframe mounting transmits load and vibration into fasteners.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "skid-plates",
    "group": "Off-road & utility",
    "modification": "Skid plates / underbody armor",
    "aliases": [
      "skid plate",
      "underbody protection",
      "rock slider",
      "rock sliders",
      "diff guard",
      "differential skid plate"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "offroad-damage",
        "conditional": false
      },
      {
        "checkId": "body-mounts",
        "conditional": false
      },
      {
        "checkId": "thermal-conditions",
        "conditional": true
      }
    ],
    "why": "Armor needs debris clearing and inspections for bent mounts or blocked airflow.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "winch",
    "group": "Off-road & utility",
    "modification": "Winch system",
    "aliases": [
      "winch kit",
      "electric winch",
      "winch bumper",
      "recovery winch"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "electrical-connections",
        "conditional": false
      },
      {
        "checkId": "charging-system",
        "conditional": false
      },
      {
        "checkId": "body-mounts",
        "conditional": false
      }
    ],
    "why": "High-current winch systems require protected wiring, secure mounts and battery checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "roof-rack",
    "group": "Off-road & utility",
    "modification": "Roof racks / cargo systems",
    "aliases": [
      "roof rack",
      "roof basket",
      "roof platform",
      "cargo box",
      "roof tent",
      "rooftop tent"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "roof-load",
        "conditional": false
      },
      {
        "checkId": "body-mounts",
        "conditional": false
      },
      {
        "checkId": "tire-pressure",
        "conditional": true
      }
    ],
    "why": "Mounted cargo changes loading; inspect structural attachments and load ratings.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "tow-hitch",
    "group": "Off-road & utility",
    "modification": "Tow hitch / towing package",
    "aliases": [
      "tow hitch",
      "trailer hitch",
      "towing kit",
      "fifth wheel hitch",
      "gooseneck hitch"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "towing-checks",
        "conditional": false
      },
      {
        "checkId": "brake-pads",
        "conditional": true
      },
      {
        "checkId": "transmission-cooling",
        "conditional": true
      },
      {
        "checkId": "tire-pressure",
        "conditional": false
      }
    ],
    "why": "Additional trailer loads require safe hitch, tire and brake checks within rated capacities.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "aftermarket-bumper",
    "group": "Off-road & utility",
    "modification": "Steel bumpers / brush guards",
    "aliases": [
      "steel bumper",
      "offroad bumper",
      "off road bumper",
      "brush guard",
      "bull bar",
      "bumper winch mount"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "body-mounts",
        "conditional": false
      },
      {
        "checkId": "suspension-joints",
        "conditional": true
      },
      {
        "checkId": "tire-pressure",
        "conditional": true
      }
    ],
    "why": "Heavier bumpers require secure frame mounting and consideration of axle load.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "aero-wing",
    "group": "Body & electrical",
    "modification": "Rear wing / splitter / diffuser",
    "aliases": [
      "rear wing",
      "gt wing",
      "front splitter",
      "front lip splitter",
      "rear diffuser",
      "aero splitter",
      "canards"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "aero-mounts",
        "conditional": false
      },
      {
        "checkId": "body-mounts",
        "conditional": false
      }
    ],
    "why": "Aerodynamic parts need secure attachment and clearance checks after impacts.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "body-kit",
    "group": "Body & electrical",
    "modification": "Body kit / widebody / fender modification",
    "aliases": [
      "body kit",
      "widebody kit",
      "wide body",
      "fender flares",
      "fender roll",
      "rolled fenders"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "body-mounts",
        "conditional": false
      },
      {
        "checkId": "tire-clearance",
        "conditional": false
      },
      {
        "checkId": "tire-edge-wear",
        "conditional": true
      }
    ],
    "why": "Body changes can interfere with wheel travel and exposed metal can corrode.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "carbon-hood",
    "group": "Body & electrical",
    "modification": "Aftermarket hood / trunk / bonnet",
    "aliases": [
      "carbon fiber hood",
      "aftermarket hood",
      "lightweight bonnet",
      "carbon bonnet",
      "aftermarket trunk lid"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "body-mounts",
        "conditional": false
      },
      {
        "checkId": "windshield-visibility",
        "conditional": true
      }
    ],
    "why": "Hinges, locks, latches and fasteners require proper fit and periodic inspection.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "bucket-seats",
    "group": "Body & electrical",
    "modification": "Bucket seats / seat mounts",
    "aliases": [
      "bucket seats",
      "racing seats",
      "aftermarket seats",
      "fixed back seat",
      "seat rail upgrade"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "seat-mounts",
        "conditional": false
      }
    ],
    "why": "Modified seating and restraint attachment is safety-critical.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "harness-rollcage",
    "group": "Body & electrical",
    "modification": "Harness / roll cage / roll bar",
    "aliases": [
      "roll cage",
      "roll bar",
      "harness bar",
      "racing harness",
      "5 point harness",
      "6 point harness"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "harness-safety",
        "conditional": false
      },
      {
        "checkId": "seat-mounts",
        "conditional": false
      }
    ],
    "why": "Restraints and roll-over structure need vehicle- and event-appropriate approved installation.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "stereo-amps",
    "group": "Body & electrical",
    "modification": "Amplifier / subwoofer",
    "aliases": [
      "subwoofer",
      "amplifier upgrade",
      "aftermarket amplifier",
      "amp install",
      "audio system upgrade"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "electrical-connections",
        "conditional": false
      },
      {
        "checkId": "charging-system",
        "conditional": false
      }
    ],
    "why": "High-current accessories need fused wiring, grounding and charging-system assessment.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "light-bar",
    "group": "Body & electrical",
    "modification": "Auxiliary lighting / light bar",
    "aliases": [
      "light bar",
      "lightbar",
      "underglow kit",
      "aftermarket fog lights",
      "auxiliary lights",
      "led pods"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "electrical-connections",
        "conditional": false
      },
      {
        "checkId": "windshield-visibility",
        "conditional": true
      }
    ],
    "why": "Added lighting requires secure wiring and local road-legal lighting checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "battery",
    "group": "Body & electrical",
    "modification": "Battery upgrade / lithium conversion",
    "aliases": [
      "lithium battery",
      "lightweight battery",
      "battery relocation",
      "battery upgrade",
      "agm battery conversion"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "charging-system",
        "conditional": false
      },
      {
        "checkId": "aux-battery",
        "conditional": false
      },
      {
        "checkId": "electrical-connections",
        "conditional": false
      }
    ],
    "why": "Battery type and relocation can require compatible charging, safety and grounding measures.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "alternator",
    "group": "Body & electrical",
    "modification": "High-output alternator / electrical upgrade",
    "aliases": [
      "high output alternator",
      "alternator upgrade",
      "big 3 upgrade",
      "big three wiring"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "charging-system",
        "conditional": false
      },
      {
        "checkId": "belts-pulleys",
        "conditional": false
      },
      {
        "checkId": "electrical-connections",
        "conditional": false
      }
    ],
    "why": "Charging upgrades need belt tracking, fuses and grounded connections.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "gauges",
    "group": "Body & electrical",
    "modification": "Aftermarket sensors / gauges",
    "aliases": [
      "boost gauge",
      "oil pressure gauge",
      "egt gauge",
      "wideband gauge",
      "afr gauge",
      "aftermarket gauges"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "electrical-connections",
        "conditional": false
      },
      {
        "checkId": "engine-leaks",
        "conditional": true
      }
    ],
    "why": "Added sensors and wiring require secure, leak-free routing; a boost gauge alone is not a boost tune.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "aftermarket-ecu",
    "group": "Body & electrical",
    "modification": "Standalone ECU / engine harness",
    "aliases": [
      "standalone ecu",
      "aftermarket ecu",
      "ecu swap",
      "megasquirt",
      "haltech ecu",
      "link ecu",
      "motec ecu"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "electrical-connections",
        "conditional": false
      },
      {
        "checkId": "engine-logs",
        "conditional": false
      },
      {
        "checkId": "spark-plugs",
        "conditional": true
      }
    ],
    "why": "Engine control changes require verified wiring and calibration, not universal service interval changes.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "track-use",
    "group": "Use case",
    "modification": "Track day / autocross preparation",
    "aliases": [
      "track day setup",
      "track preparation",
      "track build",
      "autocross build",
      "circuit racing setup"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "brake-pads",
        "conditional": false
      },
      {
        "checkId": "brake-rotors",
        "conditional": false
      },
      {
        "checkId": "brake-fluid",
        "conditional": false
      },
      {
        "checkId": "tire-track-wear",
        "conditional": false
      },
      {
        "checkId": "engine-oil",
        "conditional": true
      }
    ],
    "why": "Extended aggressive use can justify event-based inspections instead of a guessed universal mileage rule.",
    "sourceIds": [
      "S11",
      "S13"
    ],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "drift-use",
    "group": "Use case",
    "modification": "Drift car / drift setup",
    "aliases": [
      "drift setup",
      "drift build",
      "drift car",
      "drift spec"
    ],
    "excludePhrases": [],
    "checks": [
      {
        "checkId": "tire-track-wear",
        "conditional": false
      },
      {
        "checkId": "suspension-joints",
        "conditional": false
      },
      {
        "checkId": "clutch-wear",
        "conditional": false
      },
      {
        "checkId": "coolant-system",
        "conditional": true
      }
    ],
    "why": "Repeated wheelspin and high-angle use require focused tire, suspension and driveline checks.",
    "sourceIds": [],
    "reviewStatus": "DRAFT",
    "notes": ""
  },
  {
    "id": "window-tint-film",
    "group": "Body & electrical",
    "modification": "Aftermarket window tint / window film",
    "aliases": ["window tint", "window tinting", "tinted windows", "tint film", "ceramic tint", "automotive window film"],
    "excludePhrases": [],
    "checks": [{"checkId": "window-film", "conditional": false}],
    "why": "Window film is cosmetic but may need checking for peeling, bubbles or visibility issues; it does not imply wiring or seat-mount maintenance.",
    "sourceIds": [], "reviewStatus": "DRAFT", "notes": "No automatic service interval."
  },
  {
    "id": "vehicle-vinyl-wrap",
    "group": "Body & electrical",
    "modification": "Vehicle vinyl wrap",
    "aliases": ["vinyl wrap", "full wrap", "vehicle wrap", "car wrap", "color change wrap"],
    "excludePhrases": [],
    "checks": [{"checkId": "body-wrap", "conditional": false}],
    "why": "Check wrap edges and cleanliness, not engine or electrical maintenance.",
    "sourceIds": [], "reviewStatus": "DRAFT", "notes": "No automatic service interval."
  },
  {
    "id": "paint-protection-film",
    "group": "Body & electrical",
    "modification": "Paint protection film",
    "aliases": ["paint protection film", "ppf wrap", "clear bra"],
    "excludePhrases": [],
    "checks": [{"checkId": "body-wrap", "conditional": false}],
    "why": "Protective film can lift at its edges and benefits from product-specific cleaning.",
    "sourceIds": [], "reviewStatus": "DRAFT", "notes": "No automatic service interval."
  }
];

export const MOD_CATEGORY_FALLBACKS = {
  "Tune": {
    "label": "Unspecified tune",
    "checks": [
      "?engine-logs"
    ],
    "why": "Tune details are unspecified; verify the calibration and assess any actual engine/load changes before assigning specific maintenance."
  },
  "Exhaust": {
    "label": "Unspecified exhaust modification",
    "checks": [
      "exhaust-mounts"
    ],
    "why": "Inspect the installed exhaust hardware for leaks, mounting and clearance. No ignition interval change is inferred."
  },
  "Intake": {
    "label": "Unspecified intake modification",
    "checks": [
      "intake-filter",
      "intake-seals"
    ],
    "why": "Air-system hardware should be checked for filter service and mounting integrity."
  },
  "Suspension": {
    "label": "Unspecified suspension modification",
    "checks": [
      "suspension-joints",
      "?alignment"
    ],
    "why": "Inspect suspension hardware; consider alignment if geometry or ride height changed."
  },
  "Wheels": {
    "label": "Unspecified wheel/tire change",
    "checks": [
      "tire-pressure",
      "wheel-fasteners",
      "?tire-clearance"
    ],
    "why": "Verify wheel/tire fitment and correct inflation after changes."
  },
  "Brakes": {
    "label": "Unspecified brake modification",
    "checks": [
      "brake-pads",
      "brake-lines",
      "?brake-fluid"
    ],
    "why": "Inspect braking components and verify fluid/hose compatibility after hardware changes."
  }
};


/** Split identifiers and punctuation consistently, then match whole words/phrases. */
export function normalizeModText(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function containsPhrase(text, phrase) {
  const needle = normalizeModText(phrase);
  return Boolean(needle) && (` ${text} `).includes(` ${needle} `);
}

/** Treat legacy string entries and records without a status as installed. */
export function isInstalledModification(mod) {
  if (typeof mod === 'string') return Boolean(mod.trim());
  if (!mod || typeof mod !== 'object') return false;
  return !mod.status || normalizeModText(mod.status) === 'installed';
}

function getModLabel(mod) {
  return typeof mod === 'string' ? mod : String(mod?.title || mod?.name || '');
}

/**
 * Pure function: no UI or Firestore effects. Run against the ACTIVE vehicle's Modifications.
 * Output is a de-duplicated array of component checks with contributing modification names.
 * Conditional checks must be displayed with their conditional label, not as automatically due.
 * The caller must avoid labeling any check "Overdue" without a validated service interval.
 */
export function getModMaintenanceRecommendations(modifications = [], { includeFallbacks = true } = {}) {
  if (!Array.isArray(modifications)) return [];
  const aggregated = new Map();
  for (const mod of modifications) {
    if (!isInstalledModification(mod)) continue;
    const label = getModLabel(mod).trim();
    const name = normalizeModText(label);
    if (!name) continue;
    const matches = MOD_MAINTENANCE_RULES.filter(rule =>
      rule.aliases.some(alias => containsPhrase(name, alias)) &&
      !(rule.excludePhrases || []).some(excluded => containsPhrase(name, excluded))
    );
    const fallback = (typeof mod !== 'string' && includeFallbacks && matches.length === 0)
      ? MOD_CATEGORY_FALLBACKS[mod.category] : null;
    const hits = [...matches.map(rule => ({
      ruleId: rule.id, ruleLabel: rule.modification, why: rule.why,
      checks: rule.checks, sourceIds: rule.sourceIds,
    }))];
    if (fallback) hits.push({
      ruleId: `fallback:${mod.category}`, ruleLabel: fallback.label,
      why: fallback.why, checks: fallback.checks.map(check => ({ checkId: check.replace(/^\?/, ''), conditional: check.startsWith('?') })),
      sourceIds: [],
    });
    for (const hit of hits) {
      for (const effect of hit.checks) {
        const check = MOD_MAINTENANCE_CHECKS[effect.checkId];
        if (!check) continue;
        let recommendation = aggregated.get(effect.checkId);
        if (!recommendation) {
          recommendation = {
            id: effect.checkId, group: check.group, title: check.label,
            action: check.action, type: 'inspection', intervalMiles: null,
            intervalMonths: null, reviewStatus: 'DRAFT',
            triggers: [], sourceIds: [],
          };
          aggregated.set(effect.checkId, recommendation);
        }
        const signature = `${hit.ruleId}::${label}`;
        if (!recommendation.triggers.some(existing => existing.signature === signature)) {
          recommendation.triggers.push({
            signature, modName: label, ruleId: hit.ruleId, ruleLabel: hit.ruleLabel,
            why: hit.why, conditional: Boolean(effect.conditional),
          });
        }
        for (const sourceId of hit.sourceIds) {
          if (!recommendation.sourceIds.includes(sourceId)) recommendation.sourceIds.push(sourceId);
        }
      }
    }
  }
  // If multiple mods trigger the same check, a conditional cause remains conditional;
  // the caller can show the individual trigger details instead of a blanket claim.
  return [...aggregated.values()].map(item => ({
    ...item,
    triggers: item.triggers.map(trigger => {
      const details = { ...trigger };
      delete details.signature;
      return details;
    }),
    sources: item.sourceIds.map(id => MOD_MAINTENANCE_SOURCES[id]).filter(Boolean),
  })).sort((a,b) => a.group.localeCompare(b.group) || a.title.localeCompare(b.title));
}
