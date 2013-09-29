
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

		
		launchRequest(url : string, parameters : Object, callback : (result:string) => void)  : void ;

	}
}


// AMD Declaration
// for using it in AMD
declare module "app/custom/RequestWidget" {

	var i : Custom.RequestWidget;
	export = i;

}


