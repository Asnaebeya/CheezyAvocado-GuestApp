import React from "react";
import OrderedItemCard from "../components/OrderedItemCard";
import { Header, Icon, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from "lodash";
import history from "../history";

const OrderPage = props => {
    const renderHeader = () => {
        if (props.type === "food") {
            return (
                <Header as="h2">
                    <Icon name="food" />
                    <Header.Content>{_.capitalize(props.type)}</Header.Content>
                </Header>
            );
        } else if (props.type === "amenity") {
            return (
                <Header as="h2">
                    <Icon name="bathtub" />
                    <Header.Content>{_.capitalize(props.type)}</Header.Content>
                </Header>
            );
        }
        return;
    };

    const BackButtonCLickHandler = () => {
        if (props.type === "food") {
            history.push("/list/food");
        } else {
            history.push("/list/amenity");
        }
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
            {renderHeader()}
            <OrderedItemCard />
        </div>
    );
};
const mapStateToProps = state => {
    return {
        type: state.order.currentOrder.type
    };
};

export default connect(mapStateToProps)(OrderPage);
