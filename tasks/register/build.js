module.exports = function (grunt) {
	grunt.registerTask('build', [
		'compileAssets',
		'linkAssetsBuild',
    'jade2js',
		// 'clean:build',
    // 'copy:build',
		'sync:dev',

	]);
};
