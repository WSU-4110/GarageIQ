"""Mocked provider tests never spend Google Places quota."""
from fastapi.testclient import TestClient

from app.main import app
from app.services.shop_finder import ShopFinderService


def test_provider_query_and_google_maps_directions(monkeypatch):
    import httpx

    seen = {}

    class StubClient:
        def __init__(self, **kwargs):
            pass
        def __enter__(self):
            return self
        def __exit__(self, *args):
            return False
        def post(self, url, **kwargs):
            seen.update(url=url, **kwargs)
            return httpx.Response(200, request=httpx.Request('POST', url), json={"places": [
                {"id": "place-123", "displayName": {"text": "Example Tuning"},
                 "formattedAddress": "123 Main St, Detroit, MI", "rating": 4.5,
                 "googleMapsUri": "https://maps.google.com/?q=test"},
            ]})

    monkeypatch.setattr('app.services.shop_finder.httpx.Client', StubClient)
    shops = ShopFinderService('test-key').search('48212', 'tuning', 'Subaru')
    assert len(shops) == 1
    assert 'Subaru' in seen['json']['textQuery']
    assert '48212' in seen['json']['textQuery']
    assert seen['headers']['X-Goog-Api-Key'] == 'test-key'
    assert 'destination_place_id=place-123' in shops[0]['directions_url']


def test_unconfigured_service_rejects_search_without_network():
    try:
        ShopFinderService('').search('Detroit', 'performance')
    except ValueError as error:
        assert 'GARAGEIQ_GOOGLE_PLACES_API_KEY' in str(error)
    else:
        raise AssertionError('Expected missing API key error')


def test_search_endpoint_validation_and_missing_configuration(monkeypatch):
    from app.core.config import get_settings
    with TestClient(app) as client:
        result = client.get('/shops', params={'location': 'x', 'service': 'performance'})
        assert result.status_code == 422
        result = client.get('/shops', params={'location': '48212', 'service': 'not-a-service'})
        assert result.status_code == 422
        monkeypatch.setattr('app.api.shops.get_settings', lambda: type('Config', (), {'google_places_api_key': ''})())
        result = client.get('/shops', params={'location': '48212', 'service': 'tuning'})
        assert result.status_code == 503
