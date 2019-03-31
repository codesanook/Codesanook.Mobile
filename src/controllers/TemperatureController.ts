import WeatherService from '../services/WeatherService';

class Location {
    lat: number;
    lon: number;
}

export default class TemperatureController {
    //http://brandonlwhite.github.io/sevenSeg.js/
    location = new Location();
    temperature: number;

    constructor(
        private $scope: ng.IScope,
        private $cordovaGeolocation: ngCordova.IGeolocationService,
        private weatherService: WeatherService,
        private $document: ng.IDocumentService
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
            const weather = await this.weatherService.getCurrentWeather(this.location.lat, this.location.lon);
            this.temperature = Math.round(weather.main.temp * 10) / 10;

        } catch (ex) {
            console.error(JSON.stringify(ex, null, 2));
        };
    }
}
