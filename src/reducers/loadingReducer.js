import { LOADING } from "../actions/types";

const INITIAL_STATE = {
    loadingStatus: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loadingStatus: action.payload };
        default:
            return state;
    }
};
