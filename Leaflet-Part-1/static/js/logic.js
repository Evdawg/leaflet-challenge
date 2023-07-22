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
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
      
    });
    
    console.log(earthquakes);
    console.log(typeof(onEachFeature));
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Figure out marker customization here:
    // see source [3]: https://joekell.github.io/leaflet_map/
    // see also 

















////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
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


    // Your data markers should reflect the magnitude of the earthquake \
        // by their size and the depth of the earthquake by color. \
        // Earthquakes with higher magnitudes should appear larger, and earthquakes with greater \
        // depth should appear darker in color.
    // Hint: The depth of the earth can be found as the third coordinate for each earthquake.

    // source [1] activity 09:

  }









// Include popups that provide additional information about the earthquake \
    // when its associated marker is clicked.



// Create a legend that will provide context for your map data.



// Your visualization should look something like the preceding map.