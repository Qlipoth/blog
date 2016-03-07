module.exports = function (grunt) {
	grunt.registerTask('default', [
    'wiredep',
    'compileAssets',
    'linkAssets',
    'jade2js',
    'watch',
  ]);
};
