import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";

import Root from "./Root";
import App from "./App";
import history from "./history";

ReactDOM.render(
    <Root>
        <Router history={history}>
            <Route path="/" component={App} />
        </Router>
    </Root>,

    document.querySelector("#root")
);
