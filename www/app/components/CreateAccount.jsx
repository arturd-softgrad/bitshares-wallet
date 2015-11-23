import React from "react";
import connectToStores from "alt/utils/connectToStores";
import classNames from "classnames";
import AccountActions from "actions/AccountActions";
import AccountStore from "stores/AccountStore";
import AccountNameInput from "./Forms/AccountNameInput";
import PasswordInput from "./Forms/PasswordInput";
import WalletDb from "stores/WalletDb";
import notify from 'actions/NotificationActions';
import {Link} from "react-router";
import AccountImage from "./AccountImage";
import AccountSelect from "./Forms/AccountSelect";
import WalletUnlockActions from "actions/WalletUnlockActions";
import TransactionConfirmStore from "stores/TransactionConfirmStore";
import LoadingIndicator from "./LoadingIndicator";
import WalletActions from "actions/WalletActions";
import Translate from "react-translate-component";
import RefcodeInput from "./Forms/RefcodeInput";
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from'material-ui/lib/styles/colors';
const RaisedButton = require('material-ui/lib/raised-button');

@connectToStores
class CreateAccount extends React.Component {

    static getStores() {
        return [AccountStore]
    }

    static getPropsFromStores() {
        return {}
    }

    //static contextTypes = {router: React.PropTypes.func.isRequired};

    constructor() {
        super();

        super();
        this.state = {
            validAccountName: false,
            accountName: "",
            validPassword: false,
            registrar_account: "bitshares-munich",
            loading: false,
            hide_refcode: true,
            show_identicon: true
        };
        this.onFinishConfirm = this.onFinishConfirm.bind(this);
   }

   shouldComponentUpdate(nextProps, nextState) {
        return nextState.validAccountName !== this.state.validAccountName ||
            nextState.accountName !== this.state.accountName ||
            nextState.validPassword !== this.state.validPassword ||
            nextState.registrar_account !== this.state.registrar_account ||
            nextState.loading !== this.state.loading ||
            nextState.hide_refcode !== this.state.hide_refcode ||
            nextState.show_identicon !== this.state.show_identicon;
    }

    isValid() {
        let first_account = AccountStore.getMyAccounts().length === 0;
        let valid = this.state.validAccountName;
        if (!WalletDb.getWallet()) valid = valid && this.state.validPassword;
        if (!first_account) valid = valid && this.state.registrar_account;
        return valid;
    }

    onAccountNameChange(e) {
         const state = {};
        if(e.valid !== undefined) this.setState({ validAccountName: e.valid })
        if(e.value !== undefined) this.setState({ accountName: e.value });
        if (!this.state.show_identicon) state.show_identicon = true;
        this.setState(state);
    }

    onPasswordChange(e) {
        this.setState({validPassword: e.valid});
    }

    onFinishConfirm(confirm_store_state) {
        if(confirm_store_state.included && confirm_store_state.broadcasted_transaction) {
            let trx_obj = confirm_store_state.broadcasted_transaction.toObject();
            let op0 = trx_obj.operations[0];
            TransactionConfirmStore.unlisten(this.onFinishConfirm);
            TransactionConfirmStore.reset();
            if(op0[0] === 5 && op0[1].name === this.state.accountName) {
                this.context.router.transitionTo("/", {account_name: this.state.accountName});
            }
        }
    }

    createAccount(name) {
        let refcode = this.refs.refcode ? this.refs.refcode.value() : null;
    //    WalletUnlockActions.unlock().then(() => {
            this.setState({loading: true});
            AccountActions.createAccount(name, this.state.registrar_account, this.state.registrar_account, 0, refcode).then(() => {
                if(this.state.registrar_account) {
                    this.setState({loading: false});
                    TransactionConfirmStore.listen(this.onFinishConfirm);
                } else {
                    this.context.router.transitionTo("/", {account_name: name});
                }
            }).catch(error => {
                console.log("ERROR AccountActions.createAccount", error);
                let error_msg = error.base && error.base.length && error.base.length > 0 ? error.base[0] : "unknown error";
                if (error.remote_ip) error_msg = error.remote_ip[0];
                notify.addNotification({
                    message: `Failed to create account: ${name} - ${error_msg}`,
                    level: "error",
                    autoDismiss: 10
                });
                this.setState({loading: false});
            });
       // }); 
    }

    createWallet(password) {
        return WalletActions.setWallet(
            "default", //wallet name
            password
        ).then(()=> {
            console.log("Congratulations, your wallet was successfully created.");
        }).catch(err => {
            console.log("CreateWallet failed:", err);
            notify.addNotification({
                message: `Failed to create wallet: ${err}`,
                level: "error",
                autoDismiss: 10
            })
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if (!this.isValid()) return;
        let account_name = this.refs.account_name.value();
        if (WalletDb.getWallet()) {
            this.createAccount(account_name);
        } else {
            let password = this.refs.password.state.value;
            this.createWallet(password).then(() => this.createAccount(account_name));
        }
    }

    onRegistrarAccountChange(registrar_account) {
        this.setState({registrar_account});
    }

    showRefcodeInput(e) {
        e.preventDefault();
        this.setState({hide_refcode: false});
    }

    render() {
        let my_accounts = AccountStore.getMyAccounts()
        let first_account = my_accounts.length === 0;
        let valid = this.isValid();
        let buttonClass = classNames("button", {disabled: !valid});
        return (
                    <section>
                      <main className="no-nav">
                        <div className="page-header">
                            <h3>"ACCOUNT CREATE/REGISTER OR IMPORT"</h3>
                        </div>
                            <form onSubmit={this.onSubmit.bind(this)} noValidate>
                                <div className="form-group">
                                    <AccountImage account={this.state.validAccountName ? this.state.accountName:null}/>
                                </div>
                                <AccountNameInput ref="account_name" cheapNameOnly={first_account}
                                                  onChange={this.onAccountNameChange.bind(this)}
                                                  accountShouldNotExist={true}/>

                                {WalletDb.getWallet() ?
                                    null :
                                    <PasswordInput ref="password" confirmation={true} onChange={this.onPasswordChange.bind(this)}/>
                                }
                                {
                                    first_account ? null : (
                                        <div className="full-width-content form-group">
                                            <label><Translate content="account.pay_from" /></label>
                                            <AccountSelect account_names={my_accounts}
                                                onChange={this.onRegistrarAccountChange.bind(this)}/>
                                        </div>)
                                }
                                {this.state.hide_refcode ? null :
                                    <div>
                                        <RefcodeInput ref="refcode" label="refcode.refcode_optional" expandable={true}/>
                                        <br/>
                                    </div>
                                }
                                {this.state.loading ?  <LoadingIndicator type="circle"/> :<RaisedButton type="submit" label="Secondary" secondary={true} />}
                                <br/>
                                <br/>
                                <label className="inline"><Link to="existing-account">Existing account</Link></label>
                                {this.state.hide_refcode ? <span>&nbsp; &bull; &nbsp;
                                    <label className="inline"><a href onClick={this.showRefcodeInput.bind(this)}>Enter refcode</a></label>
                                </span> : null}
                            </form>
                      </main>
                    </section>
        );
    }
}

export default CreateAccount;
