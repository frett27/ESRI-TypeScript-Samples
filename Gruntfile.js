"use strict";


function serve(connect, options) {
	// overload for not downloading the file, instead, view it
	connect.mime.define({'text/plain':['ts']});
	var middlewares = [];
		if (!Array.isArray(options.base)) {
		options.base = [options.base];
	}
	var directory = options.directory || options.base[options.base.length - 1];
	options.base.forEach(function(base) {
		// Serve static files.
		middlewares.push(connect.static(base));
	});
	// Make directory browse-able.
	middlewares.push(connect.directory(directory));
	return middlewares;
}



module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './',
					middleware: serve
                }
            }
        },

        typescript: {
            base: {
                src: ['samples/**/*.ts'],

                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    base_path: './',
                    sourcemap: false,
                    fullSourceMapPath: true,
                    force: true,
                    declaration: false,
					comments : true
                }
            }

        },
        watch: {
            files: '**/*.ts',
            tasks: ['typescript']
        },
        open: {
            dev: {
                path: 'http://localhost:8080/index.html'
            }
        }
        /*,
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    extension: '.ts', // Default '.js' <comma-separated list of file extensions>
                    paths: 'samples/',
                    outdir: 'docs/'
                }
            }
        }*/



    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    //grunt.loadNpmTasks('grunt-contrib-yuidoc');

    // Default task(s).
    //grunt.registerTask('default', ['typescript', 'connect', 'yuidoc', 'open', 'watch']);
    grunt.registerTask('default', ['typescript', 'connect', 'open', 'watch']);


};
