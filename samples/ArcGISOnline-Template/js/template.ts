

/// <reference path="template.d.ts" />

import Evented= require( "dojo/Evented");
import parser=require("dojo/parser");
import dojo_declare = require("dojo/_base/declare");
import kernel=require("dojo/_base/kernel");
import array=require("dojo/_base/array");
import lang=require("dojo/_base/lang");
import domClass = require("dojo/dom-class");
import Deferred = require("dojo/Deferred");
import all = require("dojo/promise/all");
import arcgisUtils = require("esri/arcgis/utils");
import urlUtils = require("esri/urlUtils");
import esriRequest = require("esri/request");
import esriConfig = require("esri/config");
import IdentityManager = require("esri/IdentityManager");
import GeometryService = require("esri/tasks/GeometryService");
import defaults = require("config/defaults");
import OAuthHelper = require("application/OAuthHelper");



function constructor (supportsLocalization) {

	var self : Application.Template = this;

	//config will contain application and user defined info for the application such as i18n strings, 
	//the web map id and application id, any url parameters and any application specific configuration
	// information. 
	self.config = defaults;
	self.localize = supportsLocalization || false;
	self._init().then(lang.hitch(self, function() {
		self.emit("ready", this.config);
	}));
}

//Get URL parameters and set applciation defaults needed to query arcgis.com for 
//an applciation and to see if the app is running in Portal or an Org
function _init () : dojo.Promise<any> {
	var self : Application.Template = this;

	var deferred = new Deferred();
	//Set the web map, group and appid if they exist but ignore other url params. 
	//Additional url parameters may be defined by the application but they need to be mixed in
	//to the config object after we retrive the application configuration info. As an example, 
	//we'll mix in some commonly used url paramters in the _queryUrlParams function after 
	//the application configuration has been applied so that the url parametrs overwrite any 
	//configured settings. It's up to the application developer to update the application to take 
	//advantage of these parameters. 
	var paramItems : Array<string> = ['webmap', 'appid', 'group', 'oauthappid'];
	var mixinParams = self._createUrlParamsObject(paramItems);
	lang.mixin(self.config, mixinParams);
	//Define the sharing url and other default values like the proxy. 
	//The sharing url defines where to search for the web map and application content. The
	//default value is arcgis.com. 
	self._initializeApplication();
	all([self._getLocalization(), self._queryOrganizationInformation()]).then(lang.hitch(self, function() {
		self._queryApplicationConfiguration().then(lang.hitch(self, function() {
			//update URL Parameters. Uncomment the following line and 
			//edit the _queryUrlParams function if your application needs to support
			//custom url parameters. 
			self._queryUrlParams();
			//setup OAuth if oauth appid exists
			if (self.config.oauthappid) {
				self._setupOAuth(self.config.oauthappid, self.config.sharinghost);
			}
			deferred.resolve(null);
		}));
	}));
	return deferred.promise;
}

function _createUrlParamsObject (items: Array<string>) {
	//retrieve url parameters. Templates all use url parameters to determine which arcgis.com 
	//resource to work with. 
	//Map templates use the webmap param to define the webmap to display
	//Group templates use the group param to provide the id of the group to display. 
	//appid is the id of the application based on the template. We use this 
	//id to retrieve application specific configuration information. The configuration 
	//information will contain the values the  user selected on the template configuration 
	//panel.  
	var urlObject : any = urlUtils.urlToObject(document.location.href);
	urlObject.query = urlObject.query || {};
	var obj = {};
	if (urlObject.query && items && items.length) {
		for (var i = 0; i < items.length; i++) {
			if (urlObject.query[items[i]]) {
				obj[items[i]] = urlObject.query[items[i]];
			}
		}
	}
	return obj;
}

function _initializeApplication () {
	var self : Application.Template = this;

	//Check to see if the app is hosted or a portal. If the app is hosted or a portal set the
	// sharing url and the proxy. Otherwise use the sharing url set it to arcgis.com. 
	//We know app is hosted (or portal) if it has /apps/ or /home/ in the url. 
	var appLocation = location.pathname.indexOf("/apps/");
	if (appLocation === -1) {
		appLocation = location.pathname.indexOf("/home/");
	}
	//app is hosted and no sharing url is defined so let's figure it out. 
	if (appLocation !== -1) {
		//hosted or portal
		var instance = location.pathname.substr(0, appLocation); //get the portal instance name
		self.config.sharinghost = location.protocol + "//" + location.host + instance;
		self.config.proxyurl = location.protocol + "//" + location.host + instance + "/sharing/proxy";
	} else {
		//setup OAuth if oauth appid exists. If we don't call it here before querying for appid
		//the idenity manager dialog will appear if the appid isn't publicly shared. 
		if (self.config.oauthappid) {
			self._setupOAuth(self.config.oauthappid, self.config.sharinghost);
		}
	}
	arcgisUtils.arcgisUrl = self.config.sharinghost + "/sharing/rest/content/items";
	//Define the proxy url for the app 
	if (self.config.proxyurl) {
		esriConfig.defaults.io.proxyUrl = self.config.proxyurl;
		esriConfig.defaults.io.alwaysUseProxy = false;
	}
}

