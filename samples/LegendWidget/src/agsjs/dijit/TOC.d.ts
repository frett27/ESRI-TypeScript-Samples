


/// <reference path="../../../../../Dojo-TypeScript/dijit.d.ts" />
/// <reference path="../../../../../Dojo-TypeScript/dijit.form.button.d.ts" />
/// <reference path="../../../../../Dojo-TypeScript/dijit.form.textbox.d.ts" />

declare module AGSJS.Dijit {

	/**
	  * Widget functional interface
	  */
	interface TOCNode extends dijit._WidgetBase {

		// widgets specific methods for external use
		expand():void;
		collapse():void;
		show():void;
		hide():void;


	}

	/**
	  * Widget functional interface
	  */
	interface TOC extends dijit._WidgetBase {

		// widgets specific methods for external use

		refresh():void;
		findTOCNode(layer:esri.layers.Layer, 
					serviceLayerId? : string):TOCNode;
		

	}
}


// AMD Declaration
// for using it in AMD
declare module "agsjs/dijit/TOC" {

	var i : AGSJS.Dijit.TOC
	export = i;

}




