import React, { useState, useEffect } from "react";
import {
    Button,
    Item,
    Container,
    Header,
    Icon,
    Modal as ComponentModal,
} from "semantic-ui-react";
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
    const [totalAmount, setTotalAmount] = useState(0);
    const [modalMaximum, setModalMaximum] = useState(false);

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

    const calculateAmount = () => {
        let amount = foods.reduce((prev, cur) => {
            return prev + cur.amount;
        }, 0);
        console.log("cost:", amount);
        setTotalAmount(amount);
    };

    useEffect(() => {
        calculateCost();
        calculateAmount();
    }, []);

    useEffect(() => {
        let orderedFoods = foods.filter((food) => food.amount > 0);
        props.updateOrderedItem({
            orderedItems: orderedFoods,
            type: props.type,
        });
        calculateCost();
        calculateAmount();
    }, [foods]);

    const calculateCost = () => {
        let cost = foods.reduce((prev, cur) => {
            return prev + cur.price * cur.amount;
        }, 0);

        console.log("cost:", cost);
        setTotalCost(cost);
    };

    const increaseHandle = (id) => {
        if (totalAmount === 5) {
            setModalMaximum(true);
        }
        const foodIndex = foods.findIndex((obj) => obj.id === id);
        const updateObject = {
            ...foods[foodIndex],
            amount:
                totalAmount <= 4
                    ? foods[foodIndex].amount + 1
                    : foods[foodIndex].amount,
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
        localStorage.setItem("status", "pending");
        history.push("/status");
    };

    return (
        <div>
            <ComponentModal
                open={modalMaximum}
                size="small"
                onClose={() => setModalMaximum(false)}
            >
                <Header icon="x" content="Order Failed" />
                <ComponentModal.Content>
                    <p>Please select at most 5 items</p>
                </ComponentModal.Content>
                <ComponentModal.Actions>
                    <Button
                        color="green"
                        inverted
                        onClick={() => setModalMaximum(false)}
                    >
                        <Icon name="checkmark" /> Cancel
                    </Button>
                </ComponentModal.Actions>
            </ComponentModal>

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
                {props.currentOrder.length === 0 && (
                    <Header style={{ textAlign: "center" }}>
                        No order in cart
                    </Header>
                )}
                <div
                    style={{
                        height: "33em",
                        overflowY: "scroll",
                        marginTop: "0.5em",
                        marginBottom: "0.25em",
                    }}
                >
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
                    {totalAmount <= 5 ? (
                        <Button
                            style={{
                                color: "#FFDB58",
                                backgroundColor: "#556B2F",
                            }}
                            onClick={() => ConfirmOrderClickHandler()}
                        >
                            Confirm Your Order
                        </Button>
                    ) : (
                        <div>
                            <Button
                                disabled
                                style={{
                                    color: "#FFDB58",
                                    backgroundColor: "#556B2F",
                                    marginLeft: "0.33rem",
                                }}
                            >
                                Confirm Your Order
                            </Button>

                            <p
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                Please order at most 5 items
                            </p>
                        </div>
                    )}
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
