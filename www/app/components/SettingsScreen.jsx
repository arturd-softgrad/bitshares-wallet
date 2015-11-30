import React from "react";
import Translate from "react-translate-component";
import Transactions from "./Transactions";
import Balances from "./Balances";
import { Router, Route, Link, IndexRoute } from 'react-router';
import counterpart from "counterpart";
import IntlActions from "actions/IntlActions";
import IntlStore from "stores/IntlStore";
import SettingsStore from "stores/SettingsStore";
import SettingsActions from "actions/SettingsActions";

const Checkbox = require('material-ui/lib/checkbox');
const Dialog = require('material-ui/lib/dialog');
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from'material-ui/lib/styles/colors';
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import TimezoneSwitcher from "./TimezoneSwitcher";
const RaisedButton = require('material-ui/lib/raised-button');
const RadioButton = require('material-ui/lib/radio-button');
const RadioButtonGroup = require('material-ui/lib/radio-button-group');
import _ from "lodash";

import { createHashHistory, useBasename } from 'history';
const history = useBasename(createHashHistory)({});



// Flux SettingsScreen view
class SettingsScreen extends React.Component {


  childContextTypes: {
    muiTheme: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state ={ muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      advancedSettings: {
          checkUpdatesStartup: false,
          autoInstallMajorVer: false,
          requirePinToSend: false,
          autoCloseWalletAfterInactivity: false,
          alwaysDonateDevsMunich: false
      }
     }
  }

  getChildContext() {
      muiTheme: this.state.muiTheme
  }

