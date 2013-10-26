
/// <reference path="../config/defaults.d.ts" />


declare module Application {

	class Template extends dojo.Evented {

		localize : boolean;
		config : Config.Defaults;

		constructor(supportsLocalization : boolean);
		_init() : dojo.Promise<void>;
		_initializeApplication() : void;
		_createUrlParamsObject(items : Array<string>):any; 
		_setupOAuth(id : string , portal : string);
		_getLocalization();
		_queryApplicationConfiguration();
		_queryOrganizationInformation();
		_queryUrlParams();

	}



}


declare module "application/template" {
	var t : Application.Template;
	export = t;
}



