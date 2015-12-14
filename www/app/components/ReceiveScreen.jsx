import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import AmountSelector from "./Utility/AmountSelector";
import ChainTypes from "./Utility/ChainTypes";
import BindToChainState from "./Utility/BindToChainState";

import { Router, Route, Link, IndexRoute } from 'react-router';

// Flux ReceiveScreen view
@BindToChainState()
class ReceiveScreen extends React.Component {


  static propTypes = {
       account: ChainTypes.ChainAccount.isRequired
  }

  static defaultProps = {
      account: "props.params.account_name"
  }

  constructor(props) {
        super(props);

        this.state =  {
            from_name: "",
            to_name: "",
            from_account: null,
            to_account: null,
            amount: "",
            asset_id: null,
            asset: null,
        };

         let { query } = this.props.location;

         if (query.hasOwnProperty("contact")) {
            let current_contact = JSON.parse(query.contact);
            this.state.to_name= current_contact.name;
            console.log("$$$ receive screen contact ", current_contact);
         }

    }

  // Render ReceiveScreen view
  render() {

    let asset_types = [];
    let balance = null;

    return (
      <main className="no-nav content">
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
        </form>
      </div>
      <div className="clearfix"></div>
    </main>
    );
  }
}

export default ReceiveScreen;