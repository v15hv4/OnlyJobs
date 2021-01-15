import { useReducer, useCallback } from "react";
import { auth } from "./endpoints";
import axios from "axios";

export const headers = {
    "Content-Type": "application/json",
};

export const initial = {
    isAuthenticated: false,
    user: {
        id: null,
        name: "",
        role: "",
    },
    error: null,
};

const reducer = (state = initial, { type, response } = {}) => {
    switch (type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenticated: response.isAuthenticated,
                user: response.user,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                user: initial.user,
            };
        case "ERROR":
            return {
                ...state,
                isAuthenticated: false,
                user: initial.user,
                error: response,
            };
        default:
            return state;
    }
};

export const ManageSession = () => {
    const [state, dispatch] = useReducer(reducer, initial);

    const session = useCallback(async () => {
        try {
            const response = await axios.get(auth.SESSION);
            dispatch({ type: "LOGIN", response: response.data });
        } catch (err) {
            dispatch({ type: "ERROR", response: null });
        }
    }, []);

    const login = useCallback(async (data) => {
        try {
            const response = await axios.post(auth.LOGIN, data, { headers: headers });
            dispatch({ type: "LOGIN", response: response.data });
        } catch (err) {
            const error = err.response;
            dispatch({ type: "ERROR", response: error });
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            const response = await axios.get(auth.LOGOUT);
            dispatch({ type: "LOGOUT", response: response.data });
        } catch (err) {
            const error = err.response;
            dispatch({ type: "ERROR", response: error });
        }
    }, []);

    return [state, { session, login, logout }];
};
