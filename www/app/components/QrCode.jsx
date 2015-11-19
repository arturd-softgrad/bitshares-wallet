import React from "react";
import qr from "common/qr-image";

class QrCode extends React.Component {

	constructor(props) {
      super(props);
    }

    render() {
        var svg_string = qr.imageSync(this.props.data, { type: 'svg' })
        return <div>
            <img dangerouslySetInnerHTML={{__html: svg_string}} />
        </div>
    }
}