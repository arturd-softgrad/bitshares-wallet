import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";

// A component for displaying the wallet balance 
class Balances extends React.Component {

  render() {
    return (
      <section className="balances">
        <div className="section-header active">
          <h2><i className="expand"></i> <Translate content="wallet.home.balances" /></h2>
        </div>
        <div className="balances__content">
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