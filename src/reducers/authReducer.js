import { AUTH_USER, AUTH_ERROR, AUTH_CHANGE } from "../actions/types";

const INITIAL_STATE = {
    accessToken: "",
    errorMessage: "",
    roomNumber: "",
    lastName: "",
    firstName: "",
    guestId: "",
    reservationId: "",
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                roomNumber: action.payload.roomNumber,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                guestId: action.payload.guestId,
                reservationId: action.payload.reservationId,
            };
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        // test case
        case AUTH_CHANGE:
            return { ...state, accessToken: action.payload };
        default:
            return state;
    }
};
