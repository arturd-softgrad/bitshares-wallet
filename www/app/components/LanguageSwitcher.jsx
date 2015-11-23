import React from "react";
import {PropTypes, Component} from "react";
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import cookies from "cookies-js";
//import SettingsStore from "stores/SettingsStore";
//import SettingsActions from "actions/SettingsActions";
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
    this.state = {currentLocale: "en"};
  }


  _handleChangeLanguage(e, selected) {
    //let myLocale = counterpart.getLocale();
    let locale = IntlStore.getCurrentLocale();
    if (selected !== locale) {
        IntlActions.switchLocale(selected);
        //cookies.set("graphene_locale", selected, { expires: Infinity });
        //SettingsActions.changeSetting({setting: "locale", value: selected });
    }
    this.setState({ currentLocale: selected});
  }

  /*_handleDismiss(e, selected) {
    console.log('$$$language switcher -- handle dismiss triggered');
  }*/

   componentDidMount() {
        let locale = IntlStore.getCurrentLocale();
        this.setState({ currentLocale: locale});
    }

  render() {
    var langs = IntlStore.getLanguages();
    var rows = [];
    //let myLocale = counterpart.getLocale();
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
              ref="dialog" autoScrollBodyContent={true}  onDismiss={this.props.fnDismiss}>
          <RadioButtonGroup name="shipSpeed"  defaultSelected={this.state.currentLocale}
            onChange={this._handleChangeLanguage.bind(this)} >
            {rows}
          </RadioButtonGroup>
      </Dialog>
      </div>
    );
  }
}


export default LanguageSwitcher;