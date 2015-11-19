var alt = require("../alt-instance");
var IntlActions = require("../actions/IntlActions");
var BaseStore = require("./BaseStore");
var counterpart = require("counterpart-instance");
var locale_en = require("assets/locales/locale-en");
counterpart.registerTranslations("en", locale_en);

class IntlStore extends BaseStore {
    constructor() {
        super();
        this.currentLocale = "en";
        this.locales = ["en", "ru", "fr"];
        this.localesObject = {en: locale_en};
        this.languages = locale_en.languages;

        this.bindListeners({
            onSwitchLocale: IntlActions.switchLocale,
            onGetLocale: IntlActions.getLocale,
            onGetLanguages: IntlActions.getLanguages
        });

        this._export("getCurrentLocale", "hasLocale", "getLanguages");
    }

    hasLocale(locale) {
        console.log("hasLocale:", this.locales.indexOf(locale));
        return this.locales.indexOf(locale) !== -1;
    }

    getCurrentLocale() {
        return this.currentLocale;
    }
    onGetLanguages() {
        return this.languages;
    }
    getLanguages() {
        return this.languages;
    }

    /*
    return new Promise( resolve => {
            this.dispatch({wallet_name, create_wallet_password, brnkey, resolve})
        })
    */

    onSwitchLocale(locale) {
        var langs = null;
        switch (locale) {
            case "en":
                counterpart.registerTranslations("en", this.localesObject.en);
                break;

            default:
                let newLocale = this.localesObject[locale];
                if (!newLocale) {
                    newLocale = require("assets/locales/locale-" + locale);
                    this.localesObject[locale] = newLocale;
                }
                this.languages = newLocale.languages;
                counterpart.registerTranslations(locale, newLocale);
                break;
        }
        counterpart.setLocale(locale);
        this.currentLocale = locale;
    }

    onGetLocale(locale) {
        if (this.locales.indexOf(locale) === -1) {
            this.locales.push(locale);
        }
    }
}

module.exports = alt.createStore(IntlStore, "IntlStore");
