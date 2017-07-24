import React, {Component} from "react";
import GameManager from "../GameManager";

class Application extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
            lastId: 0,
            tabs: [{
                id: 0,
                name: "Non connecté",
                manager: null
            }]
        };
    }

    addTab() {
        let tabs = [...this.state.tabs];
        tabs.push({
            id: ++this.state.lastId,
            name: "Non connecté",
            manager: null
        });
        let activeTab = this.state.lastId;

        this.setState({activeTab, tabs});
    }

    removeTab() {
        let tabs = this.state.tabs.filter((tab, index) => index !== this.state.activeTab);
        let activeTab = 0;

        this.setState({activeTab, tabs});
    }

    switchTab(activeTab) {
        this.setState({activeTab});
    }

    loadGame(tab) {
        let manager = tab.manager = new GameManager(window["game-" + tab.id], tab, this.forceUpdate.bind(this));
        manager.initializeDomListeners();
        manager.initializeDofusListeners();
    }

    render() {
        return (
            <div>
                <ul className="navigation">
                    {this.state.tabs.map((tab, index) =>
                        <li key={"game-link-" + tab.id}
                            className={this.state.activeTab === tab.id ? "active" : ""}
                            onClick={this.switchTab.bind(this, tab.id)}>
                            {tab.name}
                        </li>
                    )}

                    <div className="right">
                        <li className="add-tab" onClick={this.addTab.bind(this)}>
                            <i className="fa fa-plus"></i>
                        </li>

                        <li className="remove-tab" onClick={this.removeTab.bind(this)}>
                            <i className="fa fa-trash"></i>
                        </li>
                    </div>
                </ul>

                {this.state.tabs.map((tab, index) =>
                    <div key={"game-tab-" + tab.id}
                         className={"game-tab" + (this.state.activeTab === tab.id ? "" : " hide")}>
                        <iframe key={"game-" + tab.id}
                                ref={"game-" + tab.id}
                                name={"game-" + tab.id}
                                src="./game.html"
                                onLoad={this.loadGame.bind(this, tab)}/>
                    </div>
                )}
            </div>
        )
    }
}

export default Application;
