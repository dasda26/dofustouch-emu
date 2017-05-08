import React from "react";
import GamePane from "../GamePane/GamePane";

export default class GameTabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
            tabs: []
        };
    }

    componentDidMount() {
        this.addTab();
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

    removeTab(tab) {

    }

    switchTab(activeTab) {
        this.setState({activeTab});
    }

    render() {
        return (
            <div className="game-tabs">
                <ul className="game-tabs-nav">
                    {this.state.tabs.map((element, index) =>
                        <li className="game-tabs-nav-btn" onClick={this.switchTab.bind(this, index)}>
                            <a>{element.online ? element.characterName : "Non connecté"}</a>
                        </li>
                    )}
                    <li className="game-tabs-nav-btn" onClick={this.addTab.bind(this)}>
                        <a>ajouter un onglet</a>
                    </li>
                </ul>

                {this.state.tabs.map((element, index) => <GamePane id={index} active={this.state.activeTab == index}/>)}
            </div>
        )
    }
}
