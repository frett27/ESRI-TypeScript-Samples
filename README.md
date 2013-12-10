
ESRI-TypeScript-Samples ![](https://travis-ci.org/frett27/ESRI-TypeScript-Samples.png?branch=master)
=======================


This repository demonstrate the use of ESRI-TypeScript definition to bring typing to [ESRI Javascript API version 3.4 - 3.7](https://developers.arcgis.com/en/javascript/). 


What's New
--------

__Since : 10/12/2013__, freeze the typescript compiler version to 0.9.1 as the new 0.9.5 imply some modifications in the bindings. should be ok for `npm install` :-), as it is monitored by Travis, we should now be warned if something is wrong with the project.


__Since : 10/12/2013__, new page for creating widgets with typescript : [https://github.com/frett27/ESRI-TypeScript-Samples/blob/master/WritingWidgetsInTypeScript.md]


__Since : 27/10/2013__, we include a translation of the boilerplate project in typescript [https://github.com/Esri/application-boilerplate-js](https://github.com/Esri/application-boilerplate-js), permitting to start developping some ArcGIS Online templates.


Disclamer
--------

The work is currently in progress, a big part of the mapping are available, but we hope that the community will appreciate and bring helpful contributions. We started to build applications on this ibrary that permit to see real world usage of the binding.


Getting Started with this version
---------------------------------

you must have GIT and NodeJS installed.


on the command line, at the project root, install the grunt commande line, using :

`npm -g install grunt-cli`

the on the project, get all dependencies using :

`
npm install
`

compile, and then run the samples launching 
`
grunt
`. 


__you are ready to go !__

the project will compile, and launch a web browser to watch the samples


Helping us
----------

Lots of stuff are already still to be done, only a few samples are available, so feel free to help us to provide a more rich sample set with a good usage coverage.


**Thank's :**
-------------

Many thank's to schungx for his Dojo AMD 1.9 binding. That help a lot.

Many thank's to Fabrice Leray for his First Version on the typescript binding (legacy style) [https://github.com/fleray/esri_web_playground](https://github.com/fleray/esri_web_playground)

