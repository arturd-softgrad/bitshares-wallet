import React from "react";
import Translate from "react-translate-component";

import Transactions from "./Transactions";
import AccountCard from "./AccountCard";
import Balances from "./Balances";
import RecentTransactions from "./RecentTransactions";

import If from "./If";

import AltContainer from "alt/AltContainer";

import BindToChainState from "./Utility/BindToChainState";
import { Router, Route, Link, IndexRoute } from 'react-router';
const SelectField = require('material-ui/lib/select-field');
import AccountActions from "actions/AccountActions";
import AccountStore from "stores/AccountStore";
import SettingsStore from "stores/SettingsStore";
import WalletUnlockStore from "stores/WalletUnlockStore";
import BackupStore from "stores/BackupStore";
import Immutable from "immutable";
import ChainTypes from "./Utility/ChainTypes";


class HomeScreen extends React.Component {

    constructor(props) {
      super(props);
   /*   this.state = {
            account: ""
      }*/
    }

/*
    componentWillMount() {
        let account = this.props.params.account_name;
        if(account && AccountStore.getState().linkedAccounts.get(account))
            AccountActions.setCurrentAccount(this.props.params.account_name);
    }
*/
    //wasBackedUp
    // Render HomeScreen view
    render() {

      var isBackupRequired = BackupStore.isBackupRequired();
      //console.log("$$$wasBackedUp =", wasBackedUp);

      var contents = isBackupRequired?        <section className="code">
        <Link to="backup" className="active"><Translate content="wallet.backup.createBackupPrompt" /></Link>
      </section> :       [
            <nav className="main-nav">
              <ul>
                <li className="active"><a href="#"><Translate content="wallet.home.balances" /></a></li>
                <li><Link to="contacts"><Translate content="wallet.home.contacts" /></Link></li>
                <li><a href="#"><Translate content="wallet.home.finder" /></a></li>
                <li><a href="#"><Translate content="wallet.home.exchange" /></a></li>
              </ul>
            </nav>,
            <section className="code">
              <div className="code__item">
                <div className="code__item__img"><img src="app/assets/img/QR.jpg" alt=""/></div>
                
                <div className="code__item__data">
                      <AltContainer 
                          stores={
                            {
                              account: () => { // props is the property of AltContainer
                                return {
                                  store: AccountStore,
                                  value: AccountStore.getState().currentAccount
                                };
                              },
                              linkedAccounts: () => {
                                return {
                                  store: AccountStore,
                                  value: AccountStore.getState().linkedAccounts
                                } 
                              }
                            }
                          }
                        >
                         <AccountCard/>
                    </AltContainer>
                  <div className="data-text">777BTSFwmiD9C7h7Q8fHU9y3fAb5JhLCPBEzRZW</div>
                </div>
              </div>
            </section>,
            <section className="code-buttons">
              <Link to="receive" className="btn btn-receive">receive</Link>
              <Link to="send" className="btn btn-send">send</Link>
            </section>,
                      <AltContainer 
                          stores={
                            {
                              account: () => { // props is the property of AltContainer
                                return {
                                  store: AccountStore,
                                  value: AccountStore.getState().currentAccount
                                };
                              }
                            }
                          }>
                       <Balances />
                    </AltContainer>]

       return (
         <section>
            {contents}
        </section>
       );
    }
};

export default HomeScreen;