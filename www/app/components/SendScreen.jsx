import React from "react";
import {PropTypes, Component} from "react";
import BalanceComponent from "./Utility/BalanceComponent";
import AccountActions from "actions/AccountActions";
import Translate from "react-translate-component";
import AccountSelect from "./Forms/AccountSelect";
import AccountSelector from "./AccountSelector";
import AccountStore from "stores/AccountStore";
import AmountSelector from "./Utility/AmountSelector";
import utils from "common/utils";
import counterpart from "counterpart";
import TransactionConfirmStore from "stores/TransactionConfirmStore";
import Immutable from "immutable";
const Checkbox = require('material-ui/lib/checkbox');
const TextField = require('material-ui/lib/text-field');
import ChainTypes from "./Utility/ChainTypes";
import BindToChainState from "./Utility/BindToChainState";
import { Router, Route, Link, IndexRoute } from 'react-router';
import WalletDb from "stores/WalletDb";
import WalletUnlockActions from "actions/WalletUnlockActions"
import SettingsStore from "stores/SettingsStore";

// Flux SendScreen view to to configure the application
@BindToChainState()
class SendScreen extends React.Component {

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
            memo: "",
            error: null,
            propose: false,
            propose_account: ""
        };

         let { query } = this.props.location;

         if (query.hasOwnProperty("contact")) {
            let current_contact = JSON.parse(query.contact);
            this.state.to_name= current_contact.name;
         }
     //   if(props.query.from) this.state.from_name = props.query.from;
     //   if(props.query.to) this.state.to_name = props.query.to;
 //       if(props.query.amount) this.state.amount = props.query.amount;
   //     if(props.query.asset) this.state.asset_id = props.query.asset;
  //      if(props.query.memo) this.state.memo = props.query.memo;
        this.state.from_name = this.props.account.get("name");
        this.state.from_account = this.props.account;
        this.onTrxIncluded = this.onTrxIncluded.bind(this);
    }

    /*
    fromChanged(from_name) {
        let asset = undefined
        let amount = undefined
        this.setState({from_name,asset,amount, error: null, propose: false, propose_account: ""})
    }
    */

    toChanged(to_name) {
        this.setState({to_name, error: null})
    }
