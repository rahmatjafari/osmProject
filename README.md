## Build OpenStreetMap Tile Server
Look at wiki
## Download data
[Here](https://openflights.org/data.html) you will find the openflights data.
## Convert data to Geojson 
with the _convetTogeojson.py_ I extract required information and create geojson file.

The geojson file is like this:
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "airline_id": "9531",
        "airline_name": "Tajik Air",
        "source_id": "2979",
        "source_name": "Dushanbe Airport",
        "destination_id": "4330",
        "destination_name": "Imam Khomeini International Airport"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            50.9326171875,
            36.03133177633187
          ],
          [
            40.0341796875,
            31.952162238024975
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "4330",
        "name": "Imam Khomeini International Airport",
        "city": "Tehran",
        "country": "Iran"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          52.82226562499999,
          34.95799531086792
        ]
      }
    }
  ]
}
```
## Leaflet
_showRoute.js_ use [leaflet](https://leafletjs.com/) and geojson file created before to represent routes between source airport and destination airports. 
