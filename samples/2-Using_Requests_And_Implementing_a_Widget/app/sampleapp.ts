

// this is the main app function
// this example show how to use the widget from outside



/// <reference path="../../../ESRI-TypeScript/esri.amd.d.ts" />
/// <reference path="../../../Dojo-TypeScript/dijit.d.ts" />

import registry = require("dijit/registry");
import mywidget = require("app/custom/RequestWidget");


return function() {

	// get reference of RequestWidget, we called it "req" in the main html page
	var w : Custom.RequestWidget = <Custom.RequestWidget>registry.byId("req");

	// call methods on the widget


};




