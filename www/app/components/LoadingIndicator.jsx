import React from "react";
const CircularProgress = require('material-ui/lib/circular-progress');

class LoadingIndicator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {progress: 0};
    }

    render() {
        return (
            <CircularProgress mode="indeterminate" />
        );
    }

}

export default LoadingIndicator;
