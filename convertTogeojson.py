import csv
import json

from geojson import Feature, Point, FeatureCollection,LineString

features = []
latitudes = {}
longitudes = {}
airlines = {}
planes = {}
airports={}

# create planes
f = open("airlines.dat")
for row in csv.reader(f):
    planes[row[1]]=row[0]

# create airlines
f = open("airlines.dat")
for row in csv.reader(f):
    airlines[row[0]]=row[1]

# create airports geometry
f = open("airports.dat")
for row in csv.reader(f):
    latitude = float(row[6])
    longitude = float(row[7])
    latitudes[row[0]] = float(row[6])
    longitudes[row[0]] = float(row[7])
    airports[row[0]]=row[1]

    properties_dict = {
        "id": row[0],
        "name": row[1],
        "city": row[2],
        "country": row[3]
    }

    features.append(Feature(geometry=Point((longitude, latitude)), properties=properties_dict))

# create routes
f = open("routes.dat")
for row in csv.reader(f):
    if (row[3] in latitudes and row[3] in longitudes) and (row[5] in latitudes and row[5] in longitudes):
        source_latitude=latitudes[row[3]]
        source_longitude=longitudes[row[3]]
        destination_latitude=latitudes[row[5]]
        destination_longitude=longitudes[row[5]]

        properties_dict = {
            "airline_id": row[1],
            "airline_name": (airlines[row[1]] if row[1] in airlines else "Null"),
            "source_id": row[3],
            "source_name": airports[row[3]],
            "destination_id": row[5],
            "destination_name": airports[row[5]]
        }
        features.append(Feature(geometry=LineString([(source_longitude, source_latitude), (destination_longitude, destination_latitude)]),
                                properties=properties_dict))


x = FeatureCollection(features)


with open('airportData.json', 'a') as f:
    json.dump(x, f)