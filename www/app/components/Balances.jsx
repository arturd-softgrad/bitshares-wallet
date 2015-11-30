import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import ChainTypes from "./Utility/ChainTypes";
import BindToChainState from "./Utility/BindToChainState";
import BalanceComponent from "./Utility/BalanceComponent";
//import {BalanceValueComponent} from "./Utility/EquivalentValueComponent";
import Immutable from "immutable";

// A component for displaying the wallet balance 
@BindToChainState()
class Balances extends React.Component {


  static propTypes = {
      account: ChainTypes.ChainAccount.isRequired
  };

  constructor(props) 
  {
     super(props)
  }

  render() {

        let name = null;
        let balances = null;
        let isMyAccount = false;
        if( this.props.account )
        {
           name = this.props.account.get('name');
           let abal = this.props.account.get('balances')
           if( abal )
           {
              balances = abal.map( x => <li key={x}><BalanceComponent balance={x}/></li>).toArray();
           }
         //  isMyAccount = AccountStore.isMyAccount(this.props.account);
        }

    return (
      <section className="balances">
        <div className="section-header active">
          <h2><i className="expand"></i> <Translate content="wallet.home.balances" /></h2>
        </div>
        <div className="balances__content">
          <ul className="balances">
                {balances}
          </ul>
        </div>
      </section>
    );
  }
};

export default Balances;