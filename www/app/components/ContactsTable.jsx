import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import ContactItem from "./ContactItem";
import AccountStore from "stores/AccountStore";
import alt from "alt";
const Dialog = require('material-ui/lib/dialog');
import If from './If';
import AccountImage from "./AccountImage";
const RaisedButton = require('material-ui/lib/raised-button');


class ContactsTable extends React.Component {

   constructor () {
    super();
    this.state = {
      current_contact: {}
    };
  }

  shouldComponentUpdate(nextProps, nextState) {

      return this.props.contacts !== nextProps.contacts ||
             this.state.current_contact != nextState.current_contact
  }

  IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  _handleContactDelete() {
      AccountActions.unlinkContact(this.state.current_contact);
      history.pushState(null, 'contacts');
  }

  _handleDeleteContactCancel() {
    //this.refs.delete_confirm.dismiss();
    this.setState({deleting: false});
  }

  _handleConfirmDeleteContact() {
    this.refs.delete_confirm.show();
    this.setState({deleting: true});
  }


render() {

let delete_contact_actions  = [
      <RaisedButton
        label="Confirm"
        primary={true}
        onTouchTap={this._handleContactDelete.bind(this)} />,
      <RaisedButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleDeleteContactCancel.bind(this)} />
    ];


    let contacts_arr = this.props.contacts.toArray();
    let contacts = [];

    if (contacts_arr.length > 0) {

      for (var i=contacts_arr.length-1; i > -1; i--) {
        if (this.IsJsonString(contacts_arr[i])) {
          contacts.push(JSON.parse(contacts_arr[i]));
        }
      }
     contacts.sort(function(a, b) {
                return a.hasOwnProperty("timestamp") ?
                    b.timestamp - a.timestamp:
                    a.name < b.name ? -1: a.name> b.name? 1: 0
            });
    }


    let dlg = <Dialog title="Are you sure ?"
              open={this.state.deleting}
              actions={delete_contact_actions}
              modal={true}
              style={{width: '90%'}}
              ref="delete_confirm" autoScrollBodyContent={true}>
        </Dialog>;

    return (
      <table className="contacts-table">
        <theader>
          <tr>
            <th></th>
            <th>{counterpart.translate("wallet.home.name")}</th>
            <th></th>
          </tr>
        </theader>
        <tbody>
           {contacts.map((contact_item, i) =>
              <ContactItem ref="contact_item" contact_name={contact_item.name} friendly_name={contact_item.friendly_name} notes={contact_item.notes} key={i} onDelete={this._handleConfirmDeleteContact.bind(this)}  />
            )}
        </tbody>
      </table>
    );
  }
}

export default ContactsTable;
