import React from "react";
import Translate from "react-translate-component";
import Transactions from "./Transactions";
import Balances from "./Balances";
import { Router, Route, Link, IndexRoute } from 'react-router';
import counterpart from "counterpart";
import IntlActions from "actions/IntlActions";
import SettingsActions from "actions/SettingsActions";
import IntlStore from "stores/IntlStore";

const Checkbox = require('material-ui/lib/checkbox');
const Dialog = require('material-ui/lib/dialog');
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from'material-ui/lib/styles/colors';
import LanguageSwitcher from "./LanguageSwitcher";
const RaisedButton = require('material-ui/lib/raised-button');
const RadioButton = require('material-ui/lib/radio-button');
const RadioButtonGroup = require('material-ui/lib/radio-button-group');
import _ from "lodash";

// Flux SettingsScreen view
class SettingsScreen extends React.Component {

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state ={ muiTheme: ThemeManager.getMuiTheme(LightRawTheme) }
  }

  getChildContext() {
      muiTheme: this.state.muiTheme
  }

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500,
    });

    this.setState({muiTheme: newMuiTheme});
  }

  _handleSwitchLocation() {
    this.refs.switchLocationWindow.show();
  }

  _handleSwitchLanguageWindow()
  {
    this.refs.switchLanguageWindow.refs.dialog.show();
  }

  // Render SettingsScreen view
  render() {

    let okActions = [
      { text: 'Ok' },
    ];

    return (
      <section>
        <main className="no-nav">

          <section className="setting-item">
          <RaisedButton label="Taxable Country"
            onTouchTap={this._handleSwitchLocation.bind(this)} />
          </section>

           <Dialog
            title="Taxable Country"
            actions={okActions}
            ref="switchLocationWindow">
              <RadioButtonGroup name="shipSpeed" defaultSelected="eur">
                  <RadioButton
                    value="eur"
                    label="Germany (EUR - Euro) "
                    contentStyle={{marginBottom:16}} />
                  <RadioButton
                    value="usd"
                    label="United States of America (USD - US Dollar) "
                    style={{marginBottom:16}}/>
              </RadioButtonGroup>
          </Dialog>

          <section className="setting-item">
          <LanguageSwitcher actions={okActions} ref="switchLanguageWindow"/>
          </section>

          <section className="setting-item">
          <RaisedButton label="Preferred Language"
            onTouchTap={this._handleSwitchLanguageWindow.bind(this)} />
          </section>

        <section className="setting-item">
          <Checkbox
                name="isCheckUpdatesStartup"
                value="checkboxValue1"
                label="Check for updates on startup "
                defaultChecked={true}/>
                  <Checkbox
                    name="isAutoInstallMajor"
                    value="checkboxValue2"
                    label="Automatically install major version releases"/>
          </section>
          <section className="setting-item">
              <Checkbox
                name="_isRequirePinToSend"
                value="checkboxValue2"
                label="Require PIN to Send funds "
                defaultChecked={true}/>
          </section>
          <section className="setting-item">
              <Checkbox
                name="isAutoCloseAfter3Min"
                value="checkboxValue3"
                label="Automatically close BitShares Wallet after 3 minutes of inactivity"
                defaultChecked={true}/>
           </section>
           <section className="setting-item">
               <Checkbox
                name="isAlwaysDonate"
                value="checkboxValue3"
                label=" Always donate 2 BTS to the Support Developers at BitShares Munich (bitshares-munich) "
                defaultChecked={true}/>
          </section>
          <section className="setting-item">
          </section>
        </main>
      </section>
    );
  }

}

export default  SettingsScreen;