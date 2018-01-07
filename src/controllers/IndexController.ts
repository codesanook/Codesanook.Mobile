import * as moment from "moment";
import DatetimeService from "../services/DatetimeService";
declare let rgb:any;

export default class IndexController {
    constructor(
        private $scope: any,
        private $document: ng.IDocumentService,
        private datetimeService: DatetimeService 

    ) {
        var utcNow = datetimeService.getUtcNow();
        $scope.message = `Hello my new world at ${utcNow.toISOString()}`;
        $document.find("#message").css("background-color", "#F00");
    }
}