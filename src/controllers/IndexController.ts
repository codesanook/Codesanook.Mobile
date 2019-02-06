import * as moment from "moment";
import DateTimeService from "../services/DateTimeService";

export default class IndexController {

  allTimezoneNames: string[];
  dateOfBirth: moment.Moment;
  offsetValue: Number;

  constructor(
    private $scope: any,
    private $document: ng.IDocumentService,
    private dateTimeService: DateTimeService,
    private $http: ng.IHttpService
  ) {
    let utcNow = dateTimeService.getUtcNow();
    $scope.message = `Hello my new world at ${utcNow.toISOString()}`;
    $document.find("#message").css("background-color", "#F00");
    this.allTimezoneNames = this.dateTimeService.getAllTimezoneNames();
    this.dateOfBirth = this.dateTimeService.getDateOfBirth();
    this.offsetValue = this.dateTimeService.getTimezoneOffset();
  }

  public async alert(): Promise<void> {
    const result = await this.$http.get('https://server.test-cors.org/server?id=3149187&enable=true&status=200&credentials=false');
    console.log(result.data);
    await this.sleep(1000);
    console.log('done');
    alert('ok');
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