  shouldComponentUpdate(nextProps, nextState) {
        return true;
  }
  _updateComponent(){
      //console.log("$$$settings screen - _updateComponent() triggered");
      this.setState({rerender: true});
      //this.forceUpdate();
      console.log('$$$formattedNow', IntlStore.formatNow(null));
      console.log('$$$formatted currency:-4624.6', IntlStore.formatCurrency(-4624.6));
      console.log('$$$formatted currency:14624.92', IntlStore.formatCurrency(14624.92));
      console.log('$$$formatted currency:24500', IntlStore.formatCurrency(24500));
      console.log('$$$formatted currency:3433.02', IntlStore.formatCurrency(3433.02));
      console.log('$$$formatted currency:5555.004', IntlStore.formatCurrency(5555.004));

  }

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500,
    });
    var advancedSettings = SettingsStore.getSetting("advancedSettings");
    if (advancedSettings == null)
      this.setState({muiTheme: newMuiTheme})
    else
      this.setState({muiTheme: newMuiTheme, advancedSettings: advancedSettings});

  }
  _handleAdvancedSettingsUpdate()
  {
      //console.log("$$$settings screen - _handleAdvancedSettingsUpdate() triggered");

      var advancedSettings =  {
          checkUpdatesStartup: this.refs.chkCheckUpdatesStartup.isChecked(),
          autoInstallMajorVer: this.refs.chkAutoInstallMajorVer.isChecked(),
          requirePinToSend: this.refs.chkRequirePinToSend.isChecked(),
          autoCloseWalletAfterInactivity: this.refs.chkAutoCloseWalletAfterInactivity.isChecked(),
          alwaysDonateDevsMunich: this.refs.chkAlwaysDonateDevsMunich.isChecked()
      }
      SettingsStore.changeSetting({setting: "advancedSettings", value: advancedSettings });
      this.setState({advancedSettings: advancedSettings});
      //console.log("$$$settings screen - advanced settings updated", advancedSettings);

  }


  _handleSwitchLocation() {
    this.refs.switchCurrencyWindow.refs.dialog.show();
  }

  _handleSwitchLanguageWindow()
  {
    this.refs.switchLanguageWindow.refs.dialog.show();
  }

  _handleSwitchTimezone()
  {
    this.refs.switchTimezoneWindow.refs.dialog.show();
  }

  _redirectToBackup()
  {
    //Router.navigate('backup');
    //this.transitionTo('backup');
    history.pushState(null, 'backup');
  }
  _redirectToChangePin()
  {
    history.pushState(null, 'changepin');
  }




  // Render SettingsScreen view
  render() {

    let okActions = [
      { text: 'Ok' },
    ];
    let translate = IntlStore.translate;
    let settings = this.state.advancedSettings;

    return (
      <section>
        <main className="no-nav" ref="settingsScreenRef">

          <section className="setting-item">
            <CurrencySwitcher actions={okActions} ref="switchCurrencyWindow" fnDismiss={this._updateComponent.bind(this)}/>
          </section>

          <section className="setting-item">
          <RaisedButton label={translate("settings.taxableCountry")}
            onTouchTap={this._handleSwitchLocation.bind(this)}   />
          </section>


          <section className="setting-item">
            <LanguageSwitcher actions={okActions} ref="switchLanguageWindow" fnDismiss={this._updateComponent.bind(this)} />
          </section>

          <section className="setting-item">
          <RaisedButton label={translate("settings.preferredLanguage")}
            onTouchTap={this._handleSwitchLanguageWindow.bind(this)}   />
          </section>


          <section className="setting-item">
            <TimezoneSwitcher actions={okActions} ref="switchTimezoneWindow" fnDismiss={this._updateComponent.bind(this)}/>
          </section>

          <section className="setting-item">
          <RaisedButton label={translate("settings.displayDtAs")}
            onTouchTap={this._handleSwitchTimezone.bind(this)}  />
          </section>

        <section className="setting-item">
          <Checkbox ref="chkCheckUpdatesStartup"
                value="checkboxValue1"
                label={translate("settings.checkUpdatesStartup")}
                defaultChecked={settings.checkUpdatesStartup} onCheck={this._handleAdvancedSettingsUpdate.bind(this)} />
          <Checkbox ref="chkAutoInstallMajorVer"
            name="chkAutoInstallMajorVer"
            value="checkboxValue2"
            label={translate("settings.autoInstallMajorVer")}
            defaultChecked={settings.autoInstallMajorVer} onCheck={this._handleAdvancedSettingsUpdate.bind(this)} />
          </section>
          <section className="setting-item">
              <Checkbox  ref="chkRequirePinToSend"
                name="chkRequirePinToSend"
                value="checkboxValue2"
                label={translate("settings.requirePinToSend")}
                defaultChecked={settings.requirePinToSend} onCheck={this._handleAdvancedSettingsUpdate.bind(this)} />
          </section>
          <section className="setting-item">
              <Checkbox  ref="chkAutoCloseWalletAfterInactivity"
                name="chkAutoCloseWalletAfterInactivity"
                value="checkboxValue3"
                label={translate("settings.autoCloseWalletAfterInactivity")}
                defaultChecked={settings.autoCloseWalletAfterInactivity} onCheck={this._handleAdvancedSettingsUpdate.bind(this)} />
           </section>
           <section className="setting-item">
               <Checkbox  ref="chkAlwaysDonateDevsMunich"
                name="chkAlwaysDonateDevsMunich"
                value="checkboxValue3"
                label={translate("settings.alwaysDonateDevsMunich")}
                defaultChecked={settings.alwaysDonateDevsMunich}  onCheck={this._handleAdvancedSettingsUpdate.bind(this)} />
          </section>
         <section className="setting-item">
            <div><Translate content="wallet.settings.q_sharePublicAddress" /></div>
            <div><Translate content="wallet.settings.a_sharePublicAddress" /></div>
          </section>
          <section className="setting-item">
            <div><Translate content="wallet.settings.q_accessPrivateKeys" /></div>
            <div><Translate content="wallet.settings.a_accessPrivateKeys" /></div>
          </section>
          <section className="setting-item">
            <div><Translate content="wallet.settings.q_switchAccount" /></div>
            <div><Translate content="wallet.settings.a_switchAccount" /></div>
          </section>
          <section className="setting-item">
            <div><Translate content="wallet.settings.q_searchTransaction" /></div>
            <div><Translate content="wallet.settings.a_searchTransaction" /></div>
          </section>
          <section className="setting-item">
            <RaisedButton label={translate("settings.backup")}
              onTouchTap={this._redirectToBackup.bind(this)}    />
          </section>
          <section className="setting-item">
            <RaisedButton label={translate("settings.editPin")}
              onTouchTap={this._redirectToChangePin.bind(this)}    />
          </section>
        </main>
      </section>
    );
  }

}

export default  SettingsScreen;