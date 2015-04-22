'use strict';

module.exports = function (grunt, options) {
<<<<<<< HEAD
    var pkgFunction = function(){
        return grunt.file.readJSON('package.json')
    };
    //THIS extension forces the banner or whatever uses pkgFunction to always get the latest version
    //where as pkg is only done once at grunt init.
    _.extend(options, {
        pkgFunction: pkgFunction
    });
    return pkgFunction();
=======
    return grunt.file.readJSON('package.json');
>>>>>>> c35f75ee9a50e06136946f48ffbdd984d1d2750b
};
