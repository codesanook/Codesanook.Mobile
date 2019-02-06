import * as angular from "angular";
import "angular-animate";
import "angular-sanitize";
import "angular-ui-router";
import "./ionic.module.js";
import "./ionic-angular.module.js";
import "jquery";

import DateTimeService from "./services/DateTimeService";
import IndexController from "./controllers/IndexController";
import 'tslib'
import ServiceInterceptor from "./services/ServiceInterceptor";

let app = angular.module('starter',
  [
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'ionic'
  ]);

app.config(($httpProvider) => {
  $httpProvider.interceptors.push(ServiceInterceptor.factory);
});

app.run(($ionicPlatform, $q) => {

  window['Promise'] = $q;
  $ionicPlatform.ready(() => {

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

app.controller("indexController", IndexController);
app.service("dateTimeService", DateTimeService);
