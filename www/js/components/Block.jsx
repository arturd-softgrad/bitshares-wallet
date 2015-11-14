import React, {Component} from "react/addons";
let Perf = React.addons.Perf;
import AltContainer from "alt/AltContainer"
import Translate from "react-translate-component";
import BindToChainState from "../Utility/BindToChainState";
import ChainTypes from "../Utility/ChainTypes";
import CachedPropertyStore from "stores/CachedPropertyStore"
import CachedPropertyActions from "actions/CachedPropertyActions"
import BlockchainStore from "stores/BlockchainStore";
import ChainStore from "api/ChainStore"
import WalletDb from "stores/WalletDb";
import TimeAgo from "../Utility/TimeAgo";
import Icon from "../Icon/Icon";
import ReactTooltip from "react-tooltip"

@BindToChainState({keep_updating: true})
class Footer extends React.Component {

    static propTypes = {
        dynGlobalObject: ChainTypes.ChainObject.isRequired
    }

    static defaultProps = {
        dynGlobalObject: "2.1.0"
    }

    static contextTypes = {
        router: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {perf: false};
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.dynGlobalObject !== this.props.dynGlobalObject ||
               nextProps.backup_recommended !== this.props.backup_recommended ||
               nextProps.rpc_connection_status !== this.props.rpc_connection_status;
    }

    render() {
        let block_height = this.props.dynGlobalObject.get("head_block_number");
        let block_time = this.props.dynGlobalObject.get("time") + "+00:00";
        // console.log("block_time", block_time)
        let bt = (new Date(block_time).getTime() + ChainStore.getEstimatedChainTimeOffset()) / 1000;
        let now = new Date().getTime() / 1000;
        let version_match = APP_VERSION.match(/2\.0\.(\d\w+)/);
        let version = version_match ? `.${version_match[1]}` : ` ${APP_VERSION}`;
            return (
            <div>
             
            {block_height ?
                (<div className="grid-block shrink">
                    <Translate content="footer.block" /> &nbsp;
                    <pre>#{block_height} </pre> &nbsp;
                    { now - bt > 5 ? <TimeAgo ref="footer_head_timeago" time={block_time} /> : <span data-tip="Synchronized" data-place="left"><Icon name="checkmark-circle" /></span> }
                </div>) :
                <div className="grid-block shrink"><Translate content="footer.loading" /></div>}
              
            </div>
        );
    }

}


export default Footer;
