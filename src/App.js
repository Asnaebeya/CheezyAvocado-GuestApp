import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Header from "./router/Header";
import Welcome from "./router/Welcome";
import SignIn from "./router/SignIn";
import ItemList from "./router/ItemList";
import OrderPage from "./router/OrderPage";
import OrderStatus from "./router/OrderStatus";
import ViewBillPayment from "./router/ViewBillPayment";

const App = (props) => {
    return (
        <div>
            {/* <Header /> */}
            <Switch>
                <Route path="/" exact component={SignIn} />
                <Route path="/welcome" component={Welcome} />
                <Route path="/list/:type" component={ItemList} />
                <Route path="/order" component={OrderPage} />
                <Route path="/status" component={OrderStatus} />
                <Route path="/bill" component={ViewBillPayment} />
            </Switch>
        </div>
    );
};

export default App;
