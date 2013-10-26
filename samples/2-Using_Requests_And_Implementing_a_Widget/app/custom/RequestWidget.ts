
//
// This example show how to implement a widget using the typescript language
//
//      implementing the widget consist into 3 files, 
//			- the *.d.ts : define the wiget for calling it from 
//			- the *.ts : the widget implementation
//			- the css or html templates (defined for dojo)


// reference the used types
 
/// <reference path="../../../../ESRI-TypeScript/esri.amd.d.ts" />
/// <reference path="../../../../Dojo-TypeScript/dojo.d.ts" />
/// <reference path="../../../../Dojo-TypeScript/dijit.d.ts" />

//
// reference the widget definition, for benefit the typeing system
//
/// <reference path="RequestWidget.d.ts" />

import dojo_declare = require("dojo/_base/declare");
import lang = require("dojo/_base/lang");
import widget = require("dijit/_WidgetBase");
import templatedMixin = require("dijit/_TemplatedMixin");
import widgetsInTemplateMixin = require("dijit/_WidgetsInTemplateMixin");
import on = require("dojo/on");
import esriRequest = require("esri/request");
import json = require("dojo/json");
import registry = require("dijit/registry");

// methods are here declared as function to benefit the compiler typing check

// postCreate, this is an overload of the widget method
function postCreate() : void 
{

		 var self : Custom.RequestWidget = this;

		 self.inherited(arguments);
		 on(this.ok, "click", function(e) {
            var parameters: string = self.jsonrequest.get("value");
            if (parameters) {
                console.log("parameters :" + parameters);
                parameters = json.parse(parameters);
            }
            self.launchRequest(self.url.get("value"), parameters, (r: string) => {
                self.jsonresponse.set("value ",r);
            });
            console.log("request launched");
        });


}

// widget specific launchRequest method
function launchRequest(url : string, parameters : Object, callback : (result:string) => void)  : void 
{
	 esriRequest({ url  : url,
		   content : parameters,
		   handleAs : "text"
		  }).then( callback , (err)=>{ console.log("erreur dans la requete " + err);} );

}

// Dojo class definition
//		dojo define the methods or overloads as a property set
var props = {
	// template path point to the html templated widget
    templatePath : "app/custom/RequestWidgetTemplate.html",  
	// define then the postCreate to initialize your widget
	postCreate : postCreate,
	// define the widgets methods
	launchRequest : launchRequest
}

// create the dojo widget class
var x = dojo_declare([widget, templatedMixin, widgetsInTemplateMixin], props ); 

// export it for AMD module definition
export = x;

