define(["require", "exports", "dojo/ready", "esri/map", "esri/layers/ImageParameters", "esri/layers/ArcGISDynamicMapServiceLayer"], function(require, exports, __ready__, __Map__, __ImageParameters__, __ArcGISDynamicMapServiceLayer__) {
    var ready = __ready__;
    var Map = __Map__;
    var ImageParameters = __ImageParameters__;
    var ArcGISDynamicMapServiceLayer = __ArcGISDynamicMapServiceLayer__;

    return function () {
        var map = new Map("map", {
            center: [-56.049, 38.485],
            zoom: 3,
            basemap: "streets"
        });

        var imageParameters = new ImageParameters();
        imageParameters.format = "jpeg";

        var dynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer", {
            "opacity": 0.5,
            "imageParameters": imageParameters
        });

        map.addLayer(dynamicMapServiceLayer);
    };
});
//# sourceMappingURL=sampleapp.js.map
