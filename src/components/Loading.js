import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const Loading = props => {
    const { children } = props;

    return (
        <div>
            <Segment>
                <Dimmer active={props.status}>
                    <Loader>{props.text}</Loader>
                </Dimmer>
                {children}
            </Segment>
        </div>
    );
};

export default Loading;
