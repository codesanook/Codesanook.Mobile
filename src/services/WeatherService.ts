import ServiceBase from "./ServiceBase";

interface MainSection {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

export class WeatherInfo {
    main: MainSection
}

export default class WeatherService extends ServiceBase {

    constructor(protected $http: ng.IHttpService) {
        super($http);
    }

    public async getCurrentWeather(latitude: number, longitude: number): Promise<WeatherInfo> {
        // Get a free key at http://openweathermap.org/. Replace the "Your_Key_Here" string with that key.
        //https://openweathermap.desk.com/customer/en/portal/articles/1996493-switching-between-temperature-units
        const openWeatherAppKey = "3e1597de723627fe95868b0767111c3f";
        const queryString = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherAppKey}&units=metric`;
        const response = await this.getApi<WeatherInfo>(queryString);
        return response.data;
    }
}

