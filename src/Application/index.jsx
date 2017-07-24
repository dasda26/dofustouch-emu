import React, {Component} from "react";

import GameTab from "../GameTab";

class Application extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
            tabs: 0
        };
    }

    addTab() {
        let tabs = this.state.tabs + 1;
        let activeTab = tabs - 1;

        this.setState({activeTab, tabs});
    }

    removeTab() {
        let tabs = this.state.tabs - 1;
        let activeTab = tabs - 1;

        if (tabs === 0) {
            this.setState({activeTab: 0, tabs: 1});
        } else {
            this.setState({activeTab, tabs});
        }
    }

    switchTab(activeTab) {
        this.setState({activeTab});
    }

    getTabName(index) {
        if (window["game-" + index]) {
            let gameManager = window["game-" + index].gameManager;
            return gameManager && gameManager.playerName ? gameManager.playerName : "Non connecté";
        }
        return "Non connecté";
    }

    componentWillMount() {
        if (this.state.tabs === 0) {
            this.addTab();
        }
    }

    render() {
        console.log(this.state.tabs);
        return (
            <div className="game-tabs">
                <ul className="game-tabs-nav">
                    {[...Array(this.state.tabs)].map((x, index) =>
                        <li key={"game-link-" + index}
                            className={"game-tabs-nav-link " + (this.state.activeTab == index ? "active" : "")}
                            onClick={this.switchTab.bind(this, index)}>
                            {this.getTabName(index)}
                        </li>
                    )}

                    <div className="right">
                        <li className="game-tabs-nav-link add-tab" onClick={this.addTab.bind(this)}>
                            <i className="fa fa-plus"></i>
                        </li>

                        <li className="game-tabs-nav-link remove-tab" onClick={this.removeTab.bind(this)}>
                            <i className="fa fa-trash"></i>
                        </li>
                    </div>
                </ul>

                {[...Array(this.state.tabs)].map((x, index) =>
                    <GameTab key={"game-tab-" + index} active={this.state.activeTab == index} id={index}/>
                )}
            </div>
        )
    }
}

export default Application;
