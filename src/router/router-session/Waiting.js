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
    port: 37267,
    host: "wss://soldier.cloudmqtt.com",
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

const client = mqtt.connect("wss://soldier.cloudmqtt.com", options);
client.subscribe("orderStatus");
client.subscribe("lockerIsOpen");
client.subscribe("lockerIsClosed");

const statusArr = [
    "Wait",
    "Accepted",
    "Preparing",
    "OntheWay",
    "Arrived",
    "End",
];

const charPosesDefaults = {
    exit: {
        y: 3,
        opacity: 0,
        delay: ({ charIndex }) => charIndex * 60,
    },
    enter: {
        y: 0,
        opacity: 1,
        delay: ({ charIndex }) => charIndex * 60,
    },
};

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
    let { status } = props;
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
        case "approved":
            return (
                <MessageWithAnimation
                    title="Your order is accepted! "
                    loading="..."
                    animation={props.animation}
                    charSpeed={60}
                />
            );

        case "on the way":
            return (
                <MessageWithAnimation
                    title="Avocabot is on the way to you!"
                    loading="..."
                    animation={props.animation}
                    charSpeed={60}
                />
            );

        case "arrived":
            return (
                <>
                    <Header as="h2" icon textAlign="center">
                        <Header.Content style={trueCenterText}>
                            Your order has arrived!
                            <Header.Subheader>
                                Please pick up at the door
                            </Header.Subheader>
                        </Header.Content>
                        {props.showButton === 2 && (
                            <Header.Content
                                as={SplitText}
                                initialPose="exit"
                                pose={props.animation ? "enter" : "exit"}
                                charPoses={charPosesDefaults}
                            >
                                ...
                            </Header.Content>
                        )}
                    </Header>

                    {props.showButton === 1 && (
                        <Button onClick={() => props.openAvocabot()}>
                            Open Avocabot
                        </Button>
                    )}
                    {props.showButton === 3 && (
                        <Button onClick={() => props.closeAvocabot()}>
                            Close Avocabot
                        </Button>
                    )}
                </>
            );
        case "end":
            return (
                <>
                    <Header as="h2" icon textAlign="center">
                        <Header.Content style={trueCenterText}>
                            Thank you!
                        </Header.Content>
                    </Header>
                    <Button
                        style={{ marginRight: "5vw" }}
                        onClick={() => {
                            props.setPageStatus("");
                            history.push("/bill");
                        }}
                    >
                        View Bill Payment
                    </Button>
                    <br />
                    <br />

                    <Button
                        style={{ marginRight: "5vw" }}
                        onClick={() => {
                            props.setPageStatus("");
                            history.push("/welcome");
                        }}
                    >
                        Home
                    </Button>
                </>
            );
        default:
            return <div>Error</div>;
    }
};

const Waiting = (props) => {
    const [animation, setAnimation] = useState(false);
    const { pageStatus } = props;
    const [showButton, setShowButton] = useState(1);

    client.on("message", (topic, message) => {
        var note;
        if (topic === "orderStatus") {
            note = message.toString();
            console.log(note);
            if (note === "approved") {
                props.setPageStatus(note);
            }
            if (note === "on the way") {
                props.setPageStatus(note);
            }
            if (note === "arrived") {
                props.setPageStatus(note);
            }
        }

        if (topic === "lockerIsOpen" && pageStatus === "arrived") {
            setShowButton(3);
        }
        if (topic === "lockerIsClosed" && pageStatus === "arrived") {
            props.showLoading(false);
            props.setPageStatus("end");
        }
    });

    useEffect(() => {
        setInterval(() => {
            setAnimation((prev) => !prev);
        }, 1200); //1200
    }, []);

    useEffect(() => {}, [pageStatus]);

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

    const openAvocabot = async () => {
        props.showLoading(true);
        // const response = await api.get(`/guest/openLocker`);

        const response = await setTimeout(() => {
            return 10;
        }, 2000);
        props.showLoading(false);
        setShowButton(2);
    };

    const closeAvocabot = async () => {
        props.showLoading(true);
        // const response = await api.get(`/guest/returnRobot`);
        const response = await setTimeout(() => {
            return 10;
        }, 2000);
    };

    return (
        <Loading status={props.isLoading} text="Loading...">
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
                closeAvocabot={closeAvocabot}
                orderId={props.orderId}
                cancelOrder={cancelOrder}
                showButton={showButton}
                setPageStatus={props.setPageStatus}
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
