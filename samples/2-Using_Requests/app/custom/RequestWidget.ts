 
/// <reference path="../../../../ESRI-TypeScript/esri.amd.d.ts" />
/// <reference path="../../../../Dojo-TypeScript/dojo.d.ts" />
/// <reference path="../../../../Dojo-TypeScript/dijit.d.ts" />

import dojo_declare = require("dojo/_base/declare");
import lang = require("dojo/_base/lang");
import widget = require("dijit/_WidgetBase");
import templatedMixin = require("dijit/_TemplatedMixin");
import widgetsInTemplateMixin = require("dijit/_WidgetsInTemplateMixin");
import on = require("dojo/on");
import esriRequest = require("esri/request");
import json = require("dojo/json");

//import Button = require("dijit/form/Button");
//import TextBox = require("dijit/form/TextBox");


function postCreate() : void 
{

		 this.inherited(arguments);
		 var self = this;
		 on(this.ok, "click", function(e) {
            var parameters: string = self.jsonrequest.value;
            if (parameters) {
                console.log("parameters :" + parameters);
                parameters = json.parse(parameters);
            }
            self.launchRequest(self.url.value, parameters, (r: string) => {
                self.jsonresponse.value = r
            });
            console.log("request launched");
        });


}

function launchRequest(url : string, parameters : Object, callback : (result:string) => void)  : void 
{
	 esriRequest({ url  : url,
		   content : parameters,
		   handleAs : "text"
		  }).then( callback , (err)=>{ console.log("erreur dans la requete " + err);} );

}


var props = {

    templatePath : "app/custom/RequestWidgetTemplate.html",  

	postCreate:postCreate,

	launchRequest : launchRequest
}


var x = dojo_declare([widget, templatedMixin, widgetsInTemplateMixin], props ); 

export = x;

