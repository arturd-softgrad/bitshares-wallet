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

     this.state = {contact_name: "", friendly_name: "", notes:"", email:""}
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

   toChangedEmail(e) {
      this.setState({email: e.target.value});
  }

  _handlerOnLinkContact(e) {
    // TODO add validate account name
      AccountActions.linkContact({name: this.state.contact_name, friendly_name: this.state.friendly_name, notes: this.state.notes, email: this.state.email});
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
               accountName={this.state.contact_name}  email={this.state.email}
               onChange={this.toChanged.bind(this)}
               account={this.state.contact_name} />
          <TextField
              floatingLabelText={counterpart.translate("wallet.contactFriendlyName")+":"}
              type="text"
              onChange={this.toChangedFriendlyName.bind(this)}
              value={this.state.friendly_name}/>
           <TextField
              floatingLabelText={counterpart.translate("wallet.contact_email_hint")+":"}
              type="text"
              onChange={this.toChangedEmail.bind(this)}
              value={this.state.email}/>
           <TextField
              floatingLabelText={counterpart.translate("wallet.contactNotes")+":"}
              type="text"
              onChange={this.toChangedNotes.bind(this)}
              value={this.state.notes}
              multiLine={true}/>
          <div>
            <RaisedButton
            label={counterpart.translate("wallet.home.cancel")}
            backgroundColor = "#FF4081" primary = {true}
            onTouchTap={this._handleOnLinkCancel}  />&nbsp;
           <RaisedButton
            label={counterpart.translate("wallet.add")}
            backgroundColor = "#008000" secondary={true}
            onTouchTap={this._handlerOnLinkContact.bind(this)} />
          </div>
         </section>
    );
  }
};

export default AddContact;