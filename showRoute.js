 // Create the map
 var map = L.map('map').setView([0, 0], 2);

 // Set up the OSM layer
 L.tileLayer(
   'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
 ).addTo(map);


 var destinationMarker = {
   radius: 8,
   fillColor: "#ff7800",
   color: "#000",
   weight: 1,
   opacity: 1,
   fillOpacity: 0.8
 };

 var sourceMarker = {
   radius: 8,
   fillColor: "#0078f0",
   color: "#00ff0",
   weight: 1,
   opacity: 1,
   fillOpacity: 0.8
 };

 var myStyle = {
   "color": "#007800",
   "weight": 2,
   "opacity": 0.3,
   "smoothFactor": 1
 };

 var destinations = [];

 var i = 0;
 var promise = $.getJSON("airportData.json");
 var routes;
 var airports;

 function myFunction() {
   promise.then(function (data) {
     if (typeof routes !== 'undefined') {
       map.removeLayer(airports);
       map.removeLayer(routes);
     }


     destinations = [];
     text = $("#myInput").val();

     routes = L.geoJson(data, {
       onEachFeature: function (feature, layer) {
         layer.bindPopup(feature.properties.airline_name);
       },
       filter: function (feature, layer) {
         if (feature.properties.source_name == text) {
           destinations.push(feature.properties.destination_id);
           return true;
         }
       },
       style: myStyle

     });

     airports = L.geoJson(data, {

       onEachFeature: function (feature, layer) {
         layer.bindPopup(feature.properties.name);
       },
       filter: function (feature, layer) {
         for (let a = 0; a < destinations.length; a++) {
           if (feature.properties.name == text || feature.properties.id == destinations[a]) {
             i++;
             return true;
           }
         }
         if (feature.properties.name == text)
           return true;
       },
       pointToLayer: function (feature, latlng) {
         if (feature.properties.name == text)
           return L.circleMarker(latlng, sourceMarker);
         else
           return L.circleMarker(latlng, destinationMarker);
       }
     });

     routes.addTo(map)
     airports.addTo(map)
     map.addLayer(routes)
     map.addLayer(airports)
   });
 }
