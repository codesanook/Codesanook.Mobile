module App.Controllers {

    declare function sprintf(format: string, ...val: any[]): string;

    class RedditController {
        scope: any;
        constructor(
            private $scope: any,
            private $q: ng.IQService,
            private $http: ng.IHttpService,
            private $document: ng.IDocumentService
        ) {
            this.$scope.stories = [];
            this.getData()
                .then((response: any): void => {
                    //console.log("response.data %s", JSON.stringify(response));
                    angular.forEach(response.data.children, (child) => {
                        this.$scope.stories.push(child.data);
                    });
                });

                this.$scope.openLink = (url:string):void => {
                     window.open(url,"_blank");
                }
        }

        private getData(): ng.IPromise<any> {

            var deferred = this.$q.defer<any>();
            var url = "js/reddis-api.json";
            var req: ng.IRequestConfig = {
                method: "GET",
                url: url,
                headers: {
                    'Content-Type': "application/json",
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                }
            };

            this.$http(req)
                .then((response: any): void => {
                    deferred.resolve(response.data);

                }).catch((response: any): void => {
                    deferred.reject(response);
                });

            return deferred.promise;
        }
    }



    //register controller to module
    angular.module("myreddit")
        .controller("redditController", ["$scope", "$q", "$http", "$document", RedditController]);
}