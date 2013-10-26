
// Module AMD associated to the sample application


/// <reference path="../../ESRI-TypeScript/esri.amd.d.ts" />

import ready = require("dojo/ready");
import Map = require("esri/map");
import ImageParameters = require("esri/layers/ImageParameters");
import ArcGISDynamicMapServiceLayer = require("esri/layers/ArcGISDynamicMapServiceLayer");
import json = require("dojo/json");

function logProperty(o : Object) : Object
{
	try {
		json.stringify(o);
		return o;
	} catch(e)
	{
		return "[undumpable Object]";
	}
}


function logObject(o : Object) : void 
{
	var r : Object = new Object();
	for (var p in o)
	{
		r[p] = logProperty(o[p]); 
	}

	document.getElementById("events").innerHTML = json.stringify(r,null,true).replace(/\n/g,"<br/>");
}

function eventLog(e:Event) : boolean
{
	logObject(<any>e);return true; 
}




return function() {

    // create the map with a default basemap (street) and add it inside the HTML mapDiv
    var map: esri.Map = new Map("map", {
        center: [-56.049, 38.485],
        zoom: 3,
        basemap: "streets"
    });

	// specify the image parameters
    var imageParameters = new ImageParameters();
    imageParameters.format = "jpeg"; //set the image type to PNG24, note default is PNG8.

    // take a URL to a non cached map service.
    var dynamicMapServiceLayer: esri.layers.ArcGISDynamicMapServiceLayer = 
		new ArcGISDynamicMapServiceLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer", {
        "opacity": 0.5,
        "imageParameters": imageParameters
    });

    // add the layer to the map
    map.addLayer(dynamicMapServiceLayer);

	map.on("dbl-click",eventLog);
	map.on("extent-change",(e) => { logObject(<any>e);return true });



};
