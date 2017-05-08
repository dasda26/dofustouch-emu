import React from "react"

export default class GamePane extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const webview = document.getElementById("game-" + this.props.id);
        webview.addEventListener("dom-ready", () => {
            webview.openDevTools();
        });

        function resizeWebview() {
            webview.style.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            webview.style.height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - parseInt(window.getComputedStyle(document.querySelector(".game-tabs-nav")).height.replace("px", ""));
        }

        window.addEventListener("resize", resizeWebview);
        resizeWebview();
    }

    render() {
        return (
            <webview
                is
                class={"game-tabs-pane " + (this.props.active ? "" : "hide")}
                id={"game-" + this.props.id}
                src="./game.html"
                useragent="Mozilla/5.0 (Linux; Android 6.0; FEVER Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36"
                disablewebsecurity
                nodeintegration
                autoresize
                allowpopups>
            </webview>
        )
    }
}
