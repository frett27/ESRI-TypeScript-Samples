
# Writing Entreprise Widgets in TypeScript #

Typescript is known as a tailored javacript, for enterprise application of huge and collaborative javascript applications. This article show how to bring this step to permit construct complex javascript widgets


##Widgets

Widgets are AMD module, exporting a dijit class. 
The First step in defining it in typescript using the ESRI-Typescript library is to create an AMD module. An AMD Module is a typescript file, that return the dojo class definition as following in the implementation :


**File /app/custom/RequestWidget.ts**
	
	
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
	
			// the self variable is defined in every function to enforce the static type checking
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
	
	// create the dojo widget class, using the imported dojo_declare function :
	var x = dojo_declare([widget, templatedMixin, widgetsInTemplateMixin], props ); 
	
	// export it for AMD module definition
	export = x;



External definition of the widget is defined in a **.d.ts** file, associated and referenced in the implementation of the widget. This definition file permit to show what are the methods and properties of the widget that will be verified by the compiler.



**File /app/custom/RequestWidget.d.ts**
    
    
    // This file is the external definition of the module, used for the external code that use the module
    
    
    /// <reference path="../../../../Dojo-TypeScript/dijit.d.ts" />
    /// <reference path="../../../../Dojo-TypeScript/dijit.form.button.d.ts" />
    /// <reference path="../../../../Dojo-TypeScript/dijit.form.textbox.d.ts" />
    
    declare module Custom {
    
    	/**
    	  * Widget functional interface
    	  */
    	interface RequestWidget extends dijit._WidgetBase {
    
    		ok : dijit.form.Button;
    		jsonrequest : dijit.form.TextBox;
    		jsonresponse : dijit.form.TextBox;
    		url : dijit.form.TextBox;
    
    		// widgets specific methods for external use
    		
    		launchRequest(url : string, parameters : Object, callback : (result:string) => void)  : void ;
    
    	}
    }
    
    
    // AMD Declaration
    // for using it in AMD
    declare module "app/custom/RequestWidget" {
    
    	var i : Custom.RequestWidget;
    	export = i;
    
    }
    





## Using the widget ##

This presented widget is then compiled in clean javascript, and it's definition is managed by the compiler, easing the reuse and several potential refactoring.

The usage of the widget is straightforward if you've used a widget in javascript, 

First come with the loader that will allow the loading of the module :

		<script type="text/javascript">

			var appPath = location.pathname.replace(/[^\/]+$/, '') + "app";

			var dojoConfig = {
				async: false,
				isDebug: true,
				parseOnLoad: true,
				packages: [{
					name: "app",
					location: appPath
				}]
			};
		</script>


Then instanciate the widget in the dom, 


	<body>
		<!-- add the RequestWidget in page, this is the only thing to do -->
		<div data-dojo-type="app/custom/RequestWidget" id="req" ></div> 
	</body>

that's all folks, if you want to give it a try,grab the repository [https://github.com/frett27/ESRI-TypeScript-Samples](https://github.com/frett27/ESRI-TypeScript-Samples "ESRI-TypeScript-Sample") and launch grunt. Follow the instruction for 3mins test drive.


