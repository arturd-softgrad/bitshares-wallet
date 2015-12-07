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

  render() {

    let contacts_arr = this.props.contacts.toArray();
    let contacts = [];

    if (contacts_arr.length > 0) {

      for (var i=contacts_arr.length-1; i > -1; i--) {
        if (this.IsJsonString(contacts_arr[i])) {
          contacts.push(JSON.parse(contacts_arr[i]));
        }
      }
    }

    return (
      <table className="contacts-table">
        <theader>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Account</th>
          </tr>
        </theader>
        <tbody>
           {contacts.map((contact_item, i) =>
              <ContactItem contact_name={contact_item.name} friendly_name={contact_item.friendly_name} notes={contact_item.notes} key={i} />
            )}
        </tbody>
      </table>
    );
  }
}

export default ContactsTable;