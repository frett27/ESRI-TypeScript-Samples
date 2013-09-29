 
/// <reference path="../../../../ESRI-TypeScript/esri.amd.d.ts" />
/// <reference path="../../../../Dojo-TypeScript/dojo.d.ts" />
/// <reference path="../../../../Dojo-TypeScript/dijit.d.ts" />

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

// postCreate
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

// launchRequest method
function launchRequest(url : string, parameters : Object, callback : (result:string) => void)  : void 
{
	 esriRequest({ url  : url,
		   content : parameters,
		   handleAs : "text"
		  }).then( callback , (err)=>{ console.log("erreur dans la requete " + err);} );

}

// Dojo class definition
var props = {
    templatePath : "app/custom/RequestWidgetTemplate.html",  
	postCreate:postCreate,
	launchRequest : launchRequest
}

// create the dojo widget class
var x = dojo_declare([widget, templatedMixin, widgetsInTemplateMixin], props ); 

export = x;

