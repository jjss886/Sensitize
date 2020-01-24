import React from "react";
import ReactDOM from "react-dom";
import "./ast/index.css";
import "./ast/style.css";
import * as serviceWorker from "./ast/serviceWorker";

// COMPONENTS
// eslint-disable-next-line
import App from "./components/App";
// eslint-disable-next-line
import AppScatter from "./components/AppScatter";

// ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<AppScatter />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
