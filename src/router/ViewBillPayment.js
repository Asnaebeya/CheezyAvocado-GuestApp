import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Container, List, Button } from "semantic-ui-react";
import history from "../history";
import { Link } from "react-router-dom";
const ORDER_HISTORY = [
    {
        id: "0001",
        order: [
            { id: "0001", name: "Fried Chicken", price: 100, amount: 2 },
            { id: "0002", name: "Pizza Hut", price: 20, amount: 1 },
            { id: "0003", name: "Noodle", price: 150, amount: 1 }
        ],
        cost: 370
    },
    {
        id: "0002",
        order: [
            { id: "0001", name: "Fried Chicken", price: 100, amount: 1 },
            { id: "0003", name: "Noodle", price: 150, amount: 1 }
        ],
        cost: 250
    },
    {
        id: "0003",
        order: [{ id: "0001", name: "Fried Chicken", price: 100, amount: 1 }],
        cost: 100
    },
    {
        id: "0004",
        order: [
            { id: "0002", name: "Shampoo", price: 0, amount: 1 },
            { id: "0003", name: "Soap", price: 0, amount: 2 }
        ],
        cost: 0
    }
];

const ViewBillPayment = () => {
    const ListofAttribute = orderItem => {
        return orderItem.map(item => {
            return (
                <List.Content>
                    {item.name} X{item.amount}
                    <span style={{ float: "right" }}>
                        {" "}
                        {item.amount * item.price}฿{" "}
                    </span>
                </List.Content>
            );
        });
    };
    const ShowList = () => {
        return ORDER_HISTORY.map(order => {
            return (
                <List.Item key={order.id} className="ui segment item">
                    <List.Header as={"h3"}>Order: {order.id}</List.Header>
                    {ListofAttribute(order.order)}
                    <List.Content
                        style={{
                            paddingBottom: "2em",
                            paddingTop: "0.15em",
                            borderTop: `1px solid rgba(100,100, 100) `
                        }}
                    >
                        <span style={{ float: "right", marginButton: "5em" }}>
                            Cost: {order.cost}฿
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
                    style={{ margin: "1em 2em 0 0" }}
                    circular
                    icon="angle left"
                    floated="left"
                    to={"/welcome"}
                />
                <br />
                <br />

                {ShowList()}
                <div style={{ float: "right", marginRight: "1em" }}>
                    Total Cost: {calculateCost()}฿
                </div>
            </Container>
        </div>
    );
};

export default ViewBillPayment;

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
