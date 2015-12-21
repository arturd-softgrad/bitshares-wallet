import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import AccountSelector from './AccountSelector';
import AccountActions from "actions/AccountActions";
const RaisedButton = require('material-ui/lib/raised-button');
const Dialog = require('material-ui/lib/dialog');
const TextField = require('material-ui/lib/text-field');
import { createHashHistory, useBasename } from 'history';

const history = useBasename(createHashHistory)({});

// ContactOverview view
class InviteFriend extends React.Component {

  constructor(props) {
    super(props);

     this.state = {emails: ""}
  }

  _handleOnLinkCancel(e) {
      history.pushState(null, 'contacts');
  }

  _handleShareInvite() {

    if (this.state.emails != "") {
      debugger;
      if (window.plugins && window.plugins.socialsharing) {

          let to = this.state.emails.split(";");

          let onSuccess = function() {
            history.pushState(null, 'contacts');
          } 

          let onError = function(error) {
            console.log(error);
          }
             
          window.plugins.socialsharing.shareViaEmail(
              'Message', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
              'Subject',
              to, // TO: must be null or an array
              null, // CC: must be null or an array
              null, // BCC: must be null or an array
              ['https://www.google.nl/images/srpr/logo4w.png','www/localimage.png'], // FILES: can be null, a string, or an array
              onSuccess, // called when sharing worked, but also when the user cancelled sharing via email (I've found no way to detect the difference)
              onError // called when sh*t hits the fan
          );

      } else {
         console.log('bitshares invite: social network sharing plugin is not available');
      }
    } else {

      alert("Enter the recipient");
    }

  }

  // Render ContactsScreen view
  render() {

    return (
       <section className="content">
           <TextField
              floatingLabelText="The email list (via the separator ;)"
              type="text"
              onChange={this.toChangedNotes.bind(this)}
              value={this.state.emails}
              multiLine={true}/>
          <div>
           <RaisedButton
            label="Send"
            primary={true}
            onTouchTap={this._handleShareInvite.bind(this)} />,
            <RaisedButton
            label="Cancel"
            secondary={true}
            onTouchTap={this._handleOnLinkCancel} />
          </div>
         </section>
    );
  }
};

export default InviteFriend;