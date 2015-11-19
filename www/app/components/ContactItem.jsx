import React from "react";
import {PropTypes, Component} from "react";

import Translate from "react-translate-component";
import counterpart from "counterpart";

// Flux Transactions view to display a single contact
class ContactItem extends React.Component {

  constructor(props) {
    super(props);
  } 

  render() {
    return (
    <tr>
		  <td><img src="app/assets/img/avatar1.png" alt=""/></td>
		  <td> <b>Chris</b>Notes: BitShares Munic Public Relations</td>
		  <td>chrisrocks</td>
		</tr>
    );
  }
}

export default ContactItem;