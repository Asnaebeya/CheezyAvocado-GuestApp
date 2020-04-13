import React, { useState, useEffect, createRef } from "react";
import {
    Button,
    Icon,
    Image,
    Item,
    Header,
    Placeholder,
    Container,
    Dropdown,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { updateOrderedItem, loginRefresh } from "../actions";
import api from "../api/api";
import history from "../history";
import RenderCardList from "./RenderCardList";
import "./OrderItemCard.css";

// LIST OF ITEMS LIKE FOOD AND AMENITIES

//         {"foodID": "0001",
//         "foodName": "Prawn Pad Thai",
//         "price": 150,
//         "foodImage": "url1"
// }
const foodSortOptions = [
    {
        key: "Default",
        text: "Default",
        value: "",
    },
    {
        key: "Name",
        text: "Sort by Name",
        value: "foodName",
    },
    {
        key: "Price",
        text: "Sort by Price",
        value: "foodPrice",
    },
];

const amenitySortOptions = [
    {
        key: "Default",
        text: "Default",
        value: "",
    },
    {
        key: "Name",
        text: "Sort by Name",
        value: "amenityName",
    },
];

const ItemCard = (props) => {
    console.log(props);

    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState("");

    // need to fix this
    
    // useEffect(() => {
    //     let IdOfCurrentOrder = props.currentOrder.map((food) => food.id);
    //     let notContainingArray = foods.filter(
    //         (food) => !IdOfCurrentOrder.includes(food.id)
    //     );
    //     setFoods([...props.currentOrder, ...notContainingArray]);
    //     calculateCost();
    // }, []);

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

    const getItems = async (type) => {
        if (props.token) {
            setLoading(true);
            let response;

            const helperSetFoods = (response) => {
                let usableFoods = response.data.map((obj) => {
                    return {
                        id: obj.foodID,
                        name: obj.foodName,
                        price: obj.price,
                        description: obj.foodDescription,
                        image: obj.foodImage,
                        amount: 0,
                    };
                });
                setLoading(false);
                console.log(usableFoods);
                setFoods(usableFoods);
            };

            const helperSetAmenities = (response) => {
                let usableAmenities = response.data.map((obj) => {
                    return {
                        id: obj.amenityID,
                        name: obj.amenityName,
                        description: obj.amenityDescription,
                        image: obj.amenityIcon,
                        amount: 0,
                    };
                });
                setLoading(false);
                console.log(usableAmenities);
                setFoods(usableAmenities);
            };

            if (type === "food") {
                if (sortBy === "foodPrice") {
                    response = await api.get("/guest/getFoodsByPrice", {
                        headers: {
                            Authorization: `bearer ${props.token}`,
                        },
                    });
                    helperSetFoods(response);
                } else if (sortBy === "foodName") {
                    response = await api.get("/guest/getFoodsByName", {
                        headers: {
                            Authorization: `bearer ${props.token}`,
                        },
                    });
                    helperSetFoods(response);
                } else {
                    response = await api.get("/guest/getFoods", {
                        headers: {
                            Authorization: `bearer ${props.token}`,
                        },
                    });
                    helperSetFoods(response);
                }
            } else {
                if (sortBy === "amenityName") {
                    response = await api.get("/guest/getAmenitiesByName", {
                        headers: {
                            Authorization: `bearer ${props.token}`,
                        },
                    });
                    helperSetAmenities(response);
                } else {
                    response = await api.get("/guest/getAmenities", {
                        headers: {
                            Authorization: `bearer ${props.token}`,
                        },
                    });
                    helperSetAmenities(response);
                }
            }

            setLoading(false);
        }
    };

    useEffect(() => {
        getItems(props.type);
    }, [props.token, sortBy]);

    // useEffect(() => {
    //     let IdOfCurrentOrder = props.currentOrder.map((food) => food.id);
    //     let notContainingArray = foods.filter(
    //         (food) => !IdOfCurrentOrder.includes(food.id)
    //     );
    //     setFoods([...props.currentOrder, ...notContainingArray]);
    //     calculateCost();
    // }, [props.currentOrder, props.token]);

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

    const orderClickHandler = () => {
        let orderedFoods = foods.filter((food) => food.amount > 0);
        console.log({ orderedItems: orderedFoods, type: props.type });
        let payload = { orderedItems: orderedFoods, type: props.type };
        props.updateOrderedItem(payload);

        history.push("/order");
    };

    const conditionalRender = () => {
        if (props.type === "food") {
            return (
                <div>
                    <Header sub>Price</Header>
                    <span>{calculateCost()}฿</span>
                </div>
            );
        } else if (props.type === "amenity") {
            return <span>Free</span>;
        }

        return;
    };

    useEffect(() => {
        console.log(sortBy);
    }, [sortBy]);

    const handleSortByChange = (e, { value }) => {
        setSortBy({ value }.value);
    };

    return (
        <Container style={{ marginTop: "1em" }}>
            {loading ? <p>fetching data...</p> : <div></div>}

            {props.type === "food" ? (
                <Dropdown
                    placeholder="Sort by"
                    fluid
                    selection
                    options={foodSortOptions}
                    onChange={handleSortByChange}
                />
            ) : (
                <Dropdown
                    placeholder="Sort by"
                    fluid
                    selection
                    options={amenitySortOptions}
                    onChange={handleSortByChange}
                />
            )}
            <Item.Group unstackable={true}>
                <RenderCardList
                    foods={foods}
                    increaseHandle={increaseHandle}
                    decreaseHandle={decreaseHandle}
                    type={props.type}
                />
            </Item.Group>
            <div className="order-content">
                {conditionalRender()}

                <Button
                    style={{ marginRight: "1em" }}
                    onClick={() => orderClickHandler()}
                >
                    Order
                </Button>
            </div>
        </Container>
    );
};

const mapStatetoProps = (state) => {
    return {
        currentOrder: state.order.currentOrder.orderedItems,
        token: state.auth.accessToken,
        guestId: state.auth.guestId,
        reservationId: state.auth.reservationId,
    };
};

export default connect(mapStatetoProps, { updateOrderedItem, loginRefresh })(
    ItemCard
);

// return (
//     <Item>
//         {/* <Item.Image size="tiny" src="/images/wireframe/image.png" /> */}
//         {PlaceholderExampleImage()}
//         <Item.Content style={{ margin: "0 0 0 1em" }}>
//             <Item.Header>Arrowhead Valley Camp</Item.Header>
//             <Item.Meta>
//                 <span className="price">$1200</span>
//                 <span className="stay">1 Month</span>
//             </Item.Meta>
//             <Item.Description>
//                 {PlaceholderExampleParagraph()}
//             </Item.Description>
//             <Item.Extra>
//                 <Button
//                     circular
//                     icon="plus"
//                     size=" mini"
//                     color="red"
//                     floated="right"
//                 ></Button>
//                 <Button circular size=" mini" color="green" floated="right">
//                     {1}
//                 </Button>
//                 <Button
//                     circular
//                     icon="minus"
//                     size=" mini"
//                     color="blue"
//                     floated="right"
//                 ></Button>
//             </Item.Extra>
//         </Item.Content>
//     </Item>
// );

// const initialState = () => {
//     if (props.type === "food") {
//         let usableFoods = INITIAL_STATE.foods.map((obj) => {
//             return {
//                 id: obj.foodID,
//                 name: obj.foodName,
//                 price: obj.price,
//                 description: obj.foodDescription,
//                 image: obj.foodImage,
//                 amount: 0,
//             };
//         });
//         return usableFoods;
//     } else if (props.type === "amenity") {
//         let usableAmenities = amenities.map((obj) => {
//             return {
//                 id: obj.amenityID,
//                 name: obj.amenityName,
//                 description: obj.amenityDescription,
//                 image: obj.amenityIcon,
//                 amount: 0,
//             };
//         });
//         return usableAmenities;
//     }
// };
