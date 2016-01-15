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

    this.state = {tapped: false}
  }

  shouldComponentUpdate(nextProps) {

      return  this.props.contact_name !== nextProps.contact_name ||
              this.props.notes !== nextProps.notes ||
              this.props.friendly_name !== nextProps.friendly_name
  }

  _tapHandler() {

    this.setState({tapped: true})
    setTimeout(() => {
      this.setState({tapped: false});
    }.bind(this), 500)

  }

  render() {

    let current_contact_json = JSON.stringify({name: this.props.contact_name, friendly_name: this.props.friendly_name, notes: this.props.notes });
    let tapped = "no_tapped";

    if (this.state.tapped === true) {
      tapped = "tapped";
    }

    return (

      <Link to="contact-overview" query={{contact: current_contact_json}}>
      <tr onTouchTap={this._tapHandler.bind(this)} className={tapped}>
        <td><AccountImage className="contact-image" account={this.props.contact_name} size={{height: 35, width: 35}}/></td>
        <td> <span className="b bold">{this.props.friendly_name}</span>{"Account: " + this.props.contact_name}<br/>{"Notes: " + this.props.notes}</td>
        <td>
          <span className="edit-contact"></span>
          <span className="delete-contact"></span>
        </td>
      </tr>
      </Link>
    );
  }
}

export default ContactItem;
