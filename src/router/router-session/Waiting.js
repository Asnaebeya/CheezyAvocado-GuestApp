import React, { useState, useEffect } from "react";
import { Image, Header, Button } from "semantic-ui-react";
import posed from "react-pose";
import SplitText from "react-pose-text";

const statusArr = [
    "Wait",
    "Accepted",
    "Preparing",
    "OntheWay",
    "Arrived",
    "End"
];

const trueCenterText = { paddingRight: "5vw" };

const MessageWithAnimation = props => {
    const charPoses = {
        exit: {
            y: 3,
            opacity: 0,
            delay: ({ charIndex }) => charIndex * props.charSpeed
        },
        enter: {
            y: 0,
            opacity: 1,
            delay: ({ charIndex }) => charIndex * props.charSpeed
        }
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

const RenderStatus = props => {
    let status = statusArr[props.status];
    switch (status) {
        case "Wait":
            return (
                <MessageWithAnimation
                    title="Wait for confirmation"
                    loading="..."
                    animation={props.animation}
                    charSpeed={60}
                />
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
                        onClick={() => props.setOpenAvocabot(prev => !prev)}
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

export default () => {
    const [animation, setAnimation] = useState(false);
    const [status, setStatus] = useState(5);
    const [openAvocabot, setOpenAvocabot] = useState(false);

    useEffect(() => {
        setInterval(() => {
            setAnimation(prev => !prev);
        }, 1200); //1200

        let timer = setInterval(() => {
            setStatus(prev => prev + 1);
        }, 5000); //5000
    }, []);

    return (
        <>
            <Image
                src="/cheezyAvocado2.png"
                size="medium"
                centered
                style={{ marginTop: "11em", paddingRight: "2vw" }}
            />
            <RenderStatus
                status={status}
                animation={animation}
                openAvocabot={openAvocabot}
                setOpenAvocabot={setOpenAvocabot}
            />
        </>
    );
};
