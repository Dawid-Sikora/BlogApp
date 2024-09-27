import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../actions/types.js";

const initialState = {
    loading: false,
    serverErrors: null,
    isRegisterSuccess: false
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                serverErrors: null,
                isRegisterSuccess: false
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                serverErrors: null,
                isRegisterSuccess: true
            };
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                serverErrors: action.payload,
                isRegisterSuccess: false
            };
        default:
            return state;
    }
};

export default authReducer;