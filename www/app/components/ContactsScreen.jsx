import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import ContactsTable from "./ContactsTable";
import AddContact from "./AddContact";
import ContactOverview from "./ContactOverview";
import { Router, Route, Link, IndexRoute } from 'react-router';

const RaisedButton = require('material-ui/lib/raised-button');
const Dialog = require('material-ui/lib/dialog');


// Flux ContactsScreen view
class ContactsScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  _handleContactOverview() {
    this.refs.contactOverviewWindow.refs.dialog.show();
  }

  _handlerAddContact() {
    this.refs.addContactWindow.refs.dialog.show();
  }

  // Render ContactsScreen view
  render() {

    let contactActions = [
     <RaisedButton
        label={counterpart.translate("wallet.home.send")}
        primary={true}
        onTouchTap={this._handleCustomDialogSubmit} />,
      <RaisedButton
        label={counterpart.translate("wallet.home.receive")}
        primary={true}
        onTouchTap={this._handleCustomDialogSubmit} />,
        <RaisedButton
        label="Delete"
        secondary={true}
        onTouchTap={this._handleCustomDialogCancel} />
    ];

    let addContactActions  = [
      <RaisedButton
        label="Add"
        primary={true}
        onTouchTap={this._handleCustomDialogSubmit} />,
        <RaisedButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleCustomDialogCancel} />
    ];


    return (
      <section>
          <ContactOverview actions={contactActions} ref="contactOverviewWindow"/>
          <AddContact actions={addContactActions} ref="addContactWindow" />
        <div className="header__links"><i onTouchTap={this._handlerAddContact.bind(this)} className="add-user"></i><i href href onTouchTap={this._handlerAddContact.bind(this)} className="invite"></i></div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Balances</Link></li>
            <li className="active"><Link to="contacts">contacts</Link></li>
            <li><Link to="#">finder</Link></li>
            <li><Link to="#">exchange</Link></li>
          </ul>
        </nav>
        <main>
          <ContactsTable />
        </main>
      </section>
    );
  }
};

export default ContactsScreen;