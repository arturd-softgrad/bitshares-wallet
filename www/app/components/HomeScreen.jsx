import React from "react";
import Translate from "react-translate-component";

import Transactions from "./Transactions";
import Balances from "./Balances";
import AccountImage from "./AccountImage";

import { Router, Route, Link, IndexRoute } from 'react-router';
const DropDownMenu = require('material-ui/lib/drop-down-menu');

// Flux HomeScreen view
class HomeScreen extends React.Component {

    constructor(props) {
      super(props);
    }

    // Render HomeScreen view
    render() {

       return (
         <section>
            <nav className="main-nav">
              <ul>
                <li className="active"><a href="#"><Translate content="wallet.home.balances" /></a></li>
                <li><Link to="contacts"><Translate content="wallet.home.contacts" /></Link></li>
                <li><a href="#"><Translate content="wallet.home.finder" /></a></li>
                <li><a href="#"><Translate content="wallet.home.exchange" /></a></li>
              </ul>
            </nav>
            <section className="code">
              <div className="code__item">
                <div className="code__item__img"><img src="app/assets/img/QR.jpg" alt=""/></div>
                <div className="code__item__data">
                  <div className="profile">
                    <AccountImage className="profile-icon" account={"delegate.kencode"} />
                    <SelectField
                    value={this.state.selectValue}
                    onChange={this._handleSelectValueChange.bind(null, 'selectValue')}
                    menuItems={[
                       { payload: '1', text: 'delegate.kencode' },
                       { payload: '2', text: 'delegate.kencode2' },
                    ]} />
                  </div>
                  <div className="data-text">777BTSFwmiD9C7h7Q8fHU9y3fAb5JhLCPBEzRZW</div>
                </div>
              </div>
            </section>
            <section className="code-buttons">
              <Link to="receive" className="btn btn-receive">receive</Link>
              <Link to="send" className="btn btn-send">send</Link>
            </section>
            <Balances />
            <Transactions />
        </section>
       );
    }
};

export default HomeScreen;