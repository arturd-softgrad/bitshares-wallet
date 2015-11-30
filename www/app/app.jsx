import React from "react";
import {PropTypes, Component} from "react";
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, IndexLink} from 'react-router';
import counterpart from "counterpart";
import Apis from "rpc_api/ApiInstances";
import ReceiveScreen from './components/ReceiveScreen';
import ContactsScreen from './components/ContactsScreen';
import HomeScreen from './components/HomeScreen';
import SendScreen from './components/SendScreen';
import SettingsScreen from './components/SettingsScreen';
import CreateAccount from "./components/CreateAccount";
import ExistingAccount, {ExistingAccountOptions} from './components/ExistingAccount';
import Backup, {BackupCreate, BackupVerify, BackupRestore} from "./components/Backup";
import Brainkey from "./components/Brainkey";
import ImportKeys from "./components/ImportKeys";
import WalletChangePassword from "./components/WalletChangePassword";
import cookies from "cookies-js";

import AccountStore from "stores/AccountStore";
import SettingsStore from "stores/SettingsStore";
import WalletUnlockStore from "stores/WalletUnlockStore";

import BackupActions from "actions/BackupActions";
import IntlActions from "actions/IntlActions";
import iDB from "idb-instance";
import WalletDb from "stores/WalletDb";
import ChainStore from "api/ChainStore";
import WalletManagerStore from "stores/WalletManagerStore";
import PrivateKeyActions from "actions/PrivateKeyActions";
import AccountRefsStore from "stores/AccountRefsStore";
import ChainTypes from "./components/Utility/ChainTypes";
import NotificationStore from "stores/NotificationStore";

import AltContainer from "alt/AltContainer";

import injectTapEventPlugin from 'react-tap-event-plugin';
import If from './components/If';

import { createHashHistory, useBasename } from 'history';

const history = useBasename(createHashHistory)({});

//Needed for React Developer Tools
window.React = React;

injectTapEventPlugin();
/*
const history = useBasename(createHistory)({
  basename: '/index.html'
})
*/

require("./components/Utility/Prototypes"); // Adds a .equals method to Array for use in shouldComponentUpdate
require("dl_cli_index").init(window) // Adds some object refs to the global window object

// Main app component
class App extends React.Component {

//    static contextTypes = { router: React.PropTypes.func.isRequired }

    constructor() {
        super();
        this.state = {loading: true, synced: false};
    }
/*
    shouldComponentUpdate(nextProps, nextState) {
      //  return nextProps.dynGlobalObject !== this.props.dynGlobalObject ||
            // nextProps.backup_recommended !== this.props.backup_recommended ||
      //        nextProps.rpc_connection_status !== this.props.rpc_connection_status; //||
               //nextProps.synced !== this.props.synced;
    }
*/

    componentDidMount() { try {

        NotificationStore.listen(this._onNotificationChange.bind(this));

        // Try to retrieve locale from cookies
        let locale;
        if (cookies) {
            locale = cookies.get("graphene_locale");
        }

        // Switch locale if the user has already set a different locale than en
        let localePromise = (locale) ? IntlActions.switchLocale(locale) : null;

        Promise.all([
            localePromise, // Non API
            AccountStore.loadDbData()
        ]).then(() => {
            AccountStore.tryToSetCurrentAccount();
            this.setState({loading: false});
        }).catch(error => {
            console.log("[app.jsx] ----- ERROR ----->", error, error.stack);
            this.setState({loading: false});
        });

        ChainStore.init().then(() => {
            this.setState({synced: true});
        }).catch(error => {
            console.log("[app.jsx] ----- ChainStore.init error ----->", error, error.stack);
            this.setState({loading: false});
        });

        //<Link className="back" onClick={history.goBack}></Link>

    } catch(e) { console.error(e) }}

     /** Usage: NotificationActions.[success,error,warning,info] */
    _onNotificationChange() {
        let notification = NotificationStore.getState().notification;
        if (notification.autoDismiss === void 0) {
            notification.autoDismiss = 10;
        }
        if (this.refs.notificationSystem) this.refs.notificationSystem.addNotification(notification);
    }