/*
    onFromAccountChanged(from_account) {
        this.setState({from_account, error: null})
    }
*/

    onToAccountChanged(to_account) {
        this.setState({to_account, error: null})
    }

    onAmountChanged({amount, asset}) {
        this.setState({amount, asset, error: null})
    }

    onMemoChanged(e) {
        this.setState({memo: e.target.value});
    }

    onTrxIncluded(confirm_store_state) {
        if(confirm_store_state.included && confirm_store_state.broadcasted_transaction) {
              this.setState({
              from_name: "",
              to_name: "",
              from_account: null,
              to_account: null,
              amount: "",
              asset_id: null,
              asset: null,
              memo: "",
              error: null,
              propose: false,
              propose_account: ""
          });
            TransactionConfirmStore.unlisten(this.onTrxIncluded);
            TransactionConfirmStore.reset();
        } else if (confirm_store_state.closed) {
            TransactionConfirmStore.unlisten(this.onTrxIncluded);
            TransactionConfirmStore.reset();
        }
    }

    onPropose(propose, e) {
        e.preventDefault()
        this.setState({ propose, propose_account: null })
    }

    onProposeAccount(propose_account) {
        this.setState({ propose_account });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({error: null});
        let asset = this.state.asset;
        let precision = utils.get_asset_precision(asset.get("precision"));

        let advancedSettings = SettingsStore.getSetting("advancedSettings");
        if (!advancedSettings || advancedSettings.requirePinToSend)
          WalletUnlockActions.lock();
        else
          WalletDb.unlock();

        AccountActions.transfer(
            this.state.from_account.get("id"),
            this.state.to_account.get("id"),
            parseInt(amount * precision, 10),
            asset.get("id"),
            this.state.memo,
            this.state.propose ? this.state.propose_account : null
        ).then( () => {
            TransactionConfirmStore.unlisten(this.onTrxIncluded);
            TransactionConfirmStore.listen(this.onTrxIncluded);
        }).catch( e => {
            let msg = e.message ? e.message.split( '\n' )[1] : null;
            console.log( "error: ", e, msg)
            this.setState({error: msg})
        } );
    }

  // Render SendScreen view
  render() {

     let from_error = null;
        let from_my_account = AccountStore.isMyAccount(this.state.from_account)
        let propose = this.state.propose
        if(this.state.from_account && ! from_my_account && ! propose ) {
            from_error = <span>
                {counterpart.translate("account.errors.not_yours")}
                {/* &nbsp;(<a onClick={this.onPropose.bind(this, true)}>{counterpart.translate("propose")}</a>) */}
            </span>;
        }

        let asset_types = [];
        let balance = null;
        if (this.state.from_account && !from_error) {
            let account_balances = this.state.from_account.get("balances").toJS();
            asset_types = Object.keys(account_balances);
            if (asset_types.length > 0) {
                let current_asset_id = this.state.asset ? this.state.asset.get("id") : asset_types[0];
                balance = (<span><Translate component="span" content="transfer.available"/>: <BalanceComponent balance={account_balances[current_asset_id]}/></span>)
            } else {
                balance = "No funds";
            }
        }
        let propose_incomplete = this.state.propose && ! this.state.propose_account
        let submitButtonClass = "button";
        if(!this.state.from_account || !this.state.to_account || !this.state.amount || this.state.amount === "0"|| !this.state.asset || from_error || propose_incomplete)
            submitButtonClass += " disabled";

        let accountsList = Immutable.Set();
        accountsList = accountsList.add(this.state.from_account)
        let tabIndex = 1

   return (
     <main className="no-nav content">
          <h2>Request a specific Amount (optional)</h2>
          <form className="send-form" onSubmit={this.onSubmit.bind(this)} noValidate>
              <div className="form-row">
                <span>From: {this.state.from_name}</span>
              </div>
              <div className="form-row">
                  <AccountSelector label="transfer.to"
                     accountName={this.state.to_name}
                     onChange={this.toChanged.bind(this)}
                     onAccountChanged={this.onToAccountChanged.bind(this)}
                     account={this.state.to_name}/>
              </div>
              <div className="form-row send-buttons"><Link to="contacts" className="btn send-form-btn">Contacts</Link><a href="#" className="btn photo-btn is-disabled"></a><a href="#" className="btn send-form-btn is-disabled">Clipboard</a></div>
              <div className="form-row curr-input">
                  <AmountSelector
                      amount={this.state.amount}
                      onChange={this.onAmountChanged.bind(this)}
                      asset={asset_types.length > 0 && this.state.asset ? this.state.asset.get("id") : ( this.state.asset_id ? this.state.asset_id : asset_types[0])}
                      assets={asset_types}
                      display_balance={balance}/>
              </div>
              <div className="form-row">
                    <TextField
                      floatingLabelText={counterpart.translate("wallet.home.memo")}
                      name="memo"
                      id="memo"
                      value={this.state.memo}
                      onChange={this.onMemoChanged.bind(this)}
                      underlineFocusStyle={{borderColor: "#009FE3"}}
                      underlineStyle={{borderColor: "#72BAD9"}}
                      multiLine={true} />
              </div>
              <div className="form-row">
                  <Checkbox
                    name="Donate"
                    value="checkboxValue1"
                    label="Donate 2 BTS to the Support Developers at BitShares Munich"
                    defaultChecked={true}/>
              </div>
              <button className="btn btn-send-big" type="submit" value="Submit">
                  <span>send</span>
              </button>
            </form>
      </main>
    );
  }

}

export default  SendScreen;