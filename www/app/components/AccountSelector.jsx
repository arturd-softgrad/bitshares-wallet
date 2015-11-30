import React from "react";
import utils from "common/utils";
import validation from "common/validation";
import AccountImage from "./AccountImage";
import Translate from "react-translate-component";
import ChainStore from "api/ChainStore";
import ChainTypes from "./Utility/ChainTypes";
import BindToChainState from "./Utility/BindToChainState";
import classnames from "classnames";
import counterpart from "counterpart";
import PublicKey from "ecc/key_public";
const TextField = require('material-ui/lib/text-field');

/**
 * @brief Allows the user to enter an account by name or #ID
 *
 * This component is designed to be stateless as possible.  It's primary responsbility is to
 * manage the layout of data and to filter the user input.
 *
 */

@BindToChainState({keep_updating: true})
class AccountSelector extends React.Component {

    static propTypes = {
        label: React.PropTypes.string.isRequired, // a translation key for the label
        error: React.PropTypes.string, // the error message override
        placeholder: React.PropTypes.string, // the placeholder text to be displayed when there is no user_input
        onChange: React.PropTypes.func, // a method to be called any time user input changes
        onAccountChanged: React.PropTypes.func, // a method to be called when existing account is selected
        onAction: React.PropTypes.func, // a method called when Add button is clicked
        accountName: React.PropTypes.string, // the current value of the account selector, the string the user enters
        account: ChainTypes.ChainAccount, // account object retrieved via BindToChainState decorator (not input)
        tabIndex: React.PropTypes.number, // tabindex property to be passed to input tag
        disableActionButton: React.PropTypes.string // use it if you need to disable action button
    }

    // can be used in parent component: this.refs.account_selector.getAccount()
    getAccount() {
        return this.props.account;
    }

    getError() {
        let error = this.props.error;
        if (!error && this.props.accountName && !this.getNameType(this.props.accountName))
            error = counterpart.translate("account.errors.invalid");
        return error;
    }

    getNameType(value) {
        if(!value) return null;
        if(value[0] === "#" && utils.is_object_id("1.2." + value.substring(1))) return "id";
        if(validation.is_account_name(value, true)) return "name";
        if(this.props.allowPubKey && PublicKey.fromPublicKeyString(value)) return "pubkey";
        return null;
    }

    onInputChanged(event) {
        let value = event.target.value.trim(); //.toLowerCase();
        if (this.props.onChange && value !== this.props.accountName) this.props.onChange(value);
    }

    onKeyDown(event) {
        if (event.keyCode === 13) this.onAction(event);
    }

    componentDidMount() {
        if(this.props.onAccountChanged && this.props.account)
            this.props.onAccountChanged(this.props.account);
    }

    componentWillReceiveProps(newProps) {
        if(this.props.onAccountChanged && newProps.account !== this.props.account)
            this.props.onAccountChanged(newProps.account);
    }

    onAction(e) {
        e.preventDefault();
        if(this.props.onAction && !this.getError() && !this.props.disableActionButton) {
            if (this.props.account)
                this.props.onAction(this.props.account);
            else if (this.getNameType(this.props.accountName) === "pubkey")
                this.props.onAction(this.props.accountName);
        }
    }

    render() {
        let error = this.getError();
        let type = this.getNameType(this.props.accountName);
        let lookup_display;
        if (this.props.allowPubKey) {
            if (type === "pubkey") lookup_display = "Public Key";
        } else if (this.props.account) {
            if(type === "name") lookup_display = "#" + this.props.account.get("id").substring(4);
            else if (type === "id") lookup_display = this.props.account.get("name");
        } else if (!error && this.props.accountName) error = counterpart.translate("account.errors.unknown");

        let member_status = null;
        if (this.props.account)
            member_status = counterpart.translate("account.member." + ChainStore.getAccountMemberStatus(this.props.account));

        let action_class = classnames("button", {"disabled" : !(this.props.account || type === "pubkey") || error || this.props.disableActionButton});
       
   //     let member_label = member_status + '&nbsp' + lookup_display;

        return (
            <div className="account-selector no-overflow" style={this.props.style}>
                {type === "pubkey" ? <div className="account-image"></div> :
                <AccountImage size={{height: 40, width: 40}}
                              account={this.props.account ? this.props.account.get('name') : null} custom_image={null}/>}
                      <TextField type="text"
                             value={this.props.accountName}
                             floatingLabelText={counterpart.translate("wallet.home.to")}
                             defaultValue={this.props.accountName}
                             hintText="Accoun name"
                             ref="user_input"
                             onChange={this.onInputChanged.bind(this)}
                             onKeyDown={this.onKeyDown.bind(this)}
                             tabIndex={this.props.tabIndex}
                             underlineFocusStyle={{borderColor: "#009FE3"}}
                             underlineStyle={{borderColor: "#72BAD9"}}
                             errortext={error}/>

                          { this.props.children }
                          { this.props.onAction ? (
                              <button className={action_class}
                                      onClick={this.onAction.bind(this)}>
                                  <Translate content={this.props.action_label}/></button>
                          ) : null }
            </div>
        )

    }

}
export default AccountSelector;
