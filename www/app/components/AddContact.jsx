import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import AccountSelector from './AccountSelector';
import AccountActions from "actions/AccountActions";
const RaisedButton = require('material-ui/lib/raised-button');
const Dialog = require('material-ui/lib/dialog');
const TextField = require('material-ui/lib/text-field');

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

  onLinkAccount(e) {
    // TODO add validate account name
      AccountActions.linkAccount(this.props.account.get("name"));

    // TODO Add contact in table
  }

  // Render ContactsScreen view
  render() {

    return (
        <Dialog title="Add contact"
              actions={this.props.actions} autoScrollBodyContent={true}
              ref="dialog" onDismiss={this.props.fnDismiss}>
              <AccountSelector label="transfer.to"
                                         accountName={this.state.contact_name}
                                         onChange={this.toChanged.bind(this)}
                                         account={this.state.contact_name} />
              <TextField
                  floatingLabelText="Friendly name"
                  type="text"
                  onChange={this.toChangedFriendlyName.bind(this)}
                  value={this.state.friendly_name}>
               </TextField>
               <TextField
                  floatingLabelText="Notes"
                  type="text"
                  onChange={this.toChangedNotes.bind(this)}
                  value={this.state.notes}>
                  multiLine={true} 
               </TextField>
        </Dialog>

    );
  }
};

export default AddContact;