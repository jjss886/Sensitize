import React from "react";
import ReactDOM from "react-dom";

// COMPONENTS
import App from "./components/App";

// ADDITIONAL INTERNAL IMPORTS
import "./ast/style.css";
import * as serviceWorker from "./ast/serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();
// serviceWorker.unregister();
