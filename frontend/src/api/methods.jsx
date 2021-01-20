import { useReducer, useCallback } from "react";
import axios from "axios";

export const headers = {
    "Content-Type": "application/json",
};

export const initial = {
    loading: true,
    error: null,
    data: null,
};

const reducer = (state = initial, { type, response } = {}) => {
    switch (type) {
        case "LOADING":
            return { ...state, loading: true };
        case "SUCCESS":
            return { ...state, loading: false, error: null, data: response };
        case "ERROR":
            return { ...state, loading: false, error: response, data: null };
        default:
            return state;
    }
};

export const HandleGET = (endpoint, params) => {
    const [state, dispatch] = useReducer(reducer, initial);

    const makeRequest = useCallback(async () => {
        dispatch({ type: "LOADING" });
        try {
            const res = await axios.get(endpoint, { params, headers });
            dispatch({ type: "SUCCESS", response: res.data });
        } catch (e) {
            dispatch({ type: "ERROR", response: e.response });
        }
    }, [endpoint, params]);

    return [state, makeRequest];
};

export const HandlePOST = (endpoint) => {
    const [state, dispatch] = useReducer(reducer, initial);

    const makeRequest = useCallback(
        async (data) => {
            dispatch({ type: "LOADING" });
            try {
                const res = await axios.post(endpoint, data, { headers });
                dispatch({ type: "SUCCESS", response: res.data });
            } catch (e) {
                dispatch({ type: "ERROR", response: e.response });
            }
        },
        [endpoint]
    );

    return [state, makeRequest];
};
