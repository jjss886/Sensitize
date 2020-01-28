import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory, createBrowserHistory } from "history";

// COMPONENTS
import App from "./components/App";

// ADDITIONAL INTERNAL IMPORTS
import store from "./store";
import "./ast/style.css";
import * as serviceWorker from "./ast/serviceWorker";

const history =
  process.env.NODE_ENV === "test"
    ? createMemoryHistory()
    : createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// serviceWorker.register();
serviceWorker.unregister();
