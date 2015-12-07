import React from "react";
import {PropTypes, Component} from "react";

import Translate from "react-translate-component";
import counterpart from "counterpart";
import RecentTransactions from "./RecentTransactions";
import BindToChainState from "./Utility/BindToChainState";
import ChainTypes from "./Utility/ChainTypes";
import Immutable from "immutable";

// Flux Transactions view to display the list of transactions
@BindToChainState({keep_updating: true})
class Transactions extends React.Component{

  static propTypes = {
      account: ChainTypes.ChainAccount.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {show: false}
  }

  shouldComponentUpdate(nextProps) {
      return this.props.account !== nextProps.account
  }

  _handleToogle() {
      
      let show = this.state.show;
      this.setState({ show: !show });
  }

  render() {

    let account = this.props.account;
    if (!account) {
        return null;
    }

    return (
      <section className="transactions">
        <div className="section-header transactions">
          <h2 className="toogle-header" onTouchTap={this._handleToogle.bind(this)}><i className="expand"></i> <Translate content="wallet.home.transactions" /></h2>
        </div>

          { this.state.show ? 
          ( <div className="balances__content toogle-panel">
              <ul className="balances">
                <RecentTransactions accountsList={Immutable.fromJS([account.get("id")])}
                            compactView={false}   showMore={true}/>
              </ul>
            </div>
          ) : null }
      </section>
    );
  }
};


export default  Transactions;