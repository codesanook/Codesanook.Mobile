import * as angular from 'angular';
import 'angular-animate';
import 'angular-sanitize';
import 'angular-ui-router';
import './ionic.module.js';
import './ionic-angular.module.js';
import 'jquery';

import DateTimeService from './services/DateTimeService';
import 'tslib'
import ServiceInterceptor from './services/ServiceInterceptor';
import registerRouters from './UiRouterRegistration';
import AppController from './controllers/AppController';
import NewsFeedController from './controllers/NewsFeedController';
import CommunityController from './controllers/CommunityController';

let app = angular.module('codeSanook',
    [
        'ngAnimate',
        'ngSanitize',
        'ui.router',
        'ionic'
    ]);

app.config((
    $httpProvider,
    $stateProvider: ng.ui.IStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider,
    $ionicConfigProvider: ionic.utility.IonicConfigProvider,
) => {
    $httpProvider.interceptors.push(ServiceInterceptor.factory);
    registerRouters($stateProvider, $urlRouterProvider);
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
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

app.controller("appController", AppController);
app.controller("newsFeedController", NewsFeedController);
app.controller("communityController", CommunityController);

app.service("dateTimeService", DateTimeService);
