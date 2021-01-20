import { useCallback, useReducer } from "react";
import { headers, initial, reducer } from "./common";
import axios from "axios";

const endpoints = {
    VIEW: "/api/applicants",
    EDIT: "/api/applicants/edit",
    RATE: "/api/applicants/rate",
};

const ApplicantService = () => {
    const [state, dispatch] = useReducer(reducer, initial);

    const makeRequest = useCallback(async ({ method, endpoint, data, params, cb }) => {
        dispatch({ type: "LOADING" });
        try {
            const res = await axios[method](endpoint, data, { params, headers });
            cb(res);
        } catch (e) {
            dispatch({ type: "ERROR", response: e.response });
        }
    }, []);

    const actions = {
        view: async () => {
            return await makeRequest({
                method: "get",
                endpoint: endpoints.VIEW,
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
                        response: state.data.map((d) => (d._id === res._id ? res : d)),
                    }),
            });
        },
        rate: async (id, data) => {
            return await makeRequest({
                method: "post",
                endpoint: `${endpoints.RATE}/${id}`,
                data: data,
                cb: (res) =>
                    dispatch({
                        type: "SUCCESS",
                        response: state.data.map((d) => (d._id === res._id ? res : d)),
                    }),
            });
        },
    };

    return [state, actions];
};

export default ApplicantService;
