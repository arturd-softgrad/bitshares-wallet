import React from "react";
import utils from "common/utils";
import {PropTypes} from "react";
import {Link} from "react-router";
import ChainTypes from "./ChainTypes";
import BindToChainState from "./BindToChainState";

/**
 *  Given an amount and an asset, render it with proper precision
 *
 *  Expected Properties:
 *     asset:  asset id, which will be fetched from the
 *     amount: the ammount of asset
 *
 */

@BindToChainState({keep_updating: true})
class FormattedAsset extends React.Component {

    static propTypes = {
          amount: PropTypes.number.isRequired,
          asset: ChainTypes.ChainAsset.isRequired,
          exact_amount: PropTypes.bool,
          decimalOffset: PropTypes.number,
          color: PropTypes.string,
          hide_asset: PropTypes.bool,
          hide_amount: PropTypes.bool
    }

    static defaultProps = {
        decimalOffset: 0,
        amount: 0,
        asset: "",
        hide_asset: false,
        hide_amount: false
    }

    constructor(props) {
        super(props);
     //   this.state = {asset: this.props.asset}
    }

    render() {
        let {amount, decimalOffset, color, asset, hide_asset, hide_amount, display_sign} = this.props;

        if( asset && asset.toJS ) asset = asset.toJS();

        let colorClass = color ? "facolor-" + color : "";

        let precision = utils.get_asset_precision(asset.precision);

        let decimals = Math.max(0, asset.precision - decimalOffset);

        if (hide_amount) {
            colorClass += " no-amount";
        }

        return (
                <span className={colorClass}  >
                {display_sign? amount>0 ? '+': null: null}
                {!hide_amount ?
                   <span>{this.props.exact_amount ? amount : amount / precision}</span>
                : null}
                {hide_asset ? null : <span className="currency">{"\u00a0" + asset.symbol}</span>}
                </span>
        );
    }
}

export default FormattedAsset;

