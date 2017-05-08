import React, {Component} from "react"

export default class GamePane extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const webview = window.jQuery("#game-" + this.props.id);
        const body = window.jQuery("body");
        const webdom = document.getElementById("game-" + this.props.id);

        webdom.addEventListener("dom-ready", () => {
            function resizeWebview() {
                webview.attr({
                    width: body.width(),
                    height: body.height() - window.jQuery(".game-tabs-nav").height()
                });
                webview.height(body.height() - window.jQuery(".game-tabs-nav").height());
                webdom.send("resize");
            }

            window.addEventListener("resize", resizeWebview);
            resizeWebview();
            webdom.openDevTools();
        });
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
                allowpopups>
            </webview>
        )
    }
}
