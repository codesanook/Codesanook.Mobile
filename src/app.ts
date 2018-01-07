import * as angular from 'angular';
import "angular-animate";
import "angular-sanitize";
import "angular-ui-router";
import './ionic.module.js';
import './ionic-angular.module.js';
import 'jquery';

import IndexController from "./controllers/IndexController";
import DatetimeService from "./services/DatetimeService";


let module = angular.module('starter',
  [
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'ionic'
  ])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        window.cordova.plugins.Keyboard.disableScroll(true);
      }

      if (window.cordova && window.cordova.InAppBrowser) {
        window.open = window.cordova.InAppBrowser.open;
      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        window.StatusBar.styleDefault();
      }
    });
  });

module.controller("indexController", IndexController);
module.service("datetimeService", DatetimeService);
