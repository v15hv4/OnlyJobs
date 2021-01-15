import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert, Button, Form, FormGroup, FormFeedback, Label, Input } from "reactstrap";
import { SessionContext } from "App";

import Select from "react-select";
import AuthContainer from "components/AuthContainer";

const selectStyles = {
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
};

const Common = ({ register, errors, control }) => {
    const roles = [
        { value: "applicant", label: "Applicant" },
        { value: "recruiter", label: "Recruiter" },
    ];

    return (
        <>
            <FormGroup>
                <Label for="name" className="fw-500 mb-1">
                    Name
                </Label>
                <Input
                    invalid={errors.name}
                    type="name"
                    name="name"
                    innerRef={register({ required: true })}
                    className="bg-secondary text-light"
                />
                <FormFeedback className="fw-700"> Invalid name! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="email" className="fw-500 mb-1">
                    Email
                </Label>
                <Input
                    invalid={errors.email}
                    type="email"
                    name="email"
                    innerRef={register({ required: true })}
                    className="bg-secondary text-light"
                />
                <FormFeedback className="fw-700"> Invalid email! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="password" className="fw-500 mb-1">
                    Password
                </Label>
                <Input
                    invalid={errors.password}
                    type="password"
                    name="password"
                    innerRef={register({ required: true })}
                    className="bg-secondary text-light"
                />
                <FormFeedback className="fw-700"> Invalid password! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="confirmpassword" className="fw-500 mb-1">
                    Confirm Password
                </Label>
                <Input
                    invalid={errors.confirmpassword}
                    type="password"
                    name="confirmpassword"
                    innerRef={register({ required: true })}
                    className="bg-secondary text-light"
                />
                <FormFeedback className="fw-700"> Passwords do not match! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="role" className="fw-500 mb-1">
                    Who are you?
                </Label>
                <Controller
                    name="role"
                    options={roles}
                    styles={selectStyles}
                    control={control}
                    as={Select}
                    defaultValue={roles[0]}
                />
                <FormFeedback className="fw-700"> Required! </FormFeedback>
            </FormGroup>
            <div className="w-100 d-flex justify-content-between align-items-center mt-2">
                <Button color="primary w-100 mt-4 fw-700">NEXT &gt;</Button>
            </div>
        </>
    );
};

const Applicant = ({ register, errors, control }) => {
    // TODO: fetch from API call
    const skills = [
        { value: "Python", label: "Python" },
        { value: "NodeJS", label: "NodeJS" },
        { value: "C++", label: "C++" },
        { value: "Golang", label: "Golang" },
    ];

    return (
        <>
            <FormGroup>
                <Label for="skills" className="fw-500 mb-1">
                    Skills
                </Label>
                <Controller
                    name="role"
                    options={skills}
                    styles={selectStyles}
                    control={control}
                    as={Select}
                    isMulti
                />
            </FormGroup>
            <div className="w-100 d-flex justify-content-between align-items-center mt-2">
                <Button color="primary w-100 mt-4 fw-700">NEXT &gt;</Button>
            </div>
        </>
    );
};

const Signup = () => {
    const { session, handlers } = useContext(SessionContext);
    const { register, handleSubmit, errors, control } = useForm();

    const [current, setCurrent] = useState("common");
    const [currentData, setCurrentData] = useState({});

    const pages = {
        common: <Common register={register} errors={errors} control={control} />,
        applicant: <Applicant register={register} errors={errors} control={control} />,
        recruiter: <h1> recruiter </h1>,
    };

    const onSubmit = async (data) => {
        console.log(data);
        setCurrentData({ ...currentData, data });

        if ("role" in data) setCurrent(data.role.value);
        else await handlers.login(data);
    };

    return (
        <AuthContainer>
            <Form onSubmit={handleSubmit(onSubmit)} className="w-75">
                {session.error ? (
                    <Alert color="danger" className="mb-5 fw-700 bg-danger text-light border-0">
                        Error: {session.error.data}
                    </Alert>
                ) : null}
                <div className="h1 fw-700 mb-5"> Sign Up </div>
                {pages[current]}
                <div className="w-100 d-flex justify-content-center align-items-center mt-5">
                    Existing member?
                    <Button type="button" outline color="light fw-700 border-0 mx-2 px-2">
                        LOGIN
                    </Button>
                </div>
            </Form>
        </AuthContainer>
    );
};

export default Signup;
