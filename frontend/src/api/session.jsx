import { useReducer, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const auth = {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    SESSION: "/api/auth/session",
    REGISTER: "/api/auth/register",
};

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
    const history = useHistory();

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
            history.push("/");
        } catch (err) {
            const error = err.response;
            dispatch({ type: "ERROR", response: error });
        }
    }, []); // eslint-disable-line

    const logout = useCallback(async () => {
        try {
            const response = await axios.get(auth.LOGOUT);
            dispatch({ type: "LOGOUT", response: response.data });
            history.push("/");
        } catch (err) {
            const error = err.response;
            dispatch({ type: "ERROR", response: error });
        }
    }, []); // eslint-disable-line

    return [state, { session, login, logout }];
};

export const HandleRegister = async (data, cb) => {
    try {
        const response = await axios.post(auth.REGISTER, data, { headers });
        cb(null, response);
    } catch (e) {
        const error = e.response;
        cb(error);
    }
};
