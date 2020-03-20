import React, { useRef, useEffect, useCallback } from "react";
import { connect } from "react-redux";

export default ChildComponent => {
    const ComposedComponent = props => {
        let mounted = useRef();

        useEffect(() => {
            shouldNavigateAway();
        }, []);

        useEffect(() => {
            if (!mounted.current) {
                mounted.current = true;
            } else {
                shouldNavigateAway();
            }
        });

        const shouldNavigateAway = useCallback(() => {
            if (!props.authToken) {
                props.history.push("/");
            }
        }, [props.authToken, props.history]);

        return <ChildComponent {...props} />;
    };

    const mapStateToProps = state => {
        return { authToken: state.auth.accessToken };
    };

    return connect(mapStateToProps)(ComposedComponent);
};
