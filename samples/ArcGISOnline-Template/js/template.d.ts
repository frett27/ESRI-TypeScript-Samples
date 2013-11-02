
/// <reference path="../config/defaults.d.ts" />


declare module Application {

	class Template extends dojo.Evented {

		localize : boolean;
		config : Config.Defaults;

		constructor(supportsLocalization : boolean);
		_init() : dojo.Promise<any>;
		_initializeApplication() : void;
		_createUrlParamsObject(items : Array<string>):any; 
		_setupOAuth(id : string , portal : string) : void;
		_getLocalization() : dojo.Promise<any>;
		_queryApplicationConfiguration() : dojo.Promise<any>;
		_queryOrganizationInformation(): dojo.Promise<any>;
		_queryUrlParams() : any;

	}



}


declare module "application/template" {
	var t : Application.Template;
	export = t;
}



