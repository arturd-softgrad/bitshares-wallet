var alt = require("../alt-instance");

class IntlActions {

    switchLocale(locale) {
        this.dispatch(locale);
    }

    getLocale(locale) {
        this.dispatch(locale);
    }

    getLanguages() {
        this.dispatch();
    }

}

module.exports = alt.createActions(IntlActions);
