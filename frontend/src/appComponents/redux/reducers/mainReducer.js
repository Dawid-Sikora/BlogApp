import {
    GET_MAIN_CONTENT_REQUEST,
    GET_MAIN_CONTENT_SUCCESS,
    GET_MAIN_CONTENT_FAIL
} from "../actions/types.js";

const initialState = {
    mainContentLoading: false,
    serverErrors: null,
    mainContent: null 
};

const mainReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_MAIN_CONTENT_REQUEST:
            return {
                ...state,
                mainContentLoading: true,
                serverErrors: null,
                mainContent: null
            };
        case GET_MAIN_CONTENT_SUCCESS:
            return {
                ...state,
                mainContentLoading: false,
                serverErrors: null,
                mainContent: action.payload
            };
        case GET_MAIN_CONTENT_FAIL:
            return {
                ...state,
                mainContentLoading: false,
                serverErrors: action.payload,
                mainContent: null
            };

        default:
            return state;
    }
};

export default mainReducer;