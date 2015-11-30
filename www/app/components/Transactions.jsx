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

  constructor(props) {
    super(props);
  }

  static propTypes = {
      account: ChainTypes.ChainAccount.isRequired
  };

  render() {

    let account = this.props.account;
    if (!account) {
        return null;
    }

    return (
      <RecentTransactions accountsList={Immutable.fromJS([account.get("id")])}
                        compactView={false}
                        showMore={true}/>
    );
  }
};


export default  Transactions;