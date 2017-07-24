import React, {Component} from "react";

class GameTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <iframe
                className={"game-tabs-pane" + (this.props.active ? "" : " hide")}
                name={"game-" + this.props.id}
                height="600px"
                src="./game.html">
            </iframe>
        )
    }
}

export default GameTab;
