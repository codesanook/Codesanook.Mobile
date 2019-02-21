export default class SettingController {

    constructor(private $translate: ng.translate.ITranslateService) {

    }

    public changeLanguage(languageKey: string): void {
        this.$translate.use(languageKey)
    }
}
