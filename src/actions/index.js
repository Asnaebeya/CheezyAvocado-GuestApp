import api from "../api/api";
import * as actionTypes from "../actions/types";
import axios from "axios";

// export const signin = (formProps, callback) => async dispatch => {
//     try {
//         const response = await itemsAPI.post("/", formProps);
//         dispatch({ type: actionTypes.AUTH_USER, payload: response.data });
//         localStorage.setItem("token", response.data.token);

//     }
// };

export const showModal = (ModalStatus) => {
    return { type: actionTypes.SHOW_MODAL, payload: ModalStatus };
};

const loading = (loadingStatus) => {
    return { type: actionTypes.LOADING, payload: loadingStatus };
};

export const loginRefresh = (userData) => {
    return {
        type: actionTypes.AUTH_USER,
        payload: userData,
    };
};

export const signin = (formProps, callback) => async (dispatch) => {
    try {
        dispatch(loading(true));
        const response = await api.post("/authen/guest", formProps);

        if (response.data === "Incorrect data") {
            dispatch(loading(false));
            dispatch(showModal(true));
            dispatch({
                type: actionTypes.AUTH_ERROR,
                payload: {
                    accessToken: response.data.accessToken,
                    firstName: response.data.guestFirstName,
                    lastName: response.data.guestLastName,
                    roomNumber: response.data.roomNumber,
                    guestId: response.data.guestID,
                    reservationId: response.data.reservationID,
                },
            });
            return;
        }
        dispatch({
            type: actionTypes.AUTH_USER,
            payload: response.data,
        });
        dispatch(loading(false));

        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("firstName", response.data.guestFirstName);
        localStorage.setItem("lastName", response.data.guestLastName);
        localStorage.setItem("roomNumber", response.data.roomNumber);
        localStorage.setItem("guestId", response.data.guestID);
        localStorage.setItem("reservationId", response.data.reservationID);

        callback();
    } catch (e) {
        dispatch({
            type: actionTypes.AUTH_ERROR,
            payload: e,
        });
    }
};

export const changeAuth = (isLoggedIn) => {
    return { type: actionTypes.AUTH_CHANGE, payload: isLoggedIn };
};

export const updateOrderedItem = ({ orderedItems, type }) => {
    return {
        type: actionTypes.SELECTED_ORDER,
        payload: { orderedItems: orderedItems, type: type },
    };
};
