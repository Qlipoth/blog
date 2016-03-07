// https://github.com/HenrikJoreteg/templatizer
var templatizer = require('templatizer');

var src      = process.cwd() + '/views/mixins/*.jade';
var dst      = process.cwd() + '/assets/js/dependencies/jade_templates.js';
// var dst      = process.cwd() + '/.tmp/public/jade_templates.js';
var dst_prod = process.cwd() + '/assets/jade_templates.js';

module.exports = function(grunt) {

    grunt.registerTask('jade2js', 'Compiles src jade to dst js', function() {
     console.log('jade2js done')
        templatizer(src, dst, {
            // namespace: 'Jade',
            dontRemoveMixins: true,
            inlineJadeRuntime: true,
        });
    });

    grunt.registerTask('jade2js_prod', 'Compiles src jade to dst js', function() {
        templatizer(src, dst_prod, {
            // namespace: 'Jade',
            dontRemoveMixins: true,
            inlineJadeRuntime: true,
        });
    });

};
