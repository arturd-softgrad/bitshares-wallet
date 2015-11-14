import React from "react";
import Translate from "react-translate-component";

import Transactions from "./Transactions";
import Balances from "./Balances";
import AccountImage from "./AccountImage";

import { Router, Route, Link, IndexRoute } from 'react-router';

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
                <div className="code__item__img"><img src="/assets/img/qr.jpg" alt=""/></div>
                <div className="code__item__data">
                  <div className="profile">
                    <AccountImage className="profile-icon" account={"delegate.kencode"} />
                    <span>delegate.kencode</span>
                  </div>
                  <div className="data-text">BTSFwmiD9C7h7Q8fHU9y3fAb5JhLCPBEzRZW</div>
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