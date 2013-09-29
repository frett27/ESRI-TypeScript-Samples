
/// <reference path="../../../../Dojo-TypeScript/dijit.d.ts" />

declare module Custom {

	/**
	  * Widget
	  */
	interface RequestWidget extends dijit._WidgetBase {
		
		launchRequest(url : string, parameters : Object, callback : (result:string) => void)  : void ;

	}

	

}


// AMD Declaration
declare module "app/custom/RequestWidget" {

	var i : Custom.RequestWidget;
	export = i;

}


