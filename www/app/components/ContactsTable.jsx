import React from "react";
import {PropTypes, Component} from "react";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import ContactItem from "./ContactItem";
import AccountStore from "stores/AccountStore";
import alt from "alt";
const Dialog = require('material-ui/lib/dialog');
import If from './If';
import AccountImage from "./AccountImage";
import Infinite from 'react-infinite';

class ContactsTable extends React.Component {

   constructor (props) {
    super();
    this.state = {
      current_contact: {},
      elements: this.buildElements(0, 5),
      isInfiniteLoading: false
    };
  }

  buildElements(start, end) {

      var elements = [];

        if (this.props) {

          let contacts_arr = this.props.contacts.toArray();
          let contacts = [];

          if (contacts_arr.length > 0) {

            for (var i=contacts_arr.length-1; i > -1; i--) {
              if (this.IsJsonString(contacts_arr[i])) {
                contacts.push(JSON.parse(contacts_arr[i]));
              }
            }
          }
 
          contacts.map((contact_item, i) =>
                elements.push(<ContactItem contact_name={contact_item.name} friendly_name={contact_item.friendly_name} notes={contact_item.notes} key={i} />)
          )
        }

        return elements;
  }

  handleInfiniteLoad() {
      var that = this;
      this.setState({
          isInfiniteLoading: true
      });
      setTimeout(function() {
          var elemLength = that.state.elements.length,
              newElements = that.buildElements(elemLength, elemLength + 5);
          that.setState({
              isInfiniteLoading: false,
              elements: that.state.elements.concat(newElements)
          });
      }, 1500);
  }

  elementInfiniteLoad() {
        return <div className="infinite-list-item">Loading...</div>;
  }

  shouldComponentUpdate(nextProps, nextState) {

      return this.props.contacts !== nextProps.contacts || 
             this.state.current_contact != nextState.current_contact
  }

  IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  } 

  render() {

/*
    let contacts_arr = this.props.contacts.toArray();
    let contacts = [];

    if (contacts_arr.length > 0) {

      for (var i=contacts_arr.length-1; i > -1; i--) {
        if (this.IsJsonString(contacts_arr[i])) {
          contacts.push(JSON.parse(contacts_arr[i]));
        }
      }
    }
*/
    return (
           <Infinite elementHeight={40}
                         containerHeight={250}
                         infiniteLoadingBeginBottomOffset={200}
                         onInfiniteLoad={this.handleInfiniteLoad}
                         loadingSpinnerDelegate={this.elementInfiniteLoad()}
                         isInfiniteLoading={this.state.isInfiniteLoading}
                         >
              {this.state.elements}
          </Infinite>
    );
  }
}

export default ContactsTable;