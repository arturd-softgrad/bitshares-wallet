import React from "react";
import {PropTypes, Component} from "react";
import Counterpart from 'counterpart';
import Translate from 'react-translate-component';


class LanguageSwitcher extends React.Component{

  constructor(props) {
    super(props);
  }

  
  handleChange(e) {
    Counterpart.setLocale(e.target.value);
  },

  render() {
    return (
      <p>
        <span>Switch Locale:</span>

        <select defaultValue={Counterpart.getLocale()} onChange={this.handleChange}>
          <option>en</option>
          <option>de</option>
          <option>es</option>
          <option>fr</option>
          <option>sk</option>
          <option>fi</option> 
          <option>bg</option> 
          <option>ja</option> 
          <option>zh</option>
          <option>hi</option>
          <option>tr</option>
          <option>hr</option>
          <option>el</option>
          <option>it</option>
          <option>pl</option>
          <option>bs</option>
          <option>ro</option>
          <option>sr</option>
          <option>ar</option>
          <option>sq</option>
          <option>hu</option>
          <option>ru</option>
        </select>
      </p>
    );
  }
}


export default LanguageSwitcher;