import React from "react";
import Waiting from "./router-session/Waiting";
import { Container } from "semantic-ui-react";
import "./OrderStatus.css";
import requireAuth from "./HOC/requireAuth";

const OrderStatus = () => {
    return (
        <Container textAlign="center">
            <Waiting />
        </Container>
    );
};

export default requireAuth(OrderStatus);
