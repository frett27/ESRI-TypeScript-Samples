
declare module Config {

	interface Defaults {
		appid : string;
		webmap : string;
		proxyurl : string;
		theme : string;
		bingmapskey : string;
		sharinghost : string;

		oauthappid : string;
		group : string;
	}

}





declare module "config/defaults" {
	var i : Config.Defaults;
	export = i;

}


