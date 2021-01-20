export const selectStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: "#34343a",
        color: "#dddddd",
        fontWeight: state.isSelected ? "700" : "400",
        ":hover": {
            ...provided[":active"],
            backgroundColor: state.isSelected ? `#56565c` : `#45454b`,
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "#34343a",
        color: "#dddddd",
    }),
    input: (provided) => ({
        ...provided,
        backgroundColor: "#34343a",
        color: "#dddddd",
    }),
    control: (provided) => ({
        ...provided,
        backgroundColor: "#34343a",
        border: "none",
        color: "#dddddd",
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "#dddddd",
        fontWeight: "700",
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: "#1c1c1d",
        color: "#dddddd",
        fontWeight: "700",
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        backgroundColor: "#1c1c1d",
        color: "#dddddd",
        fontWeight: "700",
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        ":hover": {
            ...provided[":active"],
            backgroundColor: `#ff4444`,
        },
    }),
};
