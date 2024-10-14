import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET_REGISTER,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CHECK_SUCCESS,
    CHECK_FAIL,
    CHECK_REQUEST,
} from "./types.js";

const API_URL = "https://localhost:443/api/auth/";

export const registerUser = (userData) => {
    return async (dispatch) => {

        dispatch({ type: REGISTER_REQUEST });

        try {
            const response = await fetch(API_URL + 'register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
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

export const resetRegister = () => {
    return async (dispatch) => {
        dispatch({ type: RESET_REGISTER });
    }
}

export const loginUser = (userData) => {
    return async (dispatch) => {

        dispatch({ type: LOGIN_REQUEST });

        try {
            const response = await fetch(API_URL + 'login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                dispatch({ type: LOGIN_FAIL, payload: data });
                return;
            }

            dispatch({ type: LOGIN_SUCCESS, payload: data });

        } catch (error) {
            dispatch({ type: LOGIN_FAIL, payload: error.message });
        }

    }
};

export const logoutUser = () => {
    return async (dispatch) => {

        dispatch({ type: LOGOUT_REQUEST });

        try {
            const response = await fetch(API_URL + 'logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                dispatch({ type: LOGOUT_FAIL });
                return;
            }

            dispatch({ type: LOGOUT_SUCCESS });

        } catch (error) {
            dispatch({ type: LOGOUT_FAIL, payload: error.message });
        }

    }
};

export const checkUser = () => {
    return async (dispatch) => {

        dispatch({ type: CHECK_REQUEST });

        try {
            const response = await fetch(API_URL + 'check', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
            });

            if (!response.ok) {
                dispatch({ type: CHECK_FAIL });
                return;
            }

            dispatch({ type: CHECK_SUCCESS });

        } catch (error) {
            dispatch({ type: CHECK_FAIL, payload: error.message });
        }

    }
};
