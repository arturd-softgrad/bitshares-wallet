import React from "react";
import {PropTypes, Component} from "react";
import classNames from "classnames";
import AccountActions from "actions/AccountActions";
import AccountStore from "stores/AccountStore";
import BaseComponent from "../BaseComponent";
import validation from "common/validation";
import Translate from "react-translate-component";
import counterpart from "counterpart";
const TextField = require('material-ui/lib/text-field');

class AccountNameInput extends BaseComponent {

    static propTypes = {
        id: PropTypes.string,
        placeholder: PropTypes.string,
        initial_value: PropTypes.string,
        onChange: PropTypes.func,
        onEnter: PropTypes.func,
        accountShouldExist: PropTypes.bool,
        accountShouldNotExist: PropTypes.bool,
        cheapNameOnly: PropTypes.bool
    };

    constructor(props) {
        super(props, AccountStore);
        this.state.value = null;
        this.state.error = null;
        this.state.existing_account = false;
        this.handleChange = this.handleChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.value !== this.state.value
            || nextState.error !== this.state.error
            || nextState.account_name !== this.state.account_name
            || nextState.existing_account !== this.state.existing_account
            || nextState.searchAccounts !== this.state.searchAccounts
    }

    componentDidUpdate() {
        if (this.props.onChange) this.props.onChange({valid: !this.getError()});
    }

    value() {
        return this.state.value;
    }

    setValue(value) {
        this.setState({value});
    }

    clear() {
        this.setState({ account_name: null, error: null, warning: null })
    }

    focus() {
        React.findDOMNode(this.refs.input).focus();
    }

    valid() {
        return !this.getError();
    }

    getError() {
        if(this.state.value === null) return null;
        let error = null;
        if (this.state.error) {
            error = this.state.error;
        } else if (this.props.accountShouldExist || this.props.accountShouldNotExist) {
            let account = this.state.searchAccounts.find(a => a === this.state.value);
            if (this.props.accountShouldNotExist && account) {
                error = counterpart.translate("account.name_input.name_is_taken");
            }
            if (this.props.accountShouldExist && !account) {
                error = counterpart.translate("account.name_input.not_found");
            }
        }
        return error;
    }

    validateAccountName(value) {
        this.state.error = value === "" ?
            "Please enter valid account name" :
            validation.is_account_name_error(value)

        this.state.warning = null
        if(this.props.cheapNameOnly) {
            if( ! this.state.error && ! validation.is_cheap_name( value ))
                this.state.error = counterpart.translate("account.name_input.premium_name_faucet");
        } else {
            if( ! this.state.error && ! validation.is_cheap_name( value ))
                this.state.warning = counterpart.translate("account.name_input.premium_name_warning");
        }
        this.setState({value: value, error: this.state.error, warning: this.state.warning});
        if (this.props.onChange) this.props.onChange({value: value, valid: !this.getError()});
        if (this.props.accountShouldExist || this.props.accountShouldNotExist) AccountActions.accountSearch(value);
    }

    handleChange(e) {
        e.preventDefault();
        e.stopPropagation();
        // Simplify the rules (prevent typing of invalid characters)
        var account_name = e.target.value.toLowerCase()
        account_name = account_name.match(/[a-z0-9\.-]+/)
        account_name = account_name ? account_name[0] : null
        this.setState({ account_name })
        this.validateAccountName(account_name);
    }

    onKeyDown(e) {
        if (this.props.onEnter && event.keyCode === 13) this.props.onEnter(e);
    }

    render() {
        let error = this.getError() || "";
        let class_name = classNames("form-group", "account-name", {"has-error": false});
        let warning = this.state.warning
        return (
                <TextField
                  hintText={this.props.placeholder}
                  floatingLabelText="Account name" 
                  onChange={this.handleChange}
                  type="text"
                  defaultValue={this.props.initial_value}
                  onEnterKeyDown={this.onKeyDown}
                  value={this.state.account_name}
                  errorText={error ? error : warning}/>
        );
    }
}

export default AccountNameInput;
