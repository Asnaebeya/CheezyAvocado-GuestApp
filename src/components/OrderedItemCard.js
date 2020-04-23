import React, { useState, useEffect } from "react";
import { Button, Item, Container, Header, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import {
    updateOrderedItem,
    showModal,
    loginRefresh,
    showLoading,
    setOrderId,
    setPageStatus,
} from "../actions";
import history from "../history";
import RenderCardList from "./RenderCardList";
import "./OrderItemCard.css";
import _ from "lodash";
import Modal from "./Modal";
import api from "../api/api";

// ORDERED LIST OF FOOD OR AMENITIES

// {
//     "department": "food",
//     "reservationID": "00000002",
//     "roomNumber":"102",
//     "order": [
//      {
//       "id":"0001",
//       "amount":"1",
//       "price":"170"
//      },
//      {
//       "id":"0004",
//       "amount":"2",
//       "price": "70"
//      }
//     ],
//     "totalCost" : "310"
//    }

const OrderedItemCard = (props) => {
    console.log(props);
    const [foods, setFoods] = useState(props.currentOrder);
    const [totalCost, setTotalCost] = useState(0);

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

    useEffect(() => {
        calculateCost();
    }, []);

    useEffect(() => {
        let orderedFoods = foods.filter((food) => food.amount > 0);
        props.updateOrderedItem({
            orderedItems: orderedFoods,
            type: props.type,
        });
        calculateCost();
    }, [foods]);

    const calculateCost = () => {
        let cost = foods.reduce((prev, cur) => {
            return prev + cur.price * cur.amount;
        }, 0);

        console.log("cost:", cost);
        setTotalCost(cost);
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

            let data;

            if (props.type === "food") {
                let modifiedOrdersFood = props.currentOrder.map((order) => {
                    return {
                        id: order.id,
                        amount: order.amount,
                        price: order.price,
                    };
                });
                data = {
                    department: props.type,
                    reservationID: props.reservationId,
                    roomNumber: props.roomNumber,
                    order: modifiedOrdersFood,
                    totalCost: totalCost,
                };
            } else {
                let modifiedOrdersAmenity = props.currentOrder.map((order) => {
                    return {
                        id: order.id,
                        amount: order.amount,
                    };
                });
                data = {
                    department: props.type,
                    reservationID: props.reservationId,
                    roomNumber: props.roomNumber,
                    order: modifiedOrdersAmenity,
                };
            }

            postOrder(data);

            console.log("send request to server ");
        }
        // update history
        // props.updateOrderedItem(orderedFoods);
        // history.push("/status");
    };

    const postOrder = async (data) => {
        props.showLoading(true);
        const response = await api.post("/guest/placeOrder", data);
        props.showLoading(false);
        console.log(response.data.orderID);
        props.setOrderId(response.data.orderID);
        localStorage.setItem("orderId", response.data.orderID);
        props.setPageStatus("pending");
        history.push("/status");
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
                <div
                    style={{
                        height: "44em",
                        overflowY: "scroll",
                        marginTop: "0.5em",
                        marginBottom: "0.25em",
                    }}
                >
                    {props.currentOrder.length === 0 && (
                        <Header style={{ textAlign: "center" }}>
                            No order in cart
                        </Header>
                    )}
                    <Item.Group unstackable={true}>
                        <RenderCardList
                            foods={foods}
                            increaseHandle={increaseHandle}
                            decreaseHandle={decreaseHandle}
                            type={props.type}
                        />
                    </Item.Group>
                </div>
                <div className="order-content">
                    {props.type === "food" ? (
                        <div>
                            <Header sub>Price</Header>
                            <span>{totalCost}฿</span>
                        </div>
                    ) : (
                        <span></span>
                    )}

                    <Button
                        style={{
                            color: "#FFDB58",
                            backgroundColor: "#556B2F",
                        }}
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

        isLoading: state.loading.loadingStatus,
        modalStatus: state.modal.modalStatus,
        token: state.auth.accessToken,
        roomNumber: state.auth.roomNumber,
        guestId: state.auth.guestId,
        reservationId: state.auth.reservationId,
    };
};

export default connect(mapStatetoProps, {
    updateOrderedItem,
    showModal,
    loginRefresh,
    showLoading,
    setOrderId,
    setPageStatus,
})(OrderedItemCard);

// const ConfirmOrderClickHandler = () => {
//     // let orderedFoods = foods.filter(food => food.amount > 0);
//     // update history
//     // props.updateOrderedItem(orderedFoods);
//     // history.push("/status");
// };
