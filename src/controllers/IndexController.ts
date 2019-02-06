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
    private $http: ng.IHttpService,
    private $ionicPopup: ionic.popup.IonicPopupService
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
    await this.showModal();
    console.log('done');
  }

  async showModal(): Promise<void> {
    return this.$ionicPopup.alert({ title: 'ok', template: 'It is okay' });
  }

   sleep(ms: number):Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
