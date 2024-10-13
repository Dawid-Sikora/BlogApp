import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CHECK_REQUEST,
    CHECK_SUCCESS,
    CHECK_FAIL
} from "../actions/types.js";

const initialState = {
    loading: null,
    serverErrors: null,
    isRegisterSuccess: false,
    isLogin: false,
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

        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                serverErrors: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                serverErrors: null,
                isLogin: true
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                serverErrors: action.payload,
                isLogin: false 
            };    

        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true,
                serverErrors: null,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                serverErrors: null,
                isLogin: false
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                serverErrors: action.payload,
                isLogin: false 
            };  

        case CHECK_REQUEST:
            return {
                ...state,
                loading: true,
                serverErrors: null,
                isLogin: false
            };    

        case CHECK_SUCCESS:
            return {
                ...state,
                loading: false,
                serverErrors: action.payload,
                isLogin: true 
            };

        case CHECK_FAIL:
            return {
                ...state,
                loading: false,
                serverErrors: action.payload,
                isLogin: false 
        };

        default:
            return state;
    }
};

export default authReducer;