#!/usr/bin/env node

const fs = require("fs");
const gulp = require('gulp');
const path = require('path');

module.exports = function(context) {
    //https://stackoverflow.com/a/34047600/1872200
    let deferred = context.requireCordovaModule('q').defer();
    console.log(JSON.stringify(context, null, 2));
    let rootdir = context.opts.projectRoot;
    let gulpfile = path.join(rootdir, 'gulpfile.js');
    console.log("building ionic project");

    //run gulp build
    require(gulpfile);
    gulp.start("build").once('task_stop', function() {
        console.log("ionic project built");
        deferred.resolve();
    });

    //to make gulp build finish before start antoher task
    return deferred.promise;
}