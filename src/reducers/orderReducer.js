import * as actionTypes from "../actions/types";

const INITIAL_STATE = {
    history: [
        // {{},{},{}},
        // {{},{},{}}
    ],
    currentOrder: {
        orderedItems: [],
        type: "",
        // type string
        // [{},{},{}]
    },
    orderId: "",
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.SELECTED_ORDER:
            return { ...state, currentOrder: action.payload };
        case actionTypes.SET_ORDER_ID:
            return { ...state, orderId: action.payload };
        default:
            return state;
    }
};
