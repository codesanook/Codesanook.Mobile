import * as angular from 'angular';
import 'angular-animate';
import 'angular-sanitize';
import 'angular-ui-router';
import './ionic.module.js';
import './ionic-angular.module.js';
import "ng-cordova"

import DateTimeService from './services/DateTimeService';
import 'tslib'
import ServiceInterceptor from './services/ServiceInterceptor';
import registerRouters from './UiRouterRegistration';
import AppController from './controllers/AppController';
import NewsFeedController from './controllers/NewsFeedController';
import CommunityController from './controllers/CommunityController';
import SettingController from './controllers/SettingController';

import "angular-translate"
const enLocale = require('./locale/en.json');
const thLocale = require('./locale/th.json');

const app = angular.module('codeSanook',
    [
        'ngAnimate',
        'ngSanitize',
        'ui.router',
        'ionic',
        'pascalprecht.translate',
        'ngCordova',
    ]);

app.config((
    $httpProvider,
    $stateProvider: ng.ui.IStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider,
    $ionicConfigProvider: ionic.utility.IonicConfigProvider,
    $translateProvider: ng.translate.ITranslateProvider
) => {
    $httpProvider.interceptors.push(ServiceInterceptor.factory);
    registerRouters($stateProvider, $urlRouterProvider);
    $ionicConfigProvider.tabs.position('bottom'); // other values: top

    $translateProvider.translations('en', enLocale);
    $translateProvider.translations('th', thLocale);
    $translateProvider.preferredLanguage('th');
});

app.run((
    $ionicPlatform: ionic.platform.IonicPlatformService,
    $q: ng.IQService,
    $rootScope: ng.IRootScopeService,
    $document: ng.IDocumentService,
    $window: ng.IWindowService
) => {
    $window['Promise'] = $q;

    $ionicPlatform.ready(() => {

        if ($window.cordova && $window.cordova.plugins && $window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            $window.cordova.plugins.Keyboard.disableScroll(true);
        }

        if ($window.cordova && $window.cordova.InAppBrowser) {
            $window.open = $window.cordova.InAppBrowser.open;
        }

        if ($window.StatusBar) {
            // org.apache.cordova.statusbar required
            $window.StatusBar.styleDefault();
        }

        if ($window.cordova) {
            // listen for Online event
            $rootScope.$on('$cordovaNetwork:online', (event, networkState) => {
                $document.find('.offline-status').css('display', 'none');
            });

            // listen for Offline event
            $rootScope.$on('$cordovaNetwork:offline', (event, networkState) => {
                $document.find('.offline-status').css('display', 'flex');
            });
        }

        console.log('end device ready');
    });
});

app.controller("appController", AppController);
app.controller("newsFeedController", NewsFeedController);
app.controller("communityController", CommunityController);
app.controller("settingController", SettingController);
app.service("dateTimeService", DateTimeService);
