import React from "react";
import {PropTypes, Component} from "react";
import BalanceComponent from "./Utility/BalanceComponent";
import AccountImage from "./AccountImage";
import {Link} from "react-router";
import ChainTypes from "./Utility/ChainTypes";
import Immutable from "immutable";
const DropDownMenu = require('material-ui/lib/drop-down-menu');
import AccountActions from "actions/AccountActions";
import BindToChainState from "./Utility/BindToChainState";

@BindToChainState()
class AccountCard extends Component {

    static propTypes = {
       account: ChainTypes.ChainAccount.isRequired
    }

    static defaultProps = {
      account: "props.params.account_name"
    }

    render() {

        if (!this.props.account) {
            return null;
        }

        return (
            <div className="profile">
                    <AccountImage className="profile-icon" account={this.props.account.get("name")} />
                    <span>{this.props.account.get("name")}</span>
                    <span></span>
            </div>
        );
    }
}

export default AccountCard;
