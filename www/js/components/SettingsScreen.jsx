import React from "react";
import Translate from "react-translate-component";
import Transactions from "./Transactions";
import Balances from "./Balances";
import { Router, Route, Link, IndexRoute } from 'react-router';

import Checkbox from 'material-ui/lib/checkbox';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from'material-ui/lib/styles/colors';

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

  // Render SettingsScreen view
  render() { 
    return (
      <section>
        <main className="no-nav">
          <Checkbox
                name="isCheckUpdatesStartup"
                value="checkboxValue1"
                label="Check for updates on startup "
                defaultChecked={true}/>
                  <Checkbox
                    name="isAutoInstallMajor"
                    value="checkboxValue2"
                    label="Automatically install major version releases"/> 
              <Checkbox
                name="_isRequirePinToSend"
                value="checkboxValue2"
                label="Require PIN to Send funds "
                defaultChecked={true}/>
              <Checkbox
                name="isAutoCloseAfter3Min"
                value="checkboxValue3"
                label="Automatically close BitShares Wallet after 3 minutes of inactivity"
                defaultChecked={true}/>
               <Checkbox
                name="isAlwaysDonate"
                value="checkboxValue3"
                label=" Always donate 2 BTS to the Support Developers at BitShares Munich (bitshares-munich) "
                defaultChecked={true}/>
        </main>
      </section>
    );
  }

}

export default  SettingsScreen;