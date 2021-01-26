import { useCallback, useReducer } from "react";
import { headers, initial, reducer } from "./common";
import axios from "axios";

const endpoints = {
    VIEW: "/api/jobs",
    ADD: "/api/jobs/new",
    EDIT: "/api/jobs/edit",
    DELETE: "/api/jobs/delete",
    RATE: "/api/jobs/rate",
};

const JobService = () => {
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
                        response: res.data,
                    }),
            });
        },
        delete: async (id) => {
            return await makeRequest({
                method: "post",
                endpoint: `${endpoints.DELETE}/${id}`,
                cb: (res) =>
                    dispatch({
                        type: "SUCCESS",
                        response: state.data.map((d) => d._id !== res._id),
                    }),
            });
        },
        rate: async (id, data) => {
            return await makeRequest({
                method: "post",
                endpoint: `${endpoints.RATE}/${id}`,
                data: data,
                cb: () =>
                    dispatch({
                        type: "SUCCESS",
                        response: true,
                    }),
            });
        },
    };

    return [state, actions];
};

export default JobService;
