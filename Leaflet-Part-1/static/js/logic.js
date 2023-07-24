// Using Leaflet, create a map that plots all the earthquakes from your \
    // dataset based on their longitude and latitude.

// source [1] through line 70, activity 10:
const quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

console.log("Data shown represents significant quakes in past 30 days:")


d3.json(quakeUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
    // console.log(typeof(data.features));
    // console.log(data);
  });
  
  function createFeatures(earthquakeData) {
  
    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }


    var quakeCircles = []
    earthquakeData.forEach(x => {
        var lat=x.geometry.coordinates[1];
        var lng=x.geometry.coordinates[0];
        //console.log(x.properties.mag);

        quakeCircles.push(
            L.circle([lat,lng], {
                stroke: false,
                fillOpacity: 0.8,
                fillColor: circleColor(x.geometry.coordinates[2]),
                radius: circleSize(x.properties.mag),
            }).bindPopup(
                "<h3>" + x.properties.place +
      "</h3><hr><p>" + new Date(x.properties.time) + "</p>", {
                maxWidth : 560
            })
        )
    }
  );
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    }
  );
    
    // console.log(earthquakes);
    // console.log(typeof(onEachFeature));
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Figure out marker customization here: I can't get this to go...
    // see source [2]: https://joekell.github.io/leaflet_map/
    // see also source [3]: https://leafletjs.com/examples/choropleth/
    function circleSize(mag) {
      return mag * 100000;
  }

    function circleColor(depth) {
      var color="#FFEDA0";
      switch(true) {
          case (depth < 10):
              color="#FFEDA0";
              break;
          case (depth < 30):
              color="#FEB24C";
              break;
          case (depth < 50):
              color="#FD8D3C";
              break;
          case (depth < 70):
              color="#E31A1C";
              break;
          case (depth < 90):
              color="#BD0026";
              break;
          case (depth >= 90):
              color="#800026";
              break;
      }
      // console.log(depth);
      return color;
  }

    // Create a circle for each earthquake in the dataset
    var quakeCircles = []
    earthquakeData.forEach(x => {
        var lat=x.geometry.coordinates[1];
        var lng=x.geometry.coordinates[0];
        //console.log(x.properties.mag);

        quakeCircles.push(
            L.circle([lat,lng], {
                stroke: false,
                fillOpacity: 0.8,
                fillColor: circleColor(x.geometry.coordinates[2]),
                radius: circleSize(x.properties.mag),
            }).bindPopup(
                "<h3>" + x.properties.place +
      "</h3><hr><p>" + new Date(x.properties.time) + "</p>", {
                maxWidth : 560
            })
        )
    }
  );

////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var earthquakeLayer = L.layerGroup(quakeCircles);
    console.log(earthquakeLayer);
    console.log("above should be the eathquakeLayer bit");
    console.log(quakeCircles);


    // Send our earthquakes layer to the createMap function/
    createMap(earthquakeLayer);
  }

  function createMap(earthquakes) {
  
    // Create the base layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
 
    // Create an overlay object to hold our overlay.
    let overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    let myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [street, earthquakes]
    });
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);



      // Create a legend to display information about our map, source [2], [3]:
      var info = L.control({
        position: "bottomright"
    });
    // When the layer control is added, insert a div with the class of "legend"
    info.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML=[
            "<h2>Depth (km)</h2>",
            "<p class='l10'>Less than 10</p>",
            "<p class='l30'>Between 10 and 30</p>",
            "<p class='l50'>Between 30 and 50</p>",
            "<p class='l70'>Between 50 and 70</p>",
            "<p class='l90'>Between 70 and 90</p>",
            "<p class='g90'>Greater than 90</p>"
        ].join("");

        return div;
    };
    // Add the info legend to the map
    info.addTo(myMap);
}
