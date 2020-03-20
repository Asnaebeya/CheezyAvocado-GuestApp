import React, { useState } from "react";
import { Button, Icon, Image, Item, Segment } from "semantic-ui-react";
import "./RenderCardList.css";

export default props => {
    return props.foods.map(food => {
        return (
            <Item key={food.foodID} className="ui segment item">
                <Item.Image
                    style={{ height: 150, width: 150 }}
                    src={food.foodImage}
                />

                <Item.Content style={{ margin: "0 0 0 1em" }}>
                    <Item.Header>{food.foodName}</Item.Header>
                    <Item.Meta>
                        <span className="price">{`${food.price}฿`}</span>
                    </Item.Meta>
                    <Item.Description>{food.description}</Item.Description>
                    <Item.Extra>
                        <Button
                            circular
                            icon="plus"
                            size="mini"
                            color="red"
                            floated="right"
                            onClick={() => props.increaseHandle(food.foodID)}
                        ></Button>
                        <Button
                            circular
                            size="mini"
                            color="green"
                            floated="right"
                        >
                            {food.amount}
                        </Button>
                        <Button
                            circular
                            icon="minus"
                            size="mini"
                            color="blue"
                            floated="right"
                            onClick={() => props.decreaseHandle(food.foodID)}
                        ></Button>
                    </Item.Extra>
                </Item.Content>
            </Item>
        );
    });
};
