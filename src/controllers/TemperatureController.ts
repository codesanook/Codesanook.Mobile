import * as moment from 'moment';
import { IPromise } from 'angular';

class Location {
    lat: number;
    lon: number;
}
export default class TemperatureController {

    location = new Location();

    constructor(
        private $scope: ng.IScope,
        private $cordovaGeolocation: ngCordova.IGeolocationService
    ) {
        //view loaded
        this.$scope.$on("$ionicView.enter", (event, data) => {
            let currentStateName = data.stateName;
            console.log(`currentStateName ${currentStateName}`);
            this.updateCurrentLocation();
        });
    }

    public async updateCurrentLocation(): Promise<void> {
        const options: ngCordova.IGeolocationOptions = { timeout: 10000, enableHighAccuracy: false, maximumAge: 0 };
        try {
            const position = await this.$cordovaGeolocation.getCurrentPosition(options)
            this.location.lat = position.coords.latitude;
            this.location.lon = position.coords.longitude;
        } catch (ex) {
            console.error(JSON.stringify(ex, null, 2));
        };
    }
}
