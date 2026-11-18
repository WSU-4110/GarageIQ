"""GarageIQ high-precision topic guard for strongly expressed modification intents.

This is a conservative rule-based relevance check, not a trained intent model.
Unclear/multi-topic queries are left to hybrid retrieval. No new fitment claims.
"""
import re

INTENTS = {
    "sound": (r"\b(exhaust|muffler|cat.?back|axle.?back|resonat|drone|sound|louder|meaner|rumble)\b",
              {"sound", "exhaust", "muffler", "tone", "louder", "drone", "intake"}),
    "exterior": (r"\b(exterior|appearance|aesthetic|body.?kit|spoiler|splitter|grille|wrap|paint|vinyl|chrome.?delete|blacked.?out|widebody|fender|look meaner|looks aggressive)\b",
                 {"exterior", "appearance", "styling", "spoiler", "wrap", "paint", "aero", "wheels"}),
    "brakes": (r"\b(brake|braking|brakes|stopping|brake fade)\b",
               {"brakes", "braking", "stopping", "fade", "maintenance"}),
}

def filter_mod_hits(question, hits):
    """Keep on-topic mods for clearly stated goals; preserve order and score.

    When no match exists, return none rather than unrelated recommendations.
    If two intents are detected, do not filter (a multi-intent query needs reranking).
    """
    matches = [(name, allowed) for name, (regex, allowed) in INTENTS.items()
               if re.search(regex, question.lower())]
    # "look meaner" asks for styling, not an exhaust sound change.
    if re.search(r"\blooks? meaner\b", question.lower()):
        matches = [m for m in matches if m[0] != "sound"]
    if len(matches) != 1:
        return hits
    allowed = matches[0][1]
    output = []
    for mod, score in hits:
        text = " ".join([mod.category, mod.name, *mod.tags, *mod.aliases]).lower()
        tokens = set(re.findall(r"[a-z0-9]+", text))
        if tokens & allowed:
            output.append((mod, score))
    return output
