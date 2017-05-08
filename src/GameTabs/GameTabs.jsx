import React, {Component} from "react";
import GamePane from "../GamePane/GamePane";

export default class GameTabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
            tabs: []
        };
    }

    addTab() {
        let tabs = [...this.state.tabs];
        tabs.push({online: false, characterName: undefined});
        let activeTab = tabs.length - 1;

        this.setState({
            activeTab,
            tabs
        });
    }

    removeTab() {
        let tabs = this.state.tabs.filter((element, index) => index != this.state.activeTab);
        let activeTab = tabs.length - 1;

        this.setState({
            activeTab,
            tabs
        });
    }

    switchTab(activeTab) {
        this.setState({activeTab});
    }

    openSettings() {
        alert("Indisponible pour le moment.");
    }

    render() {
        if (!this.state.tabs.length) {
            this.addTab();
        }

        return (
            <div className="game-tabs">
                <ul className="game-tabs-nav">
                    {this.state.tabs.map((element, index) =>
                        <li key={"game-link-" + index} className={"game-tabs-nav-link " + (this.state.activeTab == index ? "active" : "")} onClick={this.switchTab.bind(this, index)}>
                            {element.online ? element.characterName : "Non connecté"}
                        </li>
                    )}

                    <div className="right">
                        <li className="game-tabs-nav-link add-tab" onClick={this.addTab.bind(this)}>
                            <i className="fa fa-plus"></i>
                        </li>

                        <li className="game-tabs-nav-link remove-tab" onClick={this.removeTab.bind(this)}>
                            <i className="fa fa-trash"></i>
                        </li>

                        <li className="game-tabs-nav-link open-settings" onClick={this.openSettings.bind(this)}>
                            <i className="fa fa-cog"></i>
                        </li>
                    </div>
                </ul>

                {this.state.tabs.map((element, index) =>
                    <GamePane key={"game-content-" + index} id={index} active={this.state.activeTab == index}/>)}
            </div>
        )
    }
}
