import * as moment from "moment";
import DatetimeService from "../services/DatetimeService";

export default class IndexController {

    allTimezoneNames : string[];
    dateOfBirth:moment.Moment;
    offsetValue: Number;

    constructor(
        private $scope: any,
        private $document: ng.IDocumentService,
        private datetimeService: DatetimeService
    ) {
        var utcNow = datetimeService.getUtcNow();
        $scope.message = `Hello my new world at ${utcNow.toISOString()}`;
        $document.find("#message").css("background-color", "#F00");

        this.allTimezoneNames =this.datetimeService.getAllTimezoneNames();

        this.dateOfBirth = this.datetimeService.getDateOfBirth();
        this.offsetValue = this.datetimeService.getTimezoneOffset();
    }
}