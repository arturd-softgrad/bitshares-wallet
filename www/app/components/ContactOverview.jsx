import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import AccountImage from "./AccountImage";

import TextField  from "./Utility/TextField";
import { Router, Route, Link, IndexRoute } from 'react-router';
import { createHashHistory, useBasename } from 'history';
const history = useBasename(createHashHistory)({});

// ContactOverview view
class ContactOverview extends React.Component {

  constructor(props) {
    super(props);

    let { query } = this.props.location;

    this.state = {current_contact : JSON.parse(query.contact)};

  }



  // Render ContactsScreen view
  render() {

    return (
      <section className="content">
        <div style={{"height": "50px"}}>
        <AccountImage className="contact-image" account={this.state.current_contact.name} size={{height: 45, width: 45}}/>
        </div>
        <div>
        <TextField
          floatingLabelText={counterpart.translate("wallet.home.account")}
          value={this.state.current_contact.name}
          disabled={true} />
        </div>
        <div>
        <TextField
          floatingLabelText="Friendly name"
          value={this.state.current_contact.friendly_name}
          disabled={true} />
        </div>
        <div>
        <TextField
          floatingLabelText="Notes"
          value={this.state.current_contact.notes}
          disabled={true}
          multiLine={true} />
        </div>
        <section className="code-buttons">
            <div>
              <Link to="receive upper" className="btn btn-receive" query={{contact: JSON.stringify(this.state.current_contact)}}>receive</Link>
              <Link to="send upper"  query={{contact: JSON.stringify(this.state.current_contact)}} className="btn btn-send btn-send-alone">send</Link>
            </div>
        </section>
      </section>
    );
  }
};

export default ContactOverview;