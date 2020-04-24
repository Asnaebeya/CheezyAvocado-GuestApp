import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Header from "./router/Header";
import Welcome from "./router/Welcome";
import SignIn from "./router/SignIn";
import ItemList from "./router/ItemList";
import OrderPage from "./router/OrderPage";
import OrderStatus from "./router/OrderStatus";
import ViewBillPayment from "./router/ViewBillPayment";
import history from "./history";
import "./App.css";
import { Button } from "semantic-ui-react";

const mqtt = require("mqtt");
var options = {
    port: 37267,
    host: "wss://soldier.cloudmqtt.com",
    clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
    username: "vfmquhui",
    password: "yXMUCDc8eoO8",
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: "MQIsdp",
    protocolVersion: 3,
    clean: true,
    encoding: "utf8",
};

export const client = mqtt.connect("wss://soldier.cloudmqtt.com", options);



const App = (props) => {
    return (
        <div>
            {/* <Header /> */}
            {localStorage.token && (
                <Button
                    onClick={() => {
                        localStorage.clear();
                        history.push("/");
                    }}
                    style={{ backgroundColor: "#fff2cb" }}
                ></Button>
            )}
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
