import * as  _ from 'lodash';

export default class ServiceInterceptor {
    //factory function
    public static factory($q: ng.IQService, $injector: angular.auto.IInjectorService): ServiceInterceptor {
        return new ServiceInterceptor($q, $injector);
    }

    constructor(
        private $q: ng.IQService,
        private $injector: angular.auto.IInjectorService
    ) {
    }

    // need to create an instance method using arrow function
    public request = async (requestConfig: ng.IRequestConfig): Promise<ng.IRequestConfig> => {
        this.setHeader(requestConfig);
        return Promise.resolve(requestConfig);
    };

    public responseError = async (rejection: any): Promise<any> => {
        return Promise.reject(rejection);
    }

    private async alert(): Promise<void> {
        const ionicPopup = this.$injector.get<ionic.popup.IonicPopupService>('$ionicPopup');
        await ionicPopup.alert({
            title: 'title',
            template: 'body'
        });
    }

    private setHeader(config: ng.IRequestConfig): void {
        config.headers.Accept = 'application/json';
    }
}
