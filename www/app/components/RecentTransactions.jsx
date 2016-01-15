import React from "react";
import Translate from "react-translate-component";
import Operation from "./Operation";
import ChainTypes from "./Utility/ChainTypes";
import BindToChainState from "./Utility/BindToChainState";
import utils from "common/utils";
import {operations} from "chain/chain_types";
import Immutable from "immutable";
import ChainStore from "api/ChainStore";
import IntlStore from "stores/IntlStore";
import SettingsStore from "stores/SettingsStore";


function compareOps(b, a) {
    if(a.block_num < b.block_num) return -1;
    if(a.block_num === b.block_num) {
        if(a.trx_in_block < b.trx_in_block) return -1;
        if(a.trx_in_block === b.trx_in_block) {
            if(a.op_in_trx < b.op_in_trx) return -1;
            if(a.op_in_trx === b.op_in_trx) return 0;
        }
    }
    return 1;
}

@BindToChainState({keep_updating: true})
class RecentTransactions extends React.Component {

    static propTypes = {
        accountsList: ChainTypes.ChainAccountsList.isRequired,
        compactView: React.PropTypes.bool,
        limit: React.PropTypes.number
    }

    constructor(props) {
        super();
        this.state = {
            limit: props.limit ? Math.max(20, props.limit) : 20
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(!utils.are_equal_shallow(this.props.accountsList, nextProps.accountsList)) return true;
        if (nextState.limit !== this.state.limit) return true;
        for(let key = 0; key < nextProps.accountsList.length; ++key) {
            let npa = nextProps.accountsList[key];
            let nsa = this.props.accountsList[key];
            if(npa && nsa && (npa.get("history") !== nsa.get("history"))) return true;
        }
        return false;
    }


    componentWillMount() {
        this.setState({hideDonations : SettingsStore.getAdvancedSettings().hideDonations == true});
    }



    _onIncreaseLimit() {
        this.setState({
            limit: this.state.limit + 30
        });
    }

    render() {

        let iso = IntlStore.getCurrency().iso;
        if (iso && iso.length != 0 )
        {
            var test_asset = ChainStore.getAsset(iso);
            if (test_asset == null)
                 this.setState({taxableCurrencyId:null});
            else
                this.setState({taxableCurrencyId:iso});
        }
        else
            this.setState({taxableCurrencyId:null});


        let {accountsList, compactView, filter} = this.props;
        let {limit} = this.state;
        let history = [];
        let current_account = null, current_account_id = null;
        let accounts_counter = 0;
        var seen_ops = new Set();
        for(let account of accountsList) {
            accounts_counter += 1;
            if(account) {
                current_account = account;
                let h = account.get("history");
                if (h) history = history.concat(h.toJS().filter(op => !seen_ops.has(op.id) && seen_ops.add(op.id)));
            }
        }
        let historyCount = history.length;

        if (filter) {
            history = history.filter(a => {
                return a.op[0] === operations[filter];
            });
        }
        if (this.state.hideDonations)
            history = history.filter(a => {
                return a.op[1].to != "1.2.90200";
            });

        if (/*accounts_counter === 1 && */ current_account) current_account_id = current_account.get("id");
        //console.log('$$$raw history =', history); // $$$
        let rowid =0;
        history = history
            .sort(compareOps)
            .slice(0, limit)
            .map(o => {
                return (
                    <Operation
                        rowid = {rowid++}
                        key={o.id}
                        op={o.op}
                        result={o.result}
                        block={o.block_num}
                        current={current_account_id}
                        inverted={false}
                        hideFee={true}
                        hideOpLabel={compactView}
                        taxableCurrencyId={this.state.taxableCurrencyId} />
                )
        });
        /*return (
            <div>
                <table className={"table" + (compactView ? " compact" : "")}>
                    <thead>
                    <tr>
                        {compactView ? null : <th><Translate content="wallet.transaction_op" /></th>}
                        <th><Translate content="wallet.transaction_info" /></th>
                        <th><Translate content="wallet.transaction_date" /></th>
                    </tr>
                    </thead>
                    <tbody>
                        {history}
                    </tbody>
                </table>
                {this.props.showMore && historyCount > 20 && limit < historyCount ? (
                    <div className="account-info more-button">
                        <div className="button outline" onClick={this._onIncreaseLimit.bind(this)}>
                            <Translate content="account.more" />
                        </div>
                    </div>
                    ) : null}
            </div>
        );*/
        return   <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th className="right-td"><Translate content="wallet.transaction_date" /></th>
                        <th><Translate content="wallet.transaction_op" /></th>
                        <th><Translate content="wallet.home.to" />/<Translate content="wallet.home.from" /></th>
                        <th><Translate content="wallet.home.amount" /> <Translate content="wallet.home.asset" /></th>
                    </tr>
                    </thead>
                    <tbody>
                        {history}
                    </tbody>
                </table>
                {this.props.showMore && historyCount > 20 && limit < historyCount ? (
                    <div className="account-info more-button">
                        <div className="button outline" onClick={this._onIncreaseLimit.bind(this)}>
                            <Translate content="wallet.account_more" />
                        </div>
                    </div>
                    ) : null}
            </div>
    }
}

export default RecentTransactions;
