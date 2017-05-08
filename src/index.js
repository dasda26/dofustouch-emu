import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import jQuery from "jquery";

import "font-awesome/css/font-awesome.css";
import "./index.css";

window.$ = window.jQuery = jQuery;

$(document).ready(() => {
    ReactDOM.render(<App/>, document.getElementById("root"));
});
