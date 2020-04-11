import { SHOW_MODAL } from "../actions/types";

const INITIAL_STATE = {
    modalStatus: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return { ...state, modalStatus: action.payload };
        default:
            return state;
    }
};
