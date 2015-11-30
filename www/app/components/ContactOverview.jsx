import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";

const RaisedButton = require('material-ui/lib/raised-button');
const Dialog = require('material-ui/lib/dialog');


// ContactOverview view
class ContactOverview extends React.Component {

  constructor(props) {
    super(props);
  }

  // Render ContactsScreen view
  render() {

    return (
        <Dialog title="Display Dates and Times"
              actions={this.props.actions} autoScrollBodyContent={true}
              ref="dialog" onDismiss={this.props.fnDismiss}>
        </Dialog>

    );
  }
};

export default ContactOverview;