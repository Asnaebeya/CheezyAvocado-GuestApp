import React, { useState, useEffect, createRef } from "react";
import {
    Button,
    Icon,
    Image,
    Item,
    Header,
    Placeholder,
    Container
} from "semantic-ui-react";
import { connect } from "react-redux";
import { updateOrderedItem } from "../actions";
import history from "../history";
import RenderCardList from "./RenderCardList";
import "./OrderItemCard.css";

// LIST OF ITEMS LIKE FOOD AND AMENITIES


//         {"foodID": "0001",
//         "foodName": "Prawn Pad Thai",
//         "price": 150,
//         "foodImage": "url1"
// }

const INITIAL_STATE = {
    foods: [
        {
            foodID: "0001",
            foodName: "Fried Chicken",
            price: 100,
            description: "This is a plate with 3 fried chicken nuggets",

            foodImage:
                "https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2019/10/vitaminDfood-1132105308-770x553-650x428.jpg"
        },
        {
            foodID: "0002",
            foodName: "Pizza Hut",
            price: 20,
            description: "I like to eat banana with pizza",

            foodImage:
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/20190503-delish-pineapple-baked-salmon-horizontal-ehg-450-1557771120.jpg?crop=0.669xw:1.00xh;0.173xw,0&resize=640:*"
        },
        {
            foodID: "0003",
            foodName: "Noodle",
            price: 150,
            description: "Better than apples",

            foodImage:
                "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/322/322284/berries-are-good-food-for-high-blood-pressure.jpg?w=1155&h=1541"
        }
        // ,
        // {
        //     foodID: "0004",
        //     foodName: "French Fries",
        //     price: 40,
        //     description: "Burger King is my ronaldoo",

        //     foodImage:
        //         "https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg"
        // }
    ]
};

const amenities = [
    {
        amenityID: "0001",
        amenityName: "Towel",
        amenityIcon: "https://image.flaticon.com/icons/svg/1986/1986380.svg",
        description: "Fluffy like cotton"
    },
    {
        amenityID: "0002",
        amenityName: "Shampoo",
        amenityIcon: "https://image.flaticon.com/icons/svg/1848/1848354.svg",
        description: "Anti Dandruff included"
    },
    {
        amenityID: "0003",
        amenityName: "Soap",
        amenityIcon: "https://image.flaticon.com/icons/svg/2707/2707432.svg",
        description: "Peach smell"
    }
    // ,
    // {
    //     amenityID: "0004",
    //     amenityName: "Toothbrush",
    //     amenityIcon: "https://image.flaticon.com/icons/svg/458/458153.svg",
    //     description: "Batman is like superman"
    // }
];

const ItemCard = props => {
    console.log(props);

    const initialState = () => {
        if (props.type === "food") {
            let usableFoods = INITIAL_STATE.foods.map(obj => {
                return {
                    id: obj.foodID,
                    name: obj.foodName,
                    price: obj.price,
                    description: obj.description,
                    image: obj.foodImage,
                    amount: 0
                };
            });
            return usableFoods;
        } else if (props.type === "amenity") {
            let usableAmenities = amenities.map(obj => {
                return {
                    id: obj.amenityID,
                    name: obj.amenityName,
                    description: obj.description,
                    image: obj.amenityIcon,
                    amount: 0
                };
            });
            return usableAmenities;
        }
    };
    const [foods, setFoods] = useState(initialState());

    useEffect(() => {
        let IdOfCurrentOrder = props.currentOrder.map(food => food.id);
        let notContainingArray = foods.filter(
            food => !IdOfCurrentOrder.includes(food.id)
        );
        setFoods([...props.currentOrder, ...notContainingArray]);
        calculateCost();
    }, []);

    const calculateCost = () => {
        let cost = foods.reduce((prev, cur) => {
            return prev + cur.price * cur.amount;
        }, 0);
        console.log("cost:", cost);
        return cost;
    };

    const increaseHandle = id => {
        const foodIndex = foods.findIndex(obj => obj.id === id);
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

    const decreaseHandle = id => {
        const foodIndex = foods.findIndex(obj => obj.id === id);
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

    const orderClickHandler = () => {
        let orderedFoods = foods.filter(food => food.amount > 0);
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

    return (
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

const mapStatetoProps = state => {
    return {
        currentOrder: state.order.currentOrder.orderedItems
    };
};

export default connect(mapStatetoProps, { updateOrderedItem })(ItemCard);

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
