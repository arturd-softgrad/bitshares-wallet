import React from "react";
import Translate from "react-translate-component";
import Transactions from "./Transactions";
import AccountCard from "./AccountCard";
import Balances from "./Balances";
import RecentTransactions from "./RecentTransactions";
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
import KeyGenComponent from  "./KeyGenComponent"
import WalletDb from "stores/WalletDb";

class HomeScreen extends React.Component {

    constructor(props) {
      super(props);

    }

    _shareBTSAddress()
    {

      console.log(window.plugins);

      //onclick="window.plugins.socialsharing.share({qrcontent.privateKey})"
        if (window.plugins && window.plugins.socialsharing)
        {
            var qrcontent = KeyGenComponent.getComponents();

            window.plugins.socialsharing.share(
                qrcontent.privateKey,
                'BTS address',
                null, // images
                'http://bitshares-munich.evennode.com/');
        }
        else
            console.log('BTS address share: social network sharing plugin is not available');
    }

    render() {

      var isBackupRequired = BackupStore.isBackupRequired();
      var qrcontent = KeyGenComponent.getComponents();

      //WalletDb.unlock();

      var isLocked = WalletDb.isLocked();
      console.log('$$$isLocked', isLocked);

      var contents = isBackupRequired ?        <section className="code content-home">
        <Link to="backup" className="active"><Translate content="wallet.backup.createBackupPrompt" /></Link>
      </section> :       [
            <section className="code content-home">
              <div className="code__item">
                <div className="code__item__img">{qrcontent.qr}</div>

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
                    <div className="data-text"  onTouchTap = {this._shareBTSAddress.bind(this)} >{qrcontent.privateKey}</div>
                </div>
              </div>
            </section>,
            <section className="code-buttons">
              <Link to="receive" className="btn btn-receive upper">receive</Link>
              <Link to="send" className="btn btn-send upper">send</Link>
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
                       <Transactions  />
                    </AltContainer>]

       return (
         <section>
            {contents}
        </section>
       );
    }
};

export default HomeScreen;