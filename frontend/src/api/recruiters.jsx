import { useCallback, useReducer } from "react";
import { headers, initial, reducer } from "./common";
import axios from "axios";

const endpoints = {
    VIEW: "/api/recruiters",
    EDIT: "/api/recruiters/edit",
};

const RecruiterService = () => {
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
        edit: async (id, data) => {
            return await makeRequest({
                method: "post",
                endpoint: `${endpoints.EDIT}/${id}`,
                data: data,
                cb: (res) =>
                    dispatch({
                        type: "SUCCESS",
                        response: true,
                    }),
            });
        },
    };

    return [state, actions];
};

export default RecruiterService;
