import React, { useEffect } from "react";
import OrderedItemCard from "../components/OrderedItemCard";
import { Header, Icon, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from "lodash";
import history from "../history";
import Loading from "../components/Loading";

const OrderPage = (props) => {
    useEffect(() => {
        if (props.type === "") {
            history.push("/welcome");
        }
    }, []);

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
        <Loading status={props.isLoading} text="Loading...">
            <Button
                style={{ margin: "0 2em 0 0" }}
                circular
                icon="angle left"
                floated="left"
                onClick={() => BackButtonCLickHandler()}
            />
            {renderHeader()}
            <OrderedItemCard />
        </Loading>
    );
};
const mapStateToProps = (state) => {
    return {
        type: state.order.currentOrder.type,
        isLoading: state.loading.loadingStatus,
    };
};

export default connect(mapStateToProps)(OrderPage);
