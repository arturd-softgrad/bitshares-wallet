import React from "react";
import {PropTypes, Component} from "react";

import Translate from "react-translate-component";
import counterpart from "counterpart";
import TransactionItem from "./TransactionItem"

// Flux Transactions view to display the list of transactions
class Transactions extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="transactions">
        <div className="section-header">
          <h2><i className="expand"></i><Translate content="wallet.home.transactions" /></h2>
        </div>
        <div className="transactions__content">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>|All|</th>
                <th>To/From</th>
                <th>Amount assets</th>
              </tr>
            </thead>
            <tbody>
            <TransactionItem />
            </tbody>
          </table>
        </div>
      </section>
    );
  }
};


export default  Transactions;