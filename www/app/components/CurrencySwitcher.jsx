import React from "react";
import {PropTypes, Component} from "react";
//import counterpart from 'counterpart';
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

class CurrencySwitcher extends React.Component{

  constructor(props) {
    super(props);
    this.state = {currentId: ''};
  }


  _handleChangeCurrency(e, selected) {
       if (selected !== this.state.currentId) {
        IntlActions.switchCurrency(selected);
    }
    this.setState({ currentId: selected});
  }



 componentDidMount() {
        let currentId = IntlStore.getCurrency().id;
        this.setState({ currentId: currentId});
    }

  render() {
    var currencies = IntlStore.getCurrencies();
    var rows = [];
    for (var i=0; i<currencies.length; i++) {
        var currency = currencies[i];
        var label = currency.state + ' (' + (currency.iso || '(none)') + ' - '  + (currency.name ||'') +')';
        //  "Germany (EUR - Euro) "
        rows.push(<RadioButton
                    value={currency.id}
                    label= {label}
                    contentStyle={{marginBottom:16}} />);
    }

    return (
      <div>
      <Dialog title="Taxable country"
              actions={this.props.actions} autoScrollBodyContent={true}
              ref="dialog" onDismiss={this.props.fnDismiss}>
          <RadioButtonGroup name="rbgCurrencies"  defaultSelected={this.state.currentId}
            onChange={this._handleChangeCurrency.bind(this)}  >
            {rows}
          </RadioButtonGroup>
      </Dialog>
      </div>
    );
  }
}


export default CurrencySwitcher;