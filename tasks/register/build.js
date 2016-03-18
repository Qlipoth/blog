module.exports = function (grunt) {
	grunt.registerTask('build', [
    'wiredep',
    'compileAssets',
    'linkAssets',
    'jade2js',
		'sync:dev',

	]);
};
