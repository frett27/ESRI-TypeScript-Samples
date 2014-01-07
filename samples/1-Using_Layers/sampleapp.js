// Module AMD associated to the sample application
define(["require", "exports", "dojo/ready", "esri/map", "esri/layers/ImageParameters", "esri/layers/ArcGISDynamicMapServiceLayer"], function(require, exports, ready, Map, ImageParameters, ArcGISDynamicMapServiceLayer) {
    return function () {
        // create the map with a default basemap (street) and add it inside the HTML mapDiv
        var map = new Map("map", {
            center: [-56.049, 38.485],
            zoom: 3,
            basemap: "streets"
        });

        // specify the image parameters
        var imageParameters = new ImageParameters();
        imageParameters.format = "jpeg"; //set the image type to PNG24, note default is PNG8.

        // take a URL to a non cached map service.
        var dynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer", {
            "opacity": 0.5,
            "imageParameters": imageParameters
        });

        // add the layer to the map
        map.addLayer(dynamicMapServiceLayer);
    };
});
