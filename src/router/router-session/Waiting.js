import React, { useState, useEffect } from "react";
import { Image, Header, Button } from "semantic-ui-react";
import posed from "react-pose";
import SplitText from "react-pose-text";
import api from "../../api/api";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Loading from "../../components/Loading";
import history from "../../history";

const mqtt = require("mqtt");
var options = {
    port: 17267,
    host: "mqtt://soldier.cloudmqtt.com",
    clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
    username: "vfmquhui",
    password: "yXMUCDc8eoO8",
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: "MQIsdp",
    protocolVersion: 3,
    clean: true,
    encoding: "utf8",
};
const client = mqtt.connect("mqtt://soldier.cloudmqtt.com", options);
client.subscribe("orderStatus");

const statusArr = [
    "Wait",
    "Accepted",
    "Preparing",
    "OntheWay",
    "Arrived",
    "End",
];

const trueCenterText = { paddingRight: "5vw" };

const MessageWithAnimation = (props) => {
    const charPoses = {
        exit: {
            y: 3,
            opacity: 0,
            delay: ({ charIndex }) => charIndex * props.charSpeed,
        },
        enter: {
            y: 0,
            opacity: 1,
            delay: ({ charIndex }) => charIndex * props.charSpeed,
        },
    };
    return (
        <Header as="h2" icon textAlign="center">
            <Header.Content style={trueCenterText}>
                {props.title}
            </Header.Content>
            <div style={trueCenterText}>
                <Header.Content
                    as={SplitText}
                    initialPose="exit"
                    pose={props.animation ? "enter" : "exit"}
                    charPoses={charPoses}
                >
                    {props.loading}
                </Header.Content>
            </div>
        </Header>
    );
};

const RenderStatus = (props) => {
    let status = props.status;
    switch (status) {
        case "Waiting":
            return (
                <div>
                    <MessageWithAnimation
                        title="Wait for confirmation"
                        loading="..."
                        animation={props.animation}
                        charSpeed={60}
                    />
                    <Button
                        onClick={() => props.cancelOrder(props.orderId)}
                        style={{ marginRight: "5vw" }}
                    >
                        Cancel
                    </Button>
                </div>
            );
        case "Accepted":
            return (
                <MessageWithAnimation
                    title="Your order is accepted!"
                    loading="..."
                    animation={props.animation}
                    charSpeed={60}
                />
            );

        case "Preparing":
            return (
                <MessageWithAnimation
                    title="Preparing your order"
                    loading="..."
                    animation={props.animation}
                    charSpeed={60}
                />
            );
        case "OntheWay":
            return (
                <MessageWithAnimation
                    title="Avocabot is on the way to you!"
                    loading="..."
                    animation={props.animation}
                    charSpeed={60}
                />
            );

        case "Arrived":
            return (
                <>
                    <Header as="h2" icon textAlign="center">
                        <Header.Content style={trueCenterText}>
                            Your order has arrived!
                            <Header.Subheader>
                                Please pick up at the door
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Button
                        onClick={() => props.setOpenAvocabot((prev) => !prev)}
                    >
                        {props.openAvocabot === false
                            ? "Open Avocabot"
                            : "Return Avocabot"}
                    </Button>
                </>
            );
        case "End":
            return (
                <>
                    <Header as="h2" icon textAlign="center">
                        <Header.Content style={trueCenterText}>
                            Thank you!
                        </Header.Content>
                    </Header>
                    <Button style={{ marginRight: "5vw" }}>
                        View Bill Payment
                    </Button>
                    <br />
                    <br />

                    <Button style={{ marginRight: "5vw" }}>Home</Button>
                </>
            );
        default:
            return <div>Error</div>;
    }
};

const Waiting = (props) => {
    const [animation, setAnimation] = useState(false);
    const [openAvocabot, setOpenAvocabot] = useState(false);
    const [mesg, setMesg] = useState("");

    client.on("message", (topic, message) => {
        var note;
        if (topic === "orderStatus") {
            note = message.toString();
            console.log(note);
        }
    });

    useEffect(() => {
        setInterval(() => {
            setAnimation((prev) => !prev);
        }, 1200); //1200

        // let timer = setInterval(() => {
        //     setStatus(prev => prev + 1);
        // }, 5000); //5000
    }, []);

    const cancelOrder = async (orderId) => {
        props.showLoading(true);
        const response = await api.get(`/guest/cancelOrder?orderID=${orderId}`);
        //"the order has been cancelled"
        props.showLoading(false);
        if (response.data === "the order has been cancelled") {
            history.push("/order");
            props.setPageStatus("");
        }
    };

    return (
        <Loading status={props.isLoading} text="Signing in...">
            <Image
                src="/cheezyAvocado2.png"
                size="medium"
                centered
                style={{ marginTop: "11em", paddingRight: "2vw" }}
            />
            <RenderStatus
                status={props.pageStatus}
                animation={animation}
                openAvocabot={openAvocabot}
                orderId={props.orderId}
                setOpenAvocabot={setOpenAvocabot}
                cancelOrder={cancelOrder}
            />
        </Loading>
    );
};

const mapStateToProps = (state) => {
    return {
        orderId: state.order.orderId,
        pageStatus: state.status,
        isLoading: state.loading.loadingStatus,
    };
};

export default connect(mapStateToProps, actions)(Waiting);
