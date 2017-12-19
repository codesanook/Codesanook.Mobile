var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var IndexController = (function () {
            function IndexController($scope, $q, $http, $document) {
                this.$scope = $scope;
                this.$q = $q;
                this.$http = $http;
                this.$document = $document;
                var utcNow = moment.utc();
                $scope.message = "Hello world at " + utcNow.toISOString();
            }
            return IndexController;
        }());
        //register controller to a module
        angular.module("starter")
            .controller("indexController", [
            "$scope",
            "$q",
            "$http",
            "$document",
            IndexController
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
