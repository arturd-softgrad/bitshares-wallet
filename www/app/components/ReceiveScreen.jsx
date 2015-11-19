import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";

import { Router, Route, Link, IndexRoute } from 'react-router';

// Flux ReceiveScreen view
class ReceiveScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  // Render ReceiveScreen view
  render() {
    return (
      <main className="no-nav">
      <div className="receive-qr"><img src="app/assets/img/qr-big.png" alt=""/>
        <div className="data-text">BTSFwmiD9C7h7Q8fHU9y3fAb5JhLCPBEzRZW</div>
      </div>
      <div className="amount">
        <h2>Request a specific Amount (optional)</h2>
        <form action="#">
          <input type="text" placeholder="5000.00"/>
          <select name="currency">
            <option value="bts">BTS</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
          <input type="submit"/>
        </form>
      </div>
      <div className="clearfix"></div>
    </main>
    );
  }
}

export default ReceiveScreen;