export default function registerRouters(
    $stateProvider: ng.ui.IStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
): void {

    //parent template for the app
    $stateProvider.state('app', {
        url: "/app",
        abstract: true, //base template
        templateUrl: "templates/app.html",
        controller: 'appController as appCtrl',
    });

    //tab inside side menu
    $stateProvider.state('app.tab', {
        url: "/tab",
        abstract: true,
        views: {
            'mainContentView': {//base template for tab items
                templateUrl: 'templates/tab.html'
            }
        }
    });

    $stateProvider.state("app.tab.news-feed", {
        url: "/news-feed",
        views: {
            'newsFeedView': {//name of ion nav view
                templateUrl: "templates/news-feed.html",
                controller: "newsFeedController as newsFeedCtrl"
            }
        }
    });

    $stateProvider.state('app.tab.community', {
        url: "/community",
        views: {
            'communityView': {//name of ion nav view
                templateUrl: 'templates/community.html',
                controller: 'communityController as communityCtrl'
            }
        }
    });

    $stateProvider.state('app.setting', {
        url: "/setting",
        views: {
            'mainContentView': {//name of ion nav view
                templateUrl: 'templates/setting.html',
                controller: 'settingController as settingCtrl'
            }
        }
    });

    $stateProvider.state('app.temperature', {
        url: "/temperature",
        views: {
            'mainContentView': { //name of ion nav view
                templateUrl: 'templates/temperature.html',
                controller: 'temperatureController as temperatureCtrl'
            }
        }
    });

    //By default page, go to URL not a state name and must be start from a parent URL
    $urlRouterProvider.otherwise("/app/tab/news-feed");
}
