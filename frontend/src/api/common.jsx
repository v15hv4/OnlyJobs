export const headers = {
    "Content-Type": "application/json",
};

export const initial = {
    loading: true,
    error: null,
    data: null,
};

export const reducer = (state = initial, { type, response } = {}) => {
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
