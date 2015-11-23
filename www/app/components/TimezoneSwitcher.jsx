import React from "react";
import {PropTypes, Component} from "react";
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

class TimezoneSwitcher extends React.Component{

  constructor(props) {
    super(props);
    this.state = {currentId: ''};
  }


  _handleChangeTimezone(e, selected) {

    //let myCurrency = IntlStore.getCurrencyById(this.state.currentId)
    if (selected !== this.state.currentId) {
        //IntlActions.switchCurrency(selected);
        //cookies.set("graphene_currency", selected, { expires: Infinity });
        //SettingsActions.changeSetting({setting: "timezone", value: selected });
        IntlActions.switchTimezone(selected);
    }
    this.setState({ currentId: selected});
  }

 componentDidMount() {
        let currentId = IntlStore.getCurrentTimeZone().abbr;
        this.setState({ currentId: currentId});
    }

  render() {
    var timezones = IntlStore.getTimezones();
    var rows = [];
    for (var i=0; i<timezones.length; i++) {
        var timezone = timezones[i];
        //  (  ) ACDT - Australian Central Daylight Savings Time (UTC+10:30)
        // {abbr:'ACT', name: 'Acre Time', offset: 'UTC−05'},
        var label = timezone.abbr + ' - ' + timezone.name + ' (' + timezone.offset+')';
        rows.push(<RadioButton
                    value={timezone.abbr}
                    label= {label}
                    contentStyle={{marginBottom:16}} />);
    }

    return (
      <div>
      <Dialog title="Display Dates and Times"
              actions={this.props.actions} autoScrollBodyContent={true}
              ref="dialog" onDismiss={this.props.fnDismiss}>
          <RadioButtonGroup name="rbgTimezones"  defaultSelected={this.state.currentId}
            onChange={this._handleChangeTimezone.bind(this)}>
            {rows}
          </RadioButtonGroup>
      </Dialog>
      </div>
    );
  }
}


export default TimezoneSwitcher;