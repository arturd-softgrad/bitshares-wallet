import React from "react";
import {PropTypes, Component} from "react";

import Translate from "react-translate-component";
import counterpart from "counterpart";


// Flux Transactions view to display a single transaction data
class TransactionItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      	<tr class="rec-color">
		  <td>17.10.2015<span>14:32 CET</span></td>
		  <td> <span class="sent-color">|Sent|</span><span class="rec-color">|Recd|</span></td>
		  <td> <span>To: delegate.kencode</span><span>From: anon</span><span>Memo: hey ken, great job on the ATM’s!</span></td>
		  <td>+ 20.00 EUR</td>
		</tr>
    );
  }
};


export default  TransactionItem;