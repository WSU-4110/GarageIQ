"""Google Places Text Search adapter. Never expose provider credentials to the browser."""
from dataclasses import dataclass
from urllib.parse import quote

import httpx

PLACES_URL = "https://places.googleapis.com/v1/places:searchText"
FIELD_MASK = (
    "places.id,places.displayName,places.formattedAddress,"
    "places.googleMapsUri,places.websiteUri,places.nationalPhoneNumber,places.rating"
)

SERVICE_TERMS = {
    "performance": "automotive performance shops",
    "tuning": "automotive ECU tuning dyno performance shops",
    "exhaust": "automotive exhaust fabrication performance shops",
    "suspension": "automotive performance suspension shops",
    "brakes": "automotive performance brake shops",
    "general": "auto repair shops",
}


@dataclass
class ShopFinderService:
    api_key: str

    def search(self, location: str, service: str, make: str = "") -> list[dict]:
        """Return the provider's listings, not fabricated or locally hardcoded shops."""
        if not self.api_key:
            raise ValueError("Shop search is not configured. Set GARAGEIQ_GOOGLE_PLACES_API_KEY.")
        term = SERVICE_TERMS[service]
        specialization = f" specializing in {make.strip()} vehicles" if make.strip() else ""
        query = f"{term}{specialization} near {location.strip()}, USA"
        try:
            with httpx.Client(timeout=12.0) as client:
                response = client.post(
                    PLACES_URL,
                    headers={
                        "X-Goog-Api-Key": self.api_key,
                        "X-Goog-FieldMask": FIELD_MASK,
                        "Content-Type": "application/json",
                    },
                    json={"textQuery": query, "pageSize": 15, "regionCode": "US"},
                )
                response.raise_for_status()
                payload = response.json()
        except (httpx.HTTPError, ValueError) as exc:
            raise RuntimeError("Places provider could not complete the search.") from exc

        shops = []
        for place in payload.get("places", []):
            place_id = place.get("id", "")
            name = place.get("displayName", {}).get("text", "")
            address = place.get("formattedAddress", "")
            if not place_id or not name or not address:
                continue
            directions = (
                "https://www.google.com/maps/dir/?api=1&destination="
                + quote(address, safe="")
                + "&destination_place_id=" + quote(place_id, safe="")
            )
            shops.append({
                "id": place_id,
                "name": name,
                "address": address,
                "rating": place.get("rating"),
                "phone": place.get("nationalPhoneNumber"),
                "website": place.get("websiteUri"),
                "maps_url": place.get("googleMapsUri"),
                "directions_url": directions,
            })
        return shops
