import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import BalanceComponent from "./Utility/BalanceComponent";
import AmountSelector from "./Utility/AmountSelector";
import ChainTypes from "./Utility/ChainTypes";
import BindToChainState from "./Utility/BindToChainState";
import KeyGenComponent from  "./KeyGenComponent"

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
            currency: "",
            asset_id: null,
            asset: null,
        };

         let { query } = this.props.location;

         if (query.hasOwnProperty("contact")) {
            let current_contact = JSON.parse(query.contact);
            this.state.to_name= current_contact.name;
            console.log("$$$ receive screen contact ", current_contact);
         }

        this.state.from_name = this.props.account.get("name");
  }

   _shareReceiveScrn() {

       var sharingMsg = 'Payment ' + this.state.amount + ' ' + this.state.currency + ' for ' + this.state.from_name;

        if (window.plugins && window.plugins.socialsharing)
        {
            var seed = this.state.amount;
            var qrcontent = KeyGenComponent.getComponents(seed);

            window.plugins.socialsharing.share(
                qrcontent.privateKey,
                sharingMsg,
                null, // images
                'http://bitshares-munich.evennode.com/');
        }
        else
            console.log('shareReceiveScrn: social network sharing plugin is not available, message=', sharingMsg);
  }

  formChange(event) {
      var state = this.state
      state[event.target.id] = event.target.value
      this.setState(state)
  }

  setAccountName(name) {
    var state = this.state
    state.accountName = name;
    this.setState(state)
    return null;
  }

  onAmountChanged({amount, asset}) {
      this.setState({amount, asset, error: null})
  }

  onKeyDown(e) {
    if (e.keyCode >= 48 && e.keyCode <= 57) {
    } else {
      return false;
    }
  }

  // Render ReceiveScreen view
  render() {

    let asset_types = [];
    let balance = null;
    var qrcontent = KeyGenComponent.getComponents(this.state.amount);


    return (
    <main className="no-nav content">
      <div className="receive-qr">{qrcontent.qr}
        <div className="data-text">{qrcontent.privateKey}</div>
      </div>
      <div className="amount">
        <h2><Translate component="span" content="wallet.home.requestSpecificAmount"/>:</h2>
        <form className="receive_form" action="#">

          <input type="text" className="text-field receive-input"  onKeyDown={this.onKeyDown} id="amount" onChange={this.formChange.bind(this)} />
          <select className="nice-select receive-select" style={{"background": "transparent"}} name="currency" id = "currency" onChange={this.formChange.bind(this)} >
            <option value="BTS">BTS</option>
            <option value="USD">USD</option>
            <option value="CNY">CNY</option>
            <option value="EUR">EUR</option>
           </select>

        </form>
        <div className="share_block">
            <i className="share" onTouchTap={this._shareReceiveScrn.bind(this)}></i>
        </div>
      </div>
      <div className="clearfix"></div>
    </main>
    );
  }
}

export default ReceiveScreen;