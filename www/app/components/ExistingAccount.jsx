import React from "react";
import {Link} from "react-router";
import connectToStores from "alt/utils/connectToStores";
import WalletManagerStore from "stores/WalletManagerStore";
import Translate from "react-translate-component";

class ExistingAccountBaseComponent extends React.Component {
    static getStores() {
        return [WalletManagerStore]
    }

    static getPropsFromStores() {
        var wallet = WalletManagerStore.getState()
        return {wallet}
    }
}

@connectToStores
class ExistingAccount extends ExistingAccountBaseComponent {
    render() {
        var has_wallet = this.props.wallet.wallet_names.count() != 0
        return (
            <div className="grid-block vertical content">
                <div className="grid-content">
                    <div className="content-block center-content">
                        <div className="content-block  content-home" style={{width: '24em'}}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

@connectToStores
export class ExistingAccountOptions extends ExistingAccountBaseComponent {

//


    render() {
        var has_wallet = this.props.wallet.wallet_names.count() != 0

        return (
            <section className="code content-home">
                {!has_wallet ? <div>
                    <Link to="existing-account/import-keys">Import from BitShares 0.9.3c</Link><br/><br/>
                    <Link to="existing-account/import-backup">IMPORT BACKUP</Link><br/><br/>
                </div>:null}
            </section>
        )
    }
}

export default ExistingAccount;
