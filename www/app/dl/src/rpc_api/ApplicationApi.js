var Aes = require('../ecc/aes');
var PrivateKey = require('../ecc/key_private');
var PublicKey = require('../ecc/key_public');
var Long = require('bytebuffer').Long;

var chain_types = require('../chain/chain_types');
var chain_config = require('../chain/config');
var helper = require('../chain/transaction_helper')
var ops = require('../chain/signed_transaction');
var type = require('../chain/serializer_operation_types')
var key = require('../common/key_utils');
var v = require('common/validation')

import WalletUnlockActions from "../actions/WalletUnlockActions"
import WalletDb from "stores/WalletDb"
import lookup from "chain/lookup"
import ChainStore from "api/ChainStore";

class ApplicationApi {

    create_account(
        owner_pubkey,
        active_pubkey,
        new_account_name,
        registrar_id,
        referrer_id,
        referrer_percent,
        broadcast = false
    ) {
        var tr = new ops.signed_transaction();
        v.required(registrar_id, "registrar_id")
        v.required(referrer_id, "referrer_id")
        var _registrar = lookup.account_id(registrar_id)
        var _referrer = lookup.account_id(referrer_id)
        return lookup.resolve().then(()=> {
            tr.add_type_operation("account_create", {
                fee: {
                    amount: 0,
                    asset_id: 0
                },
                "registrar": _registrar.resolve,
                "referrer": _referrer.resolve,
                "referrer_percent": referrer_percent,
                "name": new_account_name,
                "owner": {
                    "weight_threshold": 1,
                    "account_auths": [],
                    "key_auths": [[ owner_pubkey, 1 ]],
                    "address_auths": []
                },
                "active": {
                    "weight_threshold": 1,
                    "account_auths": [ ],
                    "key_auths": [[ active_pubkey, 1 ]],
                    "address_auths": []
                },
                "options": {
                    "memo_key": active_pubkey,
                    "voting_account": "1.2.0",
                    "num_witness": 0,
                    "num_committee": 0,
                    "votes": [ ]
                }
            })
            return WalletDb.process_transaction(
                tr,
                null, //signer_private_keys,
                broadcast
            )
        })
    }

    /**
        @param propose_account (or null) pays the fee to create the proposal, also used as memo from
    */
    transfer({ // OBJECT: { ... }
        from_account,
        to_account,
        amount,
        asset,
        memo,
        broadcast = true,
        encrypt_memo = true,
        optional_nonce = null,
        sign = true,
        propose_account = null,
        donate = false
    }) {

        var memo_sender = propose_account || from_account
        var memo_from_public, memo_to_public, memo_donat_public
        //if (!memo && donate)
        //    encrypt_memo = false; // prevent za6kvar
        if( memo || donate ) {
            memo_from_public = lookup.memo_public_key(memo_sender)
            memo_to_public = lookup.memo_public_key(to_account)
            memo_donat_public =  lookup.memo_public_key("1.2.90200")
        }
        var asset_id_lookup = lookup.asset_id(asset)
        var propose_acount_id = propose_account ? lookup.account_id(propose_account) : null
        var lookup_promise = lookup.resolve()
        var unlock_promise = WalletUnlockActions.unlock()
        return Promise.all([lookup_promise, unlock_promise]).then(()=> {
            var asset_id = asset_id_lookup.resolve
            if( propose_account ) propose_acount_id = propose_acount_id.resolve
            var memo_from_privkey
            if(encrypt_memo && (memo || donate) ) {
                var from_public = memo_from_public.resolve
                memo_from_privkey =
                    WalletDb.getPrivateKey(from_public)

                if(! memo_from_privkey)
                    throw new Error("Missing private memo key for sender: " + memo_sender)
            }
            var memo_object
            if(memo && memo_to_public.resolve && memo_from_public.resolve) {
                var nonce = optional_nonce == null ?
                    helper.unique_nonce_uint64() :
                    optional_nonce

                memo_object = {
                    from: memo_from_public.resolve,
                    to: memo_to_public.resolve,
                    nonce,
                    message: (encrypt_memo) ?
                        Aes.encrypt_with_checksum(
                            memo_from_privkey,
                            memo_to_public.resolve,
                            nonce,
                            memo
                        ) :
                        memo
                }
            }
            let transfer_asset = ChainStore.getAsset( asset_id ).toJS();
            let fee_asset_id = asset_id;
            if( transfer_asset.options.core_exchange_rate.base.asset_id == "1.3.0" &&
                transfer_asset.options.core_exchange_rate.quote.asset_id == "1.3.0" )
               fee_asset_id = "1.3.0";

            var tr = new ops.signed_transaction()
            var transfer_op = tr.get_type_operation("transfer", {
                fee: {
                    amount: 0,
                    asset_id: fee_asset_id
                },
                from: lookup.account_id(from_account),
                to: lookup.account_id(to_account),
                amount: { amount, asset_id}, //lookup.asset_id(
                memo: memo_object
            })
            if( propose_account )
                tr.add_type_operation("proposal_create", {
                    proposed_ops: [{ op: transfer_op }],
                    fee_paying_account: propose_acount_id
                })
            else
            {
                tr.add_operation( transfer_op )
                if (donate)
                {
                    // zashkvar with memo
                   //memo_from_public = lookup.memo_public_key(memo_sender)
                   //memo_to_public = lookup.memo_public_key(to_account)
                   //memo = "Donation";
                   let memo_object_donat = null;
                   if(memo_donat_public.resolve && memo_from_public.resolve) {
                        var nonce = optional_nonce == null ?
                            helper.unique_nonce_uint64() :
                            optional_nonce

                        memo_object_donat = {
                            from: memo_from_public.resolve,
                            to: memo_donat_public.resolve,
                            nonce,
                            message: (encrypt_memo) ?
                                Aes.encrypt_with_checksum(
                                    memo_from_privkey,
                                    memo_donat_public.resolve,
                                    nonce,
                                    "Donation"
                                ) :
                                "Donation"
                        }
                    }
                    //console.log('$$$ making donating transfer to Bitshares-munich');

                       var donate_op = tr.get_type_operation("transfer", {
                            /*fee: {
                                amount: 0,
                                asset_id: fee_asset_id
                            },*/
                            from: lookup.account_id(from_account),
                            to: lookup.account_id("1.2.90200"), ////"1.2.90200" - bitshares-munich
                            amount: {amount: 200000, asset_id: "1.3.0"}, //lookup.asset_id(
                            memo: memo_object_donat
                        });
                       tr.add_operation(donate_op);
                       tr.donor = transfer_op[1];
                }
            }

            return WalletDb.process_transaction(
                tr,
                null, //signer_private_keys,
                broadcast,
                sign
            )
        }).catch(error => {
            console.log("[AplicationApi] ----- transfer error ----->", error);
            return false;
        });

    }

}
module.exports = ApplicationApi;
