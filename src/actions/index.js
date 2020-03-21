import itemsAPI from "../api/items";
import * as actionTypes from "../actions/types";

// export const signin = (formProps, callback) => async dispatch => {
//     try {
//         const response = await itemsAPI.post("/", formProps);
//         dispatch({ type: actionTypes.AUTH_USER, payload: response.data });
//         localStorage.setItem("token", response.data.token);

//     }
// };

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await itemsAPI.post("/authen/guest", formProps);

        dispatch({
            type: actionTypes.AUTH_USER,
            payload: response.data.accessToken
        });
        localStorage.setItem("token", response.data.token);
        callback();
    } catch (e) {
        dispatch({
            type: actionTypes.AUTH_ERROR,
            payload: e
        });
    }
};

export const changeAuth = isLoggedIn => {
    return { type: actionTypes.AUTH_CHANGE, payload: isLoggedIn };
};

export const updateOrderedItem = ({ orderedItems, type }) => {
    return {
        type: actionTypes.SELECTED_ORDER,
        payload: { orderedItems: orderedItems, type: type }
    };
};
