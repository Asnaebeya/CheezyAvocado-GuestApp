import React from "react";
import ItemCard from "../components/ItemCard";
import history from "../history";
import { Header, Icon, Button } from "semantic-ui-react";
import _ from "lodash";
import { connect } from "react-redux";
import { updateOrderedItem } from "../actions";

const ItemList = props => {
    let type = props.match.params.type;
    console.log(type);

    const checkType = () => {
        if (type === "food" || type === "amenity") {
            return <ItemCard type={type} />;
        } else {
            history.push("/");
        }
    };

    const BackButtonCLickHandler = () => {
        updateOrderedItem({ orderedItems: [], type: "" });
        history.push("/welcome");
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
            <Header as="h2">
                <Icon name={type === "food" ? "food" : "bathtub"} />
                <Header.Content>{_.capitalize(type)}</Header.Content>
            </Header>
            {checkType()}
        </div>
    );
};

export default connect(null, { updateOrderedItem })(ItemList);
