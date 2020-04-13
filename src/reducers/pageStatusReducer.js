import { SET_ORDER_STATUS } from "../actions/types";

const INITIAL_STATE = "";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ORDER_STATUS:
            return action.payload;
        default:
            return state;
    }
};
