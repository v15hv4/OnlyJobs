import { useCallback, useReducer } from "react";
import { headers, initial, reducer } from "./common";
import axios from "axios";

const endpoints = {
    VIEW: "/api/languages",
    ADD: "/api/languages/new",
};

const LanguageService = () => {
    const [state, dispatch] = useReducer(reducer, initial);

    const makeRequest = useCallback(async ({ method, endpoint, data, params, cb }) => {
        dispatch({ type: "LOADING" });
        try {
            var res;
            if (method === "get") res = await axios[method](endpoint, { params, headers });
            else res = await axios[method](endpoint, data, { params, headers });
            cb(res);
        } catch (e) {
            dispatch({ type: "ERROR", response: e.response });
        }
    }, []);

    const actions = {
        view: async (params = {}) => {
            return await makeRequest({
                method: "get",
                endpoint: endpoints.VIEW,
                params: params,
                cb: (res) => dispatch({ type: "SUCCESS", response: res.data }),
            });
        },
        add: async (data) => {
            return await makeRequest({
                method: "post",
                endpoint: endpoints.ADD,
                data: data,
                cb: (res) => dispatch({ type: "SUCCESS", response: [...state.data, res.data] }),
            });
        },
    };

    return [state, actions];
};

export default LanguageService;
