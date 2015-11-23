import React from "react";
import BalanceComponent from "./Utility/BalanceComponent";
import AccountImage from "./AccountImage";
import {Link} from "react-router";
import ChainTypes from "./Utility/ChainTypes";
import BindToChainState from "./Utility/BindToChainState";
import AccountStore from "stores/AccountStore";
import ChainStore from "api/ChainStore";

/**
 *  @brief displays the summary of a given account in a condenced view (for the dashboard)
 *
 *  This card has the following properties:
 *
 *  { account: ${name_or_id} }
 */

@BindToChainState()
class AccountCard extends React.Component {

    componentWillMount() {

        var accounts = AccountStore.getState().linkedAccounts;

    }


    render() {

        return (
            <div className="profile">
                  
            </div>
        );
    }
}

export default AccountCard;