function _setupOAuth (id, portal) : void{
	OAuthHelper.init({
		appId: id,
		portal: portal,
		expiration: (14 * 24 * 60) //2 weeks (in minutes)
	});
}

function _getLocalization () : dojo.Promise<any> {
	var self : Application.Template = this;
	var deferred = new Deferred<void>();
	if (self.localize) {
		require(["dojo/i18n!application/nls/resources"], lang.hitch(self, function(appBundle) {
			//Get the localization strings for the template and store in an i18n variable. Also determine if the 
			//application is in a right-to-left language like Arabic or Hebrew. 
			self.config.i18n = appBundle || {};
			//Bi-directional language support added to support right-to-left languages like Arabic and Hebrew
			//Note: The map must stay ltr  
			self.config.i18n.direction = "ltr";
			array.some(["ar", "he"], lang.hitch(self, function(l) {
				if (kernel.locale.indexOf(l) !== -1) {
					self.config.i18n.direction = "rtl";
					return true;
				} else {
					return false;
				}
			}));
			//add a dir attribute to the html tag. Then you can add special css classes for rtl languages
			var dirNode : any = document.getElementsByTagName("html")[0];
			var classes = dirNode.className;
			if (self.config.i18n.direction === "rtl") {
				//need to add support for dj_rtl. 
				//if the dir node is set when the app loads dojo will handle. 
				dirNode.setAttribute("dir", "rtl");
				var rtlClasses = " esriRTL dj_rtl dijitRtl " + classes.replace(/ /g, "-rtl ");
				dirNode.className = lang.trim(classes + rtlClasses);
			} else {
				dirNode.setAttribute("dir", "ltr");
				domClass.add(dirNode, "esirLTR");
			}
			deferred.resolve(self.config.i18n);
		}));
	} else {
		deferred.resolve(null);
	}
	return deferred.promise;
}

function _queryApplicationConfiguration () : dojo.Promise<any>{
	var self : Application.Template = this;
	//If there is an application id query arcgis.com using esri.arcgis.utils.getItem to get the item info.
	// If the item info includes itemData.values then the app was configurable so overwrite the
	// default values with the configured values. 
	var deferred = new Deferred();
	if (self.config.appid) {
		arcgisUtils.getItem(self.config.appid).then(lang.hitch(self, function(response) {
			lang.mixin(self.config, response.itemData.values);
			//setup OAuth if oauth appid exists. In this siutation the oauthappid is specified in the 
			//configuration panel. 
			if (response.itemData.values && response.itemData.values.oauthappid) {
				self._setupOAuth(response.itemData.values.oauthappid, self.config.sharinghost);
			}
			deferred.resolve(null);
		}));
	} else {
		deferred.resolve(null);
	}
	return deferred.promise;
}

function _queryOrganizationInformation () : dojo.Promise<any> {
	var self : Application.Template = this;
	var deferred = new Deferred<void>();
	//Get default helper services or if app hosted by portal or org get the specific settings for that organization.
	esriRequest({
		url: self.config.sharinghost + "/sharing/rest/portals/self",
		content: {
			"f": "json"
		},
		callbackParamName: "callback"
	}).then(lang.hitch(self, function(response) {
		self.config.helperServices = {};
		lang.mixin(self.config.helperServices, response.helperServices);
		//Let's set the geometry helper service to be the app default.  
		if (self.config.helperServices && self.config.helperServices.geometry && self.config.helperServices.geometry.url) {
			esriConfig.defaults.geometryService = new GeometryService(self.config.helperServices.geometry.url);
		}
		deferred.resolve(null);
	}), function(error) {
		console.log(error);
		deferred.resolve(null);
	});
	return deferred.promise;
}

function _queryUrlParams () : any{
	var self : Application.Template = this;
	//This function demonstrates how to handle additional custom url parameters. For example 
	//if you want users to be able to specify lat/lon coordinates that define the map's center or 
	//specify an alternate basemap via a url parameter. 
	//If these options are also configurable these updates need to be added after any 
	//application default and configuration info has been applied. Currently these values 
	//(center, basemap, theme) are only here as examples and can be removed if you don't plan on 
	//supporting additional url parameters in your application. 
	var paramItems = ['center', 'basemap', 'theme'];
	var mixinParams = self._createUrlParamsObject(paramItems);
	lang.mixin(self.config, mixinParams);
}

var dojoProps = {
        config: {},
        localize: false,
		constructor : constructor,
		_init : _init,
		_queryUrlParams : _queryUrlParams,
		_createUrlParamsObject : _createUrlParamsObject,
		_initializeApplication : _initializeApplication,
		_queryOrganizationInformation : _queryOrganizationInformation,
		_queryApplicationConfiguration : _queryApplicationConfiguration,
		_getLocalization : _getLocalization,
		_setupOAuth : _setupOAuth

}

return dojo_declare([Evented], dojoProps);
