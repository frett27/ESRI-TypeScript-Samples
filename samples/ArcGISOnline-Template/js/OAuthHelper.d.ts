/// <reference path="../../../Dojo-TypeScript/dojo.d.ts" />

declare module Application {

	interface OAuthInitParameters {
		appId : string;
		portal : string;
		expiration : number;
	}

	class OAuthHelper {

		init(parameters : OAuthInitParameters);
		isSignedIn() : dojo.Deferred<esri.Credential>;
		signOut();
		checkOAuthResponse(url , clearHash);
		checkCookie();
		registerToken(oauthResponse);
		parseFragment(url : string);
		overrideIdentityManager();

	}

}




declare module "application/OAuthHelper" {

	var i : Application.OAuthHelper;
	export = i;

}


