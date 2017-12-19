module App.Controllers {

    class IndexController {

        constructor(
            private $scope: any,
            private $q: ng.IQService,
            private $http: ng.IHttpService,
            private $document: ng.IDocumentService
        ) {
            var utcNow = moment.utc();
            $scope.message = `Hello world at ${utcNow.toISOString()}`;
        }
    }

    //register controller to a module
    angular.module("starter")
        .controller("indexController", 
        [
            "$scope", 
            "$q", 
            "$http", 
            "$document", 
            IndexController
        ]);
}