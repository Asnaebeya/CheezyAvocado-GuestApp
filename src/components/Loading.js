import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const Loading = (props) => {
    const { children } = props;

    return (
        <div>
            <Dimmer active={props.status}>
                <Loader>{props.text}</Loader>
            </Dimmer>
            {children}
        </div>
    );
};

export default Loading;
