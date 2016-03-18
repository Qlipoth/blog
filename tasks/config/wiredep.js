module.exports = function(grunt) {
    grunt.config.set('wiredep', {
        task: {
          ignorePath: "assets/",
            // Point to the files that should be updated when
            // you run 'grunt wiredep'
            src: [
                'views/parts/head.jade',   // .html support...
            ],
            fileTypes: {
                jade: {
                  replace: {
                    js: 'script(src="{{filePath}}")'
                  }
                }
            }
        }
    });
console.log('wiredep completed');
    grunt.loadNpmTasks('grunt-wiredep');

};
