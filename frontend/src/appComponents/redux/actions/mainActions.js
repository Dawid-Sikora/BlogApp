import {
    GET_MAIN_CONTENT_REQUEST,
    GET_MAIN_CONTENT_SUCCESS,
    GET_MAIN_CONTENT_FAIL
} from "./types.js";

const API_URL = "https://localhost:443/api/test/";

export const getMainContent= () => {
    return async (dispatch) => {

        dispatch({ type: GET_MAIN_CONTENT_REQUEST });

        try {
            const response = await fetch(API_URL + 'main', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' 
            });

            const data = await response.text();

            if (!response.ok) {
                dispatch({ type: GET_MAIN_CONTENT_FAIL, payload: data });
                return;
            }
            dispatch({ type: GET_MAIN_CONTENT_SUCCESS, payload: data });
            
        } catch (error) {
            dispatch({ type: GET_MAIN_CONTENT_FAIL, payload: error.message });
        }

    }
}
