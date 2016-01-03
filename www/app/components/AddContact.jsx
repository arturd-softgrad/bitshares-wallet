import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import AccountSelector from './AccountSelector';
import AccountActions from "actions/AccountActions";
const RaisedButton = require('material-ui/lib/raised-button');
const Dialog = require('material-ui/lib/dialog');
import TextField  from "./Utility/TextField";
import { createHashHistory, useBasename } from 'history';

const history = useBasename(createHashHistory)({});

// ContactOverview view
class AddContact extends React.Component {

  constructor(props) {
    super(props);

     this.state = {contact_name: "", friendly_name: "", notes:""}
  }

  toChanged(contact_name) {
      this.setState({contact_name: contact_name});
  }

  toChangedFriendlyName(e) {
      this.setState({friendly_name: e.target.value});
  }

  toChangedNotes(e) {
      this.setState({notes: e.target.value});
  }

  _handlerOnLinkContact(e) {
    // TODO add validate account name
      AccountActions.linkContact({name: this.state.contact_name, friendly_name: this.state.friendly_name, notes: this.state.notes});
      history.pushState(null, 'contacts');
  }

  _handleOnLinkCancel(e) {
      history.pushState(null, 'contacts');
  }

  // Render ContactsScreen view
  render() {

    return (
       <section className="content">
          <AccountSelector 
               label={counterpart.translate("wallet.home.account")}
               accountName={this.state.contact_name}
               onChange={this.toChanged.bind(this)}
               account={this.state.contact_name} />
          <TextField
              floatingLabelText="Friendly name:"
              type="text"
              onChange={this.toChangedFriendlyName.bind(this)}
              value={this.state.friendly_name}/>
           <TextField
              floatingLabelText="Notes:"
              type="text"
              onChange={this.toChangedNotes.bind(this)}
              value={this.state.notes}
              multiLine={true}/>
          <div>
           <RaisedButton
            label="Add"
            primary={true}
            onTouchTap={this._handlerOnLinkContact.bind(this)} />,
            <RaisedButton
            label="Cancel"
            secondary={true}
            onTouchTap={this._handleOnLinkCancel} />
          </div>
         </section>
    );
  }
};

export default AddContact;