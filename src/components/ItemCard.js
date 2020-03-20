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

const PlaceholderExampleParagraph = () => (
    <Placeholder>
        <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
        </Placeholder.Paragraph>
    </Placeholder>
);
const PlaceholderExampleImage = () => (
    <Placeholder style={{ height: "150px", width: "150px" }}>
        <Placeholder.Image />
    </Placeholder>
);

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
            description: "I like to eat banana",

            foodImage:
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/20190503-delish-pineapple-baked-salmon-horizontal-ehg-450-1557771120.jpg?crop=0.669xw:1.00xh;0.173xw,0&resize=640:*"
        },
        {
            foodID: "0003",
            foodName: "Noodle",
            price: 150,
            description: "Batman is like superman",

            foodImage:
                "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/322/322284/berries-are-good-food-for-high-blood-pressure.jpg?w=1155&h=1541"
        },
        {
            foodID: "0004",
            foodName: "French Fries",
            price: 40,
            description: "Burger King is my ronaldoo",

            foodImage:
                "https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg"
        }
    ]
};

const ItemCard = props => {
    let usableFoods = INITIAL_STATE.foods.map(food => {
        return { ...food, amount: 0 };
    });
    console.log(usableFoods);
    const [foods, setFoods] = useState(usableFoods);

    useEffect(() => {
        let IdOfCurrentOrder = props.currentOrder.map(food => food.foodID);
        let notContainingArray = usableFoods.filter(
            food => !IdOfCurrentOrder.includes(food.foodID)
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

    const orderClickHandler = () => {
        let orderedFoods = foods.filter(food => food.amount > 0);
        console.log(orderedFoods);
        props.updateOrderedItem(orderedFoods);
        history.push("/order");
    };

    return (
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
        currentOrder: state.order.currentOrder
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
