import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import ChainTypes from "./Utility/ChainTypes";
import BindToChainState from "./Utility/BindToChainState";

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

    let abal = this.props.account.get('balances' )
    if( abal ) {
        balances = abal.map( x => {
            let balanceAmount = ChainStore.getObject(x);
            if (!balanceAmount.get("balance")) {
                return null;
            }
            return <li key={x}><BalanceComponent balance={x}/></li>;
        }).toArray();
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
          <div className="balances__content-left">
            <p>148326.38  BTS</p>
            <p>174.11  EUR</p>
            <p>2.62  USD</p>
          </div>
          <div className="balances__content-right">
            <p>300.00  BTSATM</p>
            <p>4.10  GOLD</p>
          </div>
        </div>
      </section>
    );
  }
};


export default Balances;