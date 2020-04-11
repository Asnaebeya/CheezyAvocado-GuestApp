import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import requireAuth from "./HOC/requireAuth";
import CardInformation from "../components/CardInformation";
const Welcome = (props) => {
    useEffect(() => {
        let existingToken = window.localStorage.token;
        if (existingToken) {
            props.loginRefresh({
                accessToken: window.localStorage.token,
                roomNumber: window.localStorage.roomNumber,
                firstName: window.localStorage.firstName,
                lastName: window.localStorage.lastName,
                guestId: window.localStorage.guestId,
                reservationId: window.localStorage.reservationId,
            });
        }
    }, []);

    return (
        <div>
            <CardInformation
                firstName={props.firstName}
                lastName={props.lastName}
                roomNumber={props.roomNumber}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        isLoading: state.loading.loadingStatus,
        modalStatus: state.modal.modalStatus,
        token: state.auth.accessToken,
        roomNumber: state.auth.roomNumber,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        guestId: state.auth.guestId,
        reservationId: state.auth.reservationId,
    };
};

export default connect(mapStateToProps, actions)(requireAuth(Welcome));
