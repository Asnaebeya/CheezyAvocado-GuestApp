import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-form";
import orderReducer from "./orderReducer";
import loadingReducer from "./loadingReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    order: orderReducer,
    loading: loadingReducer,
    modal: modalReducer
});
