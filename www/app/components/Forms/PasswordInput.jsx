import React from "react";
import {PropTypes, Component} from "react";
import ReactDOM from 'react-dom';
import classNames from "classnames";
import Translate from "react-translate-component";
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from'material-ui/lib/styles/colors';
const TextField = require('material-ui/lib/text-field');

class PasswordInput extends Component {

    childContextTypes: {
      muiTheme: React.PropTypes.object,
    }

    static propTypes = {
        onChange: PropTypes.func,
        onEnter: PropTypes.func,
        confirmation: PropTypes.bool,
        wrongPassword: PropTypes.bool
    }

    getChildContext() {
        muiTheme: this.state.muiTheme
    }

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.state = {muiTheme: ThemeManager.getMuiTheme(LightRawTheme), value: "", error: null, wrong: false, doesnt_match: false, passwordValue: ""};
    }

    componentWillMount() {
      let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
        accent1Color: Colors.deepOrange500,
      });

      this.setState({muiTheme: newMuiTheme, watermark: this.props.watermark});
    }



    value() {
        let node = this.state.passwordValue;
        return node ? node.value : "";
    }

    clear() {
        this.setState({
            confirmPasswordValue: "",
            passwordValue: ""
        })
     //   if(this.props.confirmation) ReactDOM.findDOMNode(this.refs.confirm_password).value = "";
    }

    focus() {
        ReactDOM.findDOMNode(this.password.password).focus();
    }

    valid() {
        return !(this.state.error || this.state.wrong || this.state.doesnt_match) && this.state.value.length === 6;
    }

    checkPasswordConfirmation() {
        let confirmation = this.state.confirmPasswordValue;
        let password = this.state.passwordValue;
        this.state.doesnt_match = confirmation && password !== confirmation;
        this.setState({doesnt_match: this.state.doesnt_match});
    }

    handleChange(e) {
     //   e.preventDefault();
     //   e.stopPropagation();
        let confirmation =  true;

        if (e.target.name === "confirm_password") {

            confirmation = this.props.confirmation ? e.target.value : true
        } else {
            confirmation = this.props.confirmation ? this.state.confirmPasswordValue : true
        }

        let password = this.state.passwordValue;

        if (e.target.name === "password") {
            password = e.target.value;
        }


        if(this.props.confirmation) this.checkPasswordConfirmation();
        let state = {
            valid: !this.state.error && !this.state.wrong
            && !(this.props.confirmation && this.state.doesnt_match)
            && confirmation && password.length === 6,
            passwordValue: password,
            value: password
        };
        if (this.props.onChange) this.props.onChange(state);
        this.setState(state);
    }

    onKeyDown(e) {
        if(this.props.onEnter && e.keyCode === 13) this.props.onEnter(e);
    }

    render() {
        let password_error = null, confirmation_error = null;
        if(this.state.wrong || this.props.wrongPassword) password_error = <div>Incorrect password</div>;
        else if(this.state.error) password_error = <div>{this.state.error}</div>;
        if (!password_error && (this.state.value.length > 6 || this.state.value.length < 6))
            password_error = "PIN must be 6 characters";
        if(this.state.doesnt_match) confirmation_error = <div>Confirmation doesnt match PIN</div>;
        let password_class_name = classNames("form-group", {"has-error": password_error});
        let password_confirmation_class_name = classNames("form-group", {"has-error": this.state.doesnt_match});
        return (
            <div>
                <div>
                    <TextField
                      name="password"
                      ref="password"
                      floatingLabelText={this.state.watermark || "6-digits PIN"}
                      type="password"
                      value={this.state.passwordValue}
                      onChange={this.handleChange}
                      errorText={password_error}
                      underlineFocusStyle={{borderColor: "#009FE3"}}
                      underlineStyle={{borderColor: "#72BAD9"}}
                      onEnterKeyDown={this.onKeyDown}/>
                </div>
                {this.props.confirmation ?
                    <div>
                    <TextField
                      name="confirm_password"
                      floatingLabelText="6-digits PIN confirm"
                      type="password"
                      value={this.state.confirmPasswordValue}
                      underlineFocusStyle={{borderColor: "#009FE3"}}
                      underlineStyle={{borderColor: "#72BAD9"}}
                      onChange={this.handleChange}
                      errorText=  {confirmation_error}/>
                    </div>
                : null}
            </div>

        );
    }
}

export default PasswordInput;
