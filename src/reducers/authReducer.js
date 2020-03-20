import { AUTH_USER, AUTH_ERROR, AUTH_CHANGE } from "../actions/types";

const INITIAL_STATE = {
    accessToken: "",
    authenticated: false,
    errorMessage: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, accessToken: action.payload };
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        // test case
        case AUTH_CHANGE:
            return { ...state, accessToken: action.payload };
        default:
            return state;
    }
};
