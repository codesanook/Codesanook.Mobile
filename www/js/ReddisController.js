var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var RedditController = (function () {
            function RedditController($scope, $q, $http, $document) {
                var _this = this;
                this.$scope = $scope;
                this.$q = $q;
                this.$http = $http;
                this.$document = $document;
                this.$scope.stories = [];
                this.getData()
                    .then(function (response) {
                    //console.log("response.data %s", JSON.stringify(response));
                    angular.forEach(response.data.children, function (child) {
                        _this.$scope.stories.push(child.data);
                    });
                });
                this.$scope.openLink = function (url) {
                    window.open(url, "_blank");
                };
            }
            RedditController.prototype.getData = function () {
                var deferred = this.$q.defer();
                var url = "js/reddis-api.json";
                var req = {
                    method: "GET",
                    url: url,
                    headers: {
                        'Content-Type': "application/json",
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json'
                    }
                };
                this.$http(req)
                    .then(function (response) {
                    deferred.resolve(response.data);
                })["catch"](function (response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };
            return RedditController;
        }());
        //register controller to module
        angular.module("myreddit")
            .controller("redditController", ["$scope", "$q", "$http", "$document", RedditController]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
