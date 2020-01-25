import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// COMPONENTS
import App from "./components/App";

// ADDITIONAL INTERNAL IMPORTS
import store from "./store";
import "./ast/style.css";
import * as serviceWorker from "./ast/serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
// serviceWorker.unregister();
