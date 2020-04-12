import React, { useState, useEffect } from "react";
import { Button, Item, Container, Header, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { updateOrderedItem, showModal } from "../actions";
import history from "../history";
import RenderCardList from "./RenderCardList";
import "./OrderItemCard.css";
import _ from "lodash";
import Modal from "./Modal";

// ORDERED LIST OF FOOD OR AMENITIES

const OrderedItemCard = (props) => {
    console.log(props);
    const [foods, setFoods] = useState(props.currentOrder);

    useEffect(() => {
        calculateCost();
    }, []);

    useEffect(() => {
        let orderedFoods = foods.filter((food) => food.amount > 0);
        props.updateOrderedItem({
            orderedItems: orderedFoods,
            type: props.type,
        });
    }, [foods]);

    const calculateCost = () => {
        let cost = foods.reduce((prev, cur) => {
            return prev + cur.price * cur.amount;
        }, 0);

        console.log("cost:", cost);
        return cost;
    };

    const increaseHandle = (id) => {
        const foodIndex = foods.findIndex((obj) => obj.id === id);
        const updateObject = {
            ...foods[foodIndex],
            amount: foods[foodIndex].amount + 1,
        };
        setFoods([
            ...foods.slice(0, foodIndex),
            updateObject,
            ...foods.slice(foodIndex + 1),
        ]);

        return;
    };

    const decreaseHandle = (id) => {
        const foodIndex = foods.findIndex((obj) => obj.id === id);
        const updateObject = {
            ...foods[foodIndex],
            amount:
                foods[foodIndex].amount === 0 ? 0 : foods[foodIndex].amount - 1,
        };

        setFoods([
            ...foods.slice(0, foodIndex),
            updateObject,
            ...foods.slice(foodIndex + 1),
        ]);

        return;
    };

    const ConfirmOrderClickHandler = () => {
        // let orderedFoods = foods.filter(food => food.amount > 0);
        if (
            props.currentOrder === undefined ||
            props.currentOrder.length === 0
        ) {
            // array empty or does not exist
            props.showModal(true);
        } else {
            // props.updateOrderedItem({ orderedItems: [], type: "" });
            // history.push("/status");
            console.log("send request to server ");
        }

        // update history
        // props.updateOrderedItem(orderedFoods);
        // history.push("/status");
    };

    return (
        <div>
            {/* <Modal
                HeaderIcon="x"
                modal={modal}
                setModal={setModal}
                title="Order Failed"
                description="Please order at least 1 item"
                colorButton="green"
                ButtonIconName="checkmark"
                TextOnButton="Cancel"
            /> */}
            <Modal
                HeaderIcon="x"
                modal={props.modalStatus}
                title="Order Failed"
                description="Please order at least 1 item"
                colorButton="green"
                ButtonIconName="checkmark"
                TextOnButton="Cancel"
            />

            <br />

            <Container style={{ marginTop: "1em" }}>
                <Item.Group unstackable={true}>
                    <RenderCardList
                        foods={foods}
                        increaseHandle={increaseHandle}
                        decreaseHandle={decreaseHandle}
                        type={props.type}
                    />
                </Item.Group>
                <div className="order-content">
                    {props.type === "food" ? (
                        <div>
                            <Header sub>Price</Header>
                            <span>{calculateCost()}฿</span>
                        </div>
                    ) : (
                        <span></span>
                    )}

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

const mapStatetoProps = (state) => {
    return {
        currentOrder: state.order.currentOrder.orderedItems,
        type: state.order.currentOrder.type,
        modalStatus: state.modal.modalStatus,
    };
};

export default connect(mapStatetoProps, { updateOrderedItem, showModal })(
    OrderedItemCard
);

// const ConfirmOrderClickHandler = () => {
//     // let orderedFoods = foods.filter(food => food.amount > 0);
//     // update history
//     // props.updateOrderedItem(orderedFoods);
//     // history.push("/status");
// };
