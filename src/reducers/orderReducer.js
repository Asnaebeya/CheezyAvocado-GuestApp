import * as actionTypes from "../actions/types";

const INITIAL_STATE = {
    history: [
        // {{},{},{}},
        // {{},{},{}}
    ],
    currentOrder: {
        orderedItems: [],
        type: ""
        // type string
        // [{},{},{}]
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.SELECTED_ORDER:
            return { ...state, currentOrder: action.payload };
        default:
            return state;
    }
};
