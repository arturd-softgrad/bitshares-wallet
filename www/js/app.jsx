import React from "react";
import {PropTypes, Component} from "react";
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import counterpart from "counterpart";
import { createHistory, useBasename } from 'history';
import ReceiveScreen from './components/ReceiveScreen';
import ContactsScreen from './components/ContactsScreen';
import HomeScreen from './components/HomeScreen';
import SendScreen from './components/SendScreen';
import SettingsScreen from './components/SettingsScreen'; 

import injectTapEventPlugin from 'react-tap-event-plugin';

import locale_en from "../assets/locales/locale-en";
counterpart.registerTranslations("en", locale_en);

//Needed for React Developer Tools
window.React = React;

injectTapEventPlugin();

const history = useBasename(createHistory)({
  basename: '/wallet'
})

// Main app component
class App extends React.Component {
    render() {

        const { pathname } = this.props.location

        return (
            <section>
            <div className="bg-logo"><img src="/assets/img/bg-logo.svg" alt="" /></div>
            <header className="header-inner"><a href="#"  className="back"></a>
              <div className="header__logo"><img src="/assets/img/logo.svg" alt=""/></div>
              <section className="utility">
                <Link className="mat-icon" to="settings"><i className="settings"></i></Link>
                <a href="#"><i className="check"></i></a><span>block #43182</span>
              </section>
            </header>
            {this.props.children}
            </section>
        )
    }
}


var app = {

    // Application Constructor
    initialize: function() {
    
        this.bindEvents();

        render((
          <Router history={history}>
           <Route path="/" component={App}>
            <IndexRoute component={HomeScreen}/>
            <Route path="contacts" component={ContactsScreen}/>
            <Route path="send" component={SendScreen}/>
            <Route path="receive" component={ReceiveScreen}/>
            <Route path="settings" component={SettingsScreen}/>
            </Route>
          </Router>
        ), document.body);

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



