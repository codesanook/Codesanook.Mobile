import _ = require("lodash");

enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE,
    PATCH
}

//Take name from this class, suffix with Base https://msdn.microsoft.com/en-us/library/system.web.mvc.controllerbase(v=vs.118).aspx
export default abstract class ServiceBase {

    constructor(protected $http: ng.IHttpService) {
    }

    private async makeHttpRequest<TResult>(method: HttpMethod, url: string, requestBody: any = {}): Promise<ng.IHttpResponse<TResult>> {
        // https://www.typescriptlang.org/docs/handbook/enums.html
        const methodStringValue = HttpMethod[method];
        //prevent CORS
        //https://stackoverflow.com/a/11443066/1872200
        const request = {
            method: methodStringValue,
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            data: $.param(requestBody)
        };

        //
        return await this.$http<TResult>(request);
    }

    protected getApi<TResult>(url: string): Promise<ng.IHttpResponse<TResult>> {
        return this.makeHttpRequest(HttpMethod.GET, url);
    }

    protected putApi<TResult>(url: string, requestBody: any): Promise<ng.IHttpResponse<TResult>> {
        return this.makeHttpRequest<TResult>(HttpMethod.PUT, url, requestBody);
    }

    protected postApi<TResult>(url: string, requestBody: any): Promise<ng.IHttpResponse<TResult>> {
        return this.makeHttpRequest<TResult>(HttpMethod.POST, url, requestBody);
    }

    protected deleteApi<TResult>(url: string, requestBody: any): Promise<ng.IHttpResponse<TResult>> {
        return this.makeHttpRequest<TResult>(HttpMethod.DELETE, url, requestBody);
    }

    public logError(url: string, error): void {
        console.log(`API URL ${url} error ${JSON.stringify(error, null, 2)}`);
    }

    public toLowerCaseArray(name: string): string[] {
        return name
            .split(/(?=[A-Z])/)//look ahead to find an upper case
            .map(word => word.toLowerCase());
    }

    public toCamelCaseName(name: string[]): string {
        name = _.map(name, (word, index) => {
            if (index == 0) {
                return word;
            }
            return this.capitalize(word)
        });
        return name.join('');
    }

    public capitalize(input: string): string {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }

    public createUrlWithQueryString(inputUrl: string, request: any) {
        const properties = Object.keys(request);
        const queryString = `?${_.map(properties, (prop) => `${prop}=${request[prop]}`).join('&')}`;
        return `${inputUrl}${queryString}`;
    }

    public formatOffset(utcOffset: number): string {
        if (utcOffset == 0) return "Z";
        let symbol = +  utcOffset > 0 ? "+" : "-";
        let integerPart = Math.floor(utcOffset);
        let fractionPart = utcOffset - integerPart;
        let formattedOffset =
            `${symbol}${this.padLeft(integerPart)}:${this.padLeft(fractionPart)}`;
        console.log(`formattedOffset ${formattedOffset}`);
        return formattedOffset;
    }

    public padLeft(num: number, size: number = 2): string {
        let s = num.toString();
        while (s.length < size) {
            s = "0" + s;//add leading 0 string
        }
        return s;
    }
}
