import * as moment from "moment";

export default class IndexController {
    constructor(
        private $scope: any,
        private $document: ng.IDocumentService
    ) {
        var utcNow = moment.utc();
        $scope.message = `Hello my wife at ${utcNow.toISOString()}`;
    }
}