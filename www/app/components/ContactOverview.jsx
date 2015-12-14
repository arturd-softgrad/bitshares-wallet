import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import AccountImage from "./AccountImage";
import AccountActions from "actions/AccountActions";
const TextField = require('material-ui/lib/text-field');
import { Router, Route, Link, IndexRoute } from 'react-router';
const RaisedButton = require('material-ui/lib/raised-button');
const Dialog = require('material-ui/lib/dialog');
import { createHashHistory, useBasename } from 'history';
const history = useBasename(createHashHistory)({});

// ContactOverview view
class ContactOverview extends React.Component {

  constructor(props) {
    super(props);

    let { query } = this.props.location;

    this.state = {current_contact : JSON.parse(query.contact)};

  }

  _handleContactDelete() {
      AccountActions.unlinkContact(this.state.current_contact);
      history.pushState(null, 'contacts');
  }

  _handleDeleteContactCancel() {
    this.refs.delete_confirm.dismiss();
  }

  _handleConfirmDeleteContact() {
    this.refs.delete_confirm.show();
  }

  // Render ContactsScreen view
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

    return (
      <section className="content">
        <div className="header__links"><button className="contact-delet-btn"><i onTouchTap={this._handleConfirmDeleteContact.bind(this)} className="contact_delet"></i></button></div>
        <Dialog title="Are you sure ?"
              actions={delete_contact_actions}
              modal={true}
              style={{width: '90%'}}
              ref="delete_confirm" autoScrollBodyContent={true}>
        </Dialog>
        <AccountImage className="profile-icon" account={this.state.current_contact.name} size={{height: 45, width: 45}}/>
        <div>
        <TextField
          floatingLabelText={counterpart.translate("wallet.home.account")}
          value={this.state.current_contact.name}
          disabled={true}
          underlineStyle={{borderColor: "#009FE3"}} />
        </div>
        <div>
        <TextField
          floatingLabelText="Friendly name"
          value={this.state.current_contact.friendly_name}
          disabled={true}
          underlineStyle={{borderColor: "#009FE3"}} />
        </div>
        <div>
        <TextField
          floatingLabelText="Notes"
          value={this.state.current_contact.notes}
          disabled={true}
          multiLine={true}
          underlineStyle={{borderColor: "#009FE3"}} />
        </div>
        <section className="code-buttons">
            <div>
              <Link to="receive" className="btn btn-receive" query={{contact: JSON.stringify(this.state.current_contact)}}>receive</Link>
              <Link to="send"  query={{contact: JSON.stringify(this.state.current_contact)}} className="btn btn-send">send</Link>
            </div>
        </section>
      </section>
    );
  }
};

export default ContactOverview;