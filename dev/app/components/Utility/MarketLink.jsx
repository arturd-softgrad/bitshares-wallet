import React from "react";
import {Link} from "react-router";
import ChainTypes from "./ChainTypes";
import BindToChainState from "./BindToChainState";

/**
 *  Given a base and quote asset, render a link to that market
 *
 *  Expected Properties:
 *     base:  asset id, which will be fetched from the ChainStore
 *     quote: either an asset id or a balance id 
 *
 */

@BindToChainState()
class MarketLink extends React.Component {

    static propTypes = {
        quote: ChainTypes.ChainObject.isRequired,
        base: ChainTypes.ChainObject.isRequired
    };

    static defaultProps = {
        base: "1.3.0"
    };

    render() {
        let {base, quote} = this.props;
        if (base.get("id") === quote.get("id")) {
            return null;
        }
        let marketID = quote.get("symbol") + "_" + base.get("symbol");
        let marketName = quote.get("symbol") + " : " + base.get("symbol");
        return (
            <Link to="exchange" params={{marketID: marketID}}>{marketName}</Link>
        );
    }
}

@BindToChainState()
class ObjectWrapper extends React.Component {

    static propTypes = {
        object: ChainTypes.ChainObject.isRequired
    };

    render () {
        let {object} = this.props;
        let quoteAsset = object.has("asset_type") ? object.get("asset_type") : object.get("id");

        return <MarketLink quote={quoteAsset} />
    }
}

MarketLink.ObjectWrapper = ObjectWrapper;

export default MarketLink;
