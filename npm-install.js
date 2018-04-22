#!/usr/bin/env node

const fs = require("fs");
const path = require('path');
const exec = require('child_process').exec;

module.exports = function (context) {
  let q = context.requireCordovaModule('q');
  let deferred = q.defer();

  exec("npm install", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    deferred.resolve();
  });


  return deferred.promise;
}

function InstallModules(q) {
  //https://stackoverflow.com/a/34047600/1872200
  let deferred = q.defer();
  npm.load(function (err) {
    // handle errors
    // install module ffi
    npm.commands.install([], function (error, data) {
      // log errors or data
      console.log(error);
      deferred.resolve();
    });

    npm.on('log', function (message) {
      // log installation progress
      console.log(message);
    });
  });

  //   bower.commands.install([], {
  //     save: true
  //   });

  return deferred.promise;
}
