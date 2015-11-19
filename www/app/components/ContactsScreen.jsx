import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";

import ContactsTable from "./ContactsTable";

import { Router, Route, Link, IndexRoute } from 'react-router';


// Flux ContactsScreen view
class ContactsScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  // Render ContactsScreen view
  render() {
    return (
      <section>
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
          <section className="utility"><a href="#"><i className="settings"></i></a><a href="#"><i className="check"></i></a><span>block #43182</span></section>
        </main>
      </section>
    );
  }

};

export default ContactsScreen;