import React from "react";
import {Link} from "react-router";
import ChainTypes from "./Utility/ChainTypes";
import BindToChainState from "./Utility/BindToChainState";

@BindToChainState()
class LinkToAccountById extends React.Component {
    static propTypes = {
        account: ChainTypes.ChainObject.isRequired
    }

    shouldComponentUpdate(nextProps) {
        // console.log("linkToAccountById:", nextProps.account.toJS());
        if (nextProps.account.get("name") && this.props.account.get("name") && nextProps.account.get("name") === this.props.account.get("name")) {
            return false;
        }
        return true;
    }

    render() {
        let account_name = this.props.account.get("name");
        if (!account_name) {
            console.log( "!account_name: ", this.props.account.toJS() );
            return <span>{this.props.account.get("id")}</span>;
        } else {
            // console.log( "account_name exists: ", this.props.account.get("id"), this.props.account.get("name") );
        }
        //return <Link to="account-overview" params={{account_name}}>{account_name}</Link>
        return <span>{account_name}</span>;
    }
}

export default LinkToAccountById;
