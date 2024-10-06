import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from "./types.js";

const API_URL = "http://localhost:8080/api/auth/";

export const registerUser = (userData) => {
    return async (dispatch) => {

        dispatch({ type: REGISTER_REQUEST });

        try {
            const response = await fetch(API_URL + 'signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                dispatch({ type: REGISTER_FAIL, payload: data });
                return;
            }
            dispatch({ type: REGISTER_SUCCESS, payload: data });
            
        } catch (error) {
            dispatch({ type: REGISTER_FAIL, payload: error.message });
        }

    }

};

export const loginUser = (userData) => {
    return async (dispatch) => {

        dispatch({ type: LOGIN_REQUEST });

        try {
            const response = await fetch(API_URL + 'login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                dispatch({ type: LOGIN_FAIL, payload: data });
                return;
            }

            dispatch({ type: LOGIN_SUCCESS, payload: data });

            //localStorage.setItem('userInfo', JSON.stringify(data));

        } catch (error) {
            dispatch({ type: LOGIN_FAIL, payload: error.message });
        }

    }
};


