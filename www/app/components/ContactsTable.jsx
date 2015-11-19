import React from "react";
import {PropTypes, Component} from "react";

import Translate from "react-translate-component";
import counterpart from "counterpart";
import ContactItem from "./ContactItem";

class ContactsTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
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
           {[,...Array(10)].map((x, i) =>
              <ContactItem key={i} />
            )}
        </tbody>
      </table>
    );
  }
}

export default ContactsTable;