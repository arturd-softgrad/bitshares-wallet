import React, {Component} from "react"

import Translate from "react-translate-component";
import {BackupRestore} from "components/Backup"
import BrainkeyInput from "components/BrainkeyInput"
import PasswordConfirm from "components/PasswordConfirm"
import WalletDb from "stores/WalletDb"
import WalletManagerStore from "stores/WalletManagerStore"
import WalletActions from "actions/WalletActions"
import NotificationSystem from 'react-notification-system'
import notify from 'actions/NotificationActions'
import connectToStores from "alt/utils/connectToStores"
import key from "common/key_utils"
import cname from "classnames"
const RaisedButton = require('material-ui/lib/raised-button');
import counterpart from "counterpart"


import { createHashHistory, useBasename } from 'history';
const history = useBasename(createHashHistory)({})

@connectToStores
class WalletCreate extends Component {

    static getStores() {
        return [WalletManagerStore];
    }

    static getPropsFromStores() {
        return {}
    }

    render() {
        if(WalletDb.getWallet() && this.props.children)
            return <div>{this.props.children}</div>

        return <span>
            <CreateNewWallet {...this.props}/>
        </span>
    }

}

@connectToStores
class CreateNewWallet extends Component {

    static getStores() {
        return [WalletManagerStore]
    }

    static getPropsFromStores() {
        var wallet = WalletManagerStore.getState()
        return wallet
    }

    static propTypes = {
        hideTitle: React.PropTypes.bool
    }

    constructor() {
        super()
        this.state = {
            wallet_public_name: "default",
            valid_password: null,
            errors: {},
            isValid: false,
            create_submitted: false,
            custom_brainkey: true,
            brnkey: null
        }
    }

    render() {
        let state = this.state
        let errors = state.errors
        let has_wallet = !!this.props.current_wallet

        if(this.state.create_submitted &&
            this.state.wallet_public_name === this.props.current_wallet) {
            return <div>
                <h4><Translate content="wallet.wallet_created" /></h4>
                <span onClick={this.onDone.bind(this)}
                    className="button success"><Translate content="wallet.done" /></span>
            </div>
        }

        return (<span>
            {this.props.hideTitle ? null:
                <h3><Translate content="wallet.create_wallet" /></h3>}
            <form
                className="name-form"
                onSubmit={this.onSubmit.bind(this)}
                onChange={this.formChange.bind(this)} noValidate
            >
                <PasswordConfirm onValid={this.onPassword.bind(this)}/>
                { has_wallet ? <div className="grid-content no-overflow">
                    <br/>
                    <label><Translate content="wallet.wallet_name" /></label>
                    <input type="text" id="wallet_public_name"
                        value={this.state.wallet_public_name}
                    />
                    <div className="has-error">{errors.wallet_public_name}</div>
                    <br/>
                </div>:null}
                <div className="grid-content no-overflow">
                    { this.state.custom_brainkey ? <div>
                        <label>{counterpart.translate("wallet.brainkey")}</label>
                        <BrainkeyInput onChange={this.onBrainkey.bind(this)}/>
                        {counterpart.translate("wallet.brainkey_imcompatible_ln1")}
                        <br/>{counterpart.translate("wallet.brainkey_imcompatible_ln2")}
                        <br/>&nbsp;
                    </div>:null}
                       <RaisedButton  label={counterpart.translate("wallet.home.cancel")}
                                    backgroundColor = "#FF4081" primary = {true}
                                    onTouchTap={this.onBack.bind(this)}  />
                       <RaisedButton className={cname("button",{disabled: !(this.state.isValid)})} type="submit"
                        label={counterpart.translate("wallet.create_wallet")}
                        backgroundColor =  "#008000" secondary={true}   />

                </div>
                <br/>
                { ! this.state.custom_brainkey ? <span>
                <label><a onClick={this.onCustomBrainkey.bind(this)}>
                    {counterpart.translate("wallet.custom_brainkey")}</a></label>
                </span>:null}
            </form>
        </span>)
    }

    onBack(e) {
        e.preventDefault()
        window.history.back()
    }

    onPassword(valid_password) {
        this.state.valid_password = valid_password
        this.setState({ valid_password })
        this.validate()
    }

    onCustomBrainkey() {
        this.setState({ custom_brainkey: true })
    }

    onBrainkey(brnkey) {
        this.state.brnkey = brnkey
        this.setState({ brnkey })
        this.validate()
    }

    onSubmit(e) {
        e.preventDefault()
        var wallet_name = this.state.wallet_public_name
        WalletActions.setWallet(wallet_name, this.state.valid_password, this.state.brnkey)
        this.setState({create_submitted: true})
    }

    formChange(event) {
        let key_id = event.target.id
        let value = event.target.value
        if(key_id === "wallet_public_name") {
            //case in-sensitive
            value = value.toLowerCase()
            // Allow only valid file name characters
            if( /[^a-z0-9_-]/.test(value) ) return
        }

        // Set state is updated directly because validate is going to
        // require a merge of new and old state
        this.state[key_id] = value
        this.setState(this.state)
        this.validate()
    }

    validate() {
        let state = this.state
        let errors = state.errors
        let wallet_names = WalletManagerStore.getState().wallet_names
        //errors.wallet_public_name =
        //    !wallet_names.has(state.wallet_public_name) ?
        //    null : `Wallet ${state.wallet_public_name.toUpperCase()} exists, please change the name`

        var isValid = errors.wallet_public_name === null && state.valid_password !== null
        if(this.state.custom_brainkey && isValid)
            isValid = this.state.brnkey !== null
        this.setState({ isValid, errors })
    }

    onDone() {
        history.pushState(null, '/');
        //window.history.back()
    }
}

export default WalletCreate
