import React from "react";
import {PropTypes, Component} from "react";

import Translate from "react-translate-component";
import counterpart from "counterpart";
const Checkbox = require('material-ui/lib/checkbox');
import LanguageSwitcher from "./LanguageSwitcher";

// Flux SendScreen view to to configure the application
class SendScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  // Render SendScreen view
  render() {

   return (
     <main className="no-nav">
        <h2>Request a specific Amount (optional)</h2>
        <form action="" className="send-form">
          <div className="form-row">
            <label for="address">To:</label>
            <input type="text" id="address" name="address" placeholder="wehhostking" className="full-input address-input"/>
          </div>
          <div className="form-row send-buttons"><a href="#" className="btn send-form-btn">Contacts</a><a href="#" className="btn photo-btn"></a><a href="#" className="btn send-form-btn is-disabled">Clipboard</a></div>
          <div className="form-row curr-input">
            <label for="amount">Amount</label>
            <input type="text" name="amount" id="amount" placeholder="100.00"/>
            <select name="send-curr" id="send-curr">
              <option value="bts">BTS</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
            <p><span>104.83 </span>USD is available</p>
          </div>
          <label for="memo">Memo:</label>
          <textarea name="memo" id="memo" placeholder="Monthly delegate webhosting"></textarea>
          <div className="form-row">
              <Checkbox
                name="Donate"
                value="checkboxValue1"
                label="Donate 2 BTS to the Support Developers at BitShares Munich"
                defaultChecked={true}/>
          </div><a href="#" className="btn btn-send-big"><span>send</span></a>
        </form>
      </main>
    );
  }

}

export default  SendScreen;