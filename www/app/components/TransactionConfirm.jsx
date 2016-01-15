import React from "react";
const Dialog = require('material-ui/lib/dialog');
const RaisedButton = require('material-ui/lib/raised-button');
import notify from "actions/NotificationActions";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import TransactionConfirmActions from "actions/TransactionConfirmActions";
import TransactionConfirmStore from "stores/TransactionConfirmStore";
import BaseComponent from "./BaseComponent";

import Transaction from "./Transaction";

class TransactionConfirm extends BaseComponent {

    constructor(props) {
        super(props, TransactionConfirmStore);
    }

    componentDidUpdate() {
/*
        if(!this.state.closed) {
            this.refs.confirmModal.show();
        } else {
            this.refs.confirmModal.dismiss();
        }
        */
    }

    onConfirmClick(e) {
        e.preventDefault();
        TransactionConfirmActions.broadcast(this.state.transaction);
       //  this.refs.confirmModal.dismiss();
    }

    onCloseClick(e) {
        e.preventDefault();
        TransactionConfirmActions.close();
        this.refs.confirmModal.dismiss();
    }

    render() {
        if ( !this.state.transaction || this.state.closed ) {return null; }

        //console.log('$$$ this.state.transaction =', this.state.transaction);

        let button_group, header;

        if(this.state.error || this.state.included) {
            header = this.state.error ? (
                    this.state.error
                ) :
                (
               counterpart.translate("wallet.success_exclaim")
            );
            button_group = (

                <div className="button-group">
                    <RaisedButton label={counterpart.translate("wallet.close")}
                        secondary={true}
                        onTouchTap={this.onCloseClick.bind(this)} />
                </div>
            );
        } else {
            header = "Confirm transaction";
                button_group = (
                <div className="button-group">
                    <RaisedButton label= {counterpart.translate("wallet.home.cancel")}
                        secondary={true}
                        onTouchTap={this.onCloseClick.bind(this)} />

                   <RaisedButton label= {counterpart.translate("wallet.confirm")}
                        primary={true}
                        backgroundColor = "#42b36e"
                        onTouchTap={this.onConfirmClick.bind(this)} />

                </div>
            );
        }


        return (
            <div ref="transactionConfirm">
                 <Dialog title={header}
                     open={true}
                     autoScrollBodyContent={true}
                     ref="confirmModal">
                   <div style={{maxHeight: "60vh", overflowY:'auto'}}>
                            <Transaction key={Date.now()} trx={this.state.transaction.serialize()}
                                index={0} no_links={true} donor={this.state.transaction.donor}/>
                    </div>
                    <div className="grid-block shrink" style={{paddingTop: "1rem"}}>
                        {button_group}
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default TransactionConfirm;

