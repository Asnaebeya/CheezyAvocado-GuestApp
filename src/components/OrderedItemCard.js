import React, { useState, useEffect } from "react";
import { Button, Item, Container, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { updateOrderedItem } from "../actions";
import history from "../history";
import RenderCardList from "./RenderCardList";
import "./OrderItemCard.css";

const OrderedItemCard = props => {
    const [foods, setFoods] = useState(props.currentOrder);

    useEffect(() => {
        calculateCost();
    }, []);

    useEffect(() => {
        let orderedFoods = foods.filter(food => food.amount > 0);
        props.updateOrderedItem(orderedFoods);
    }, [foods]);

    const calculateCost = () => {
        let cost = foods.reduce((prev, cur) => {
            return prev + cur.price * cur.amount;
        }, 0);

        console.log("cost:", cost);
        return cost;
    };

    const increaseHandle = foodID => {
        const foodIndex = foods.findIndex(obj => obj.foodID === foodID);
        const updateObject = {
            ...foods[foodIndex],
            amount: foods[foodIndex].amount + 1
        };
        setFoods([
            ...foods.slice(0, foodIndex),
            updateObject,
            ...foods.slice(foodIndex + 1)
        ]);

        return;
    };

    const decreaseHandle = foodID => {
        const foodIndex = foods.findIndex(obj => obj.foodID === foodID);
        const updateObject = {
            ...foods[foodIndex],
            amount:
                foods[foodIndex].amount === 0 ? 0 : foods[foodIndex].amount - 1
        };

        setFoods([
            ...foods.slice(0, foodIndex),
            updateObject,
            ...foods.slice(foodIndex + 1)
        ]);

        return;
    };

    const ConfirmOrderClickHandler = () => {
        // let orderedFoods = foods.filter(food => food.amount > 0);
        console.log("send request to server ");
        // update history
        // props.updateOrderedItem(orderedFoods);
        // history.push("/status");
    };

    const BackButtonCLickHandler = () => {
        history.push("/list");
    };

    return (
        <div>
            <Button
                style={{ margin: "0 2em 0 0" }}
                circular
                icon="angle left"
                floated="left"
                onClick={() => BackButtonCLickHandler()}
            />

            <br />

            <Container style={{ marginTop: "3em" }}>
                <Item.Group unstackable={true}>
                    <RenderCardList
                        foods={foods}
                        increaseHandle={increaseHandle}
                        decreaseHandle={decreaseHandle}
                    />
                </Item.Group>
                <div className="order-content">
                    <div>
                        <Header sub>Price</Header>
                        <span>{calculateCost()}฿</span>
                    </div>

                    <Button
                        style={{ marginRight: "1em" }}
                        onClick={() => ConfirmOrderClickHandler()}
                    >
                        Confirm Your Order
                    </Button>
                </div>
            </Container>
        </div>
    );
};

const mapStatetoProps = state => {
    return {
        currentOrder: state.order.currentOrder
    };
};

export default connect(mapStatetoProps, { updateOrderedItem })(OrderedItemCard);