    static willTransitionTo(nextState, replaceState, callback)  {


        if (nextState.location.pathname === "/init-error") {
            var db = iDB.init_instance(window.openDatabase ? (shimIndexedDB || indexedDB) :  indexedDB).init_promise
            db.then(() => {
                Apis.instance().init_promise.then(() => callback()).catch(() => callback());
            });
            return;
        }
        Apis.instance().init_promise.then(() => {
            var db = iDB.init_instance(window.openDatabase ? (shimIndexedDB || indexedDB) :  indexedDB).init_promise
            return Promise.all([db]).then(() => {
                console.log("db init done");
                return Promise.all([
                    PrivateKeyActions.loadDbData().then(()=>AccountRefsStore.loadDbData()),
                    WalletDb.loadDbData().then(() => {
                        if (!WalletDb.getWallet() && nextState.location.pathname  !== "/create-account") {
                            //BackupActions.resetBackedUpFlag();
                            replaceState({
                              nextPathname: nextState.location.pathname
                            }, '/create-account');

                          //  transition.redirect("/create-account");
                        }
                        if (nextState.location.pathname .indexOf("/auth/") === 0) {
                         //   transition.redirect("/dashboard");
                         replaceState({
                              nextPathname: nextState.location.pathname
                            }, '/')
                        }
                    }).catch((error) => {
                        console.error("----- WalletDb.willTransitionTo error ----->", error);
                    }),
                    WalletManagerStore.init()
                ]).then(()=> {
                    callback();
                })
            });
        }).catch( error => {
            console.error("----- App.willTransitionTo error ----->", error, (new Error).stack);

            if(error.name === "InvalidStateError") {
                alert("Can't access local storage.\nPlease make sure your browser is not in private/incognito mode.");
            } else {
              //  transition.redirect("/init-error");
                callback();
            }
        })
    }

    render() {
        const { pathname } = this.props.location;
        //var History = Router.History;
        return (
            <section>
                <div className="bg-logo"><img src="app/assets/img/bg-logo.svg" alt="" /></div>
                    <header className="header-inner">
                        <If condition={pathname != "/"}>
                             <a className="back" onClick={history.goBack}></a>
                        </If>
                      <div className="header__logo"><img src="app/assets/img/logo.svg" alt=""/></div>
                      <section className="utility">
                        <Link className="mat-icon" to="settings"><i className="settings"></i></Link>
                        <a href="#"><i className="check"></i></a><span>block #43182</span>
                      </section>
                    </header>
                     <AltContainer 
                          stores={
                            {
                              accounts: () => { // props is the property of AltContainer
                                return {
                                  store: AccountStore,
                                  value: AccountStore.getMyAccounts()
                                };
                              },
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
                        {this.props.children}
                    </AltContainer>
         
            </section>
        )
    }
}

var app = {

    // Application Constructor
    initialize: function() {

        this.bindEvents();
        this.onDeviceReady(); // TODO remove on device

        let routes = (
            <Route path="/" component={App} onEnter={App.willTransitionTo}>
                <IndexRoute component={HomeScreen} onEnter={App.willTransitionTo}/>
                <Route path="contacts" component={ContactsScreen}/>
                <Route path="send" component={SendScreen}/>
                <Route path="receive" component={ReceiveScreen}/>
                <Route path="settings" component={SettingsScreen}/>
                <Route path="backup" component={BackupCreate}/>
                <Route path="changepin" component={WalletChangePassword}/>
                <Route path="create-account" component={CreateAccount} onEnter={App.willTransitionTo}/>
                <Route path="existing-account" component={ExistingAccount}>
                    <IndexRoute component={ExistingAccountOptions}/>
                    <Route path="import-backup" component={BackupRestore}/>
                    <Route path="import-keys" component={ImportKeys}/>
                    <Route path="brainkey" component={Brainkey}/>
                </Route>
            </Route>
        )

      //  let history = createBrowserHistory();

        render((<Router history={history}>{routes}</Router>), document.getElementById("content"));

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


app.initialize();



