import React from "react";
import Waiting from "./router-session/Waiting";
import { Container } from "semantic-ui-react";
import "./OrderStatus.css";

const OrderStatus = () => {
    return (
        <Container textAlign="center">
            <Waiting />
        </Container>
    );
};

export default OrderStatus;
