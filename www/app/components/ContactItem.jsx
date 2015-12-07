import React from "react";
import {PropTypes, Component} from "react";

import Translate from "react-translate-component";
import counterpart from "counterpart";
import AccountImage from "./AccountImage";
import { Router, Route, Link, IndexRoute } from 'react-router';

// Flux Transactions view to display a single contact
class ContactItem extends React.Component {

  constructor(props) {
    super(props);
  } 

  shouldComponentUpdate(nextProps) {

      return  this.props.contact_name !== nextProps.contact_name || 
              this.props.notes !== nextProps.notes || 
              this.props.friendly_name !== nextProps.friendly_name
  }

  render() {

    let current_contact_json = JSON.stringify({name: this.props.contact_name, friendly_name: this.props.friendly_name, notes: this.props.notes });

    return (
      <Link to="contact-overview" query={{contact: current_contact_json}}>
      <tr onTouchTap={this.props.tapHandler}>
  		  <td><AccountImage className="profile-icon" account={this.props.contact_name} size={{height: 45, width: 45}}/></td>
  		  <td> <b>{this.props.friendly_name}</b>{this.props.notes}</td>
  		  <td>{this.props.contact_name}</td>
  		</tr>
      </Link>
    );
  }
}

export default ContactItem;