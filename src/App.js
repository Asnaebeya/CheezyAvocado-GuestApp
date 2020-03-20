import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Header from "./router/Header";
import Welcome from "./router/Welcome";
import SignIn from "./router/SignIn";
import ItemList from "./router/ItemList";
import OrderPage from "./router/OrderPage";
import OrderStatus from "./router/OrderStatus";

const App = props => {
    return (
        <div>
            <Header />
            <Route path="/" exact component={SignIn} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/list" component={ItemList} />
            <Route path="/order" component={OrderPage} />
            <Route path="/status" component={OrderStatus} />
        </div>
    );
};

export default App;
