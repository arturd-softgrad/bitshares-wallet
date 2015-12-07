import React from "react"
import Webcam from "./Lib/react-webcam"
import PrivateKey from "ecc/key_private"
import qr from "common/qr-image"
import hash from "common/hash"
import key from "common/key_utils"

class KeyGenComponent extends React.Component {

    render() {
        var privkey = new BrainKeyUi().create()
        var private_key = PrivateKey.fromSeed(privkey || "")
        var wif = private_key.toWif()
        return <div>
            {null/*<QrScan/>*/}
            <hr/>
            <ShowPrivateKey privkey={privkey}/>
            {<QrCode data={wif}/>}
        </div>
    }
    static getComponents() {
        var privkey = new BrainKeyUi().create()
        var private_key = PrivateKey.fromSeed(privkey || "")
        var wif = private_key.toWif()
        return {
            privateKey: wif,
            qr: <QrCode data={wif}/>
        };

    }

}

class BrainKeyUi {

    create(entropy_string = "add mouse entropy...") {
        return key.suggest_brain_key(
            key.browserEntropy() +
            entropy_string
        )
    }
}

class QrScan extends React.Component {

    render() {
        return <div>
            <a className="button" onclick="scanPicture()">SCAN</a>
            <Webcam noAudio/>
        </div>
    }
}

class QrCode extends React.Component {

    render() {
        var svg_string = qr.imageSync(this.props.data, { type: 'svg' })
        return <div>
            <img dangerouslySetInnerHTML={{__html: svg_string}} />
        </div>
    }
}

class ShowPrivateKey extends React.Component {

    render() {
        var private_key = PrivateKey.fromSeed(this.props.privke || "")
        var wif = private_key.toWif()
        return <div>
            <div>Private Key {wif}</div>
        </div>
    }
}


export default KeyGenComponent
