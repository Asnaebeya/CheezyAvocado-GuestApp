import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Container, List, Button, Header } from "semantic-ui-react";
import history from "../history";
import { Link } from "react-router-dom";
import api from "../api/api";
import requireAuth from "./HOC/requireAuth";

const ORDER_HISTORY = [
    {
        id: "0001",
        order: [
            { id: "0001", name: "Fried Chicken", price: 100, amount: 2 },
            { id: "0002", name: "Pizza Hut", price: 20, amount: 1 },
            { id: "0003", name: "Noodle", price: 150, amount: 1 },
        ],
        cost: 370,
    },
    {
        id: "0002",
        order: [
            { id: "0001", name: "Fried Chicken", price: 100, amount: 1 },
            { id: "0003", name: "Noodle", price: 150, amount: 1 },
        ],
        cost: 250,
    },
    {
        id: "0003",
        order: [{ id: "0001", name: "Fried Chicken", price: 100, amount: 1 }],
        cost: 100,
    },
    {
        id: "0004",
        order: [
            { id: "0002", name: "Shampoo", price: 0, amount: 1 },
            { id: "0003", name: "Soap", price: 0, amount: 2 },
        ],
        cost: 0,
    },
];

const ViewBillPayment = (props) => {
    const [totalCost, setTotalCost] = useState(0);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let existingToken = window.localStorage.token;
        if (existingToken) {
            props.loginRefresh({
                accessToken: window.localStorage.token,
                roomNumber: window.localStorage.roomNumber,
                firstName: window.localStorage.firstName,
                lastName: window.localStorage.lastName,
                guestId: window.localStorage.guestId,
                reservationId: window.localStorage.reservationId,
            });
        }
    }, []);

    const fetchData = async (reservationId) => {
        setLoading(true);
        const response = await api.get(
            `/guest/getBillPayments?reservationID=${reservationId}`
        );
        setLoading(false);
        setTotalCost(response.data.totalAmount);
        setOrders(response.data.orders);
        console.log(response.data);
    };

    useEffect(() => {
        if (props.reservationId) {
            fetchData(props.reservationId);
        }
    }, [props.reservationId]);

    const ListofAttribute = (orderItem) => {
        return orderItem.map((item) => {
            return (
                <List.Content key={item.foodName}>
                    {item.foodName} X{item.amount}
                    <span style={{ float: "right" }}>
                        {" "}
                        {item.amount * item.price}฿{" "}
                    </span>
                </List.Content>
            );
        });
    };
    const ShowList = () => {
        return orders.map((order) => {
            return (
                <List.Item key={order.orderID} className="ui segment item">
                    <Header as={"h3"}>
                        Order: {order.orderID}
                        {/* <Header.Subheader>
                            Time: {order.timestamp}
                        </Header.Subheader> */}
                    </Header>
                    {ListofAttribute(order.orders)}
                    <List.Content
                        style={{
                            paddingBottom: "2em",
                            paddingTop: "0.15em",
                            borderTop: `1px solid rgba(100,100, 100) `,
                        }}
                    >
                        <span style={{ float: "right", marginButton: "5em" }}>
                            Cost: {order.totalCost}฿
                        </span>
                    </List.Content>
                </List.Item>
            );
        });
    };

    const calculateCost = () => {
        let cost = ORDER_HISTORY.reduce((prev, cur) => {
            return prev + cur.cost;
        }, 0);
        return cost;
    };

    return (
        <div>
            <Container>
                <Button
                    as={Link}
                    style={{
                        margin: "1em 2em 0 0",
                        color: "#FFDB58",
                        backgroundColor: "#556B2F",
                    }}
                    circular
                    icon="angle left"
                    floated="left"
                    to={"/welcome"}
                />
                <br />
                <br />
                {loading ? <p>fetching data...</p> : <p></p>}

                {orders ? ShowList() : <div></div>}
                <div style={{ float: "right", marginRight: "1em" }}>
                    Total Cost: {totalCost}฿
                </div>
            </Container>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.loading.loadingStatus,
        modalStatus: state.modal.modalStatus,
        token: state.auth.accessToken,
        roomNumber: state.auth.roomNumber,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        guestId: state.auth.guestId,
        reservationId: state.auth.reservationId,
    };
};

export default connect(mapStateToProps, actions)(requireAuth(ViewBillPayment));

// <List.Item className="ui segment item">
// <List.Header>{key}</List.Header>
// <List.Content>{obj.order[0].id}</List.Content>
// <List.Content>A poodle, its pretty basic</List.Content>
// </List.Item>

{
    /* <Segment inverted>
    <List divided inverted relaxed>
      <List.Item>
        <List.Content>
          <List.Header>Snickerdoodle</List.Header>
          An excellent companion
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Poodle</List.Header>A poodle, its pretty basic
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Paulo</List.Header>
          He's also a dog
        </List.Content>
      </List.Item>
    </List>
  </Segment> */
}
