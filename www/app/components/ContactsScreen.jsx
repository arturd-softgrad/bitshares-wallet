import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import ContactsTable from "./ContactsTable";
import AddContact from "./AddContact";
import { Router, Route, Link, IndexRoute } from 'react-router';
import AltContainer from "alt/AltContainer";


// Flux ContactsScreen view
class ContactsScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  // Render ContactsScreen view
  render() {

    return (
      <section className="content-contacts">
        <div className="header__links contacts-nav"><Link to="add-contact"><i className="add-user"></i></Link><Link to="invite-friend"><i className="invite"></i></Link></div>
        <main>
           <AltContainer
                  stores={
                    {
                      account: () => { // props is the property of AltContainer
                        return {
                          store: AccountStore,
                          value: AccountStore.getState().currentAccount
                        };
                      },
                      contacts: () => {
                        return {
                          store: AccountStore,
                          value: AccountStore.getState().contacts
                        }
                      },
                      linkedAccounts: () => {
                        return {
                          store: AccountStore,
                          value: AccountStore.getState().linkedAccounts
                        }
                      }
                    }
                  }
                >
                  <ContactsTable />
            </AltContainer>
        </main>
      </section>
    );
  }
};

export default ContactsScreen;