import React from "react";
import {PropTypes, Component} from "react";
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import cookies from "cookies-js";
import SettingsActions from "actions/SettingsActions";
import IntlStore from "stores/IntlStore";
import IntlActions from "actions/IntlActions";
import If from './If';
const RaisedButton = require('material-ui/lib/raised-button');
const RadioButton = require('material-ui/lib/radio-button');
const RadioButtonGroup = require('material-ui/lib/radio-button-group');
const Dialog = require('material-ui/lib/dialog');

class LanguageSwitcher extends React.Component{

  constructor(props) {
    super(props);
  }

  /* _handleSwitchLanguageWindow() {
      //this.refs.switchLanguageWindow.show();
      //this.
  }*/



  _handleChangeLanguage(e, selected) {



    //Translate.textContentComponents;

    //let allLocales = counterpart.getAvailableLocales();
    let myLocale = counterpart.getLocale();
    if (selected !== myLocale) {
        IntlActions.switchLocale(selected);
        cookies.set("graphene_locale", selected, { expires: Infinity });
        SettingsActions.changeSetting({setting: "locale", value: selected });
    }
  }

  render() {
    var langs = IntlStore.getLanguages();
    var rows = [];
    for (var key in langs)
    {
      if (langs.hasOwnProperty(key))
        rows.push(<RadioButton
          value={key}
          label={langs[key]}
          bodyStyle={{marginBottom:16}} />);
    }

    return (
      <div>
      <Dialog title="Preferred Language"
              actions={this.props.actions}
              ref="dialog">
          <RadioButtonGroup name="shipSpeed"  defaultSelected="en"
            onChange={this._handleChangeLanguage.bind(this)}>
            {rows}
          </RadioButtonGroup>
      </Dialog>
      </div>
    );
  }
}


export default LanguageSwitcher;