import { createContext, useEffect, useContext, useState, useRef } from "react";
import { Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";

import { SessionContext } from "App";
import { HandleRegister } from "api/session";

import Select from "react-select";

import AuthContainer from "components/AuthContainer";
import ErrorAlert from "components/ErrorAlert";

import { selectStyles } from "./components/styles";
import { valid_email } from "./components/validators";

import ApplicantFields from "./components/ApplicantFields";
import RecruiterFields from "./components/RecruiterFields";

export const SignupFormContext = createContext();

const Signup = () => {
    const roles = [
        { value: "applicant", label: "Applicant" },
        { value: "recruiter", label: "Recruiter" },
    ];

    // display errors
    const [errorAlert, setErrorAlert] = useState(null);

    // manage session
    const { session, handlers } = useContext(SessionContext);
    useEffect(() => {
        return session.error && setErrorAlert(session.error.data);
    }, [session.error]);

    // initialize hook form
    const { register, handleSubmit, errors, control, watch } = useForm();

    // for password confirmation field verification
    const password = useRef({});
    password.current = watch("password", "");

    // for conditionally rendering fields based on role
    const role = useRef({});
    role.current = watch("role", "");

    const onSubmit = async (data) => {
        var rawData = { ...data, role: data.role.value };
        var postData = rawData;

        // extra parsing logic for applicants
        if (rawData.role === "applicant") {
            // parse education inputs
            var educationDict = {};
            for (var line of Object.keys(rawData)) {
                var parts = line.split("-");
                if (parts.length && parts[0] === "education") {
                    if (!(parts[1] in educationDict)) educationDict[parts[1]] = {};
                    educationDict[parts[1]][parts[2]] = rawData[line];
                    delete rawData[line];
                }
            }
            var educationList = Object.values(educationDict);

            // parse skills input
            var skillsList = rawData.skills ? rawData.skills.map((skill) => skill.value) : [];

            // generate final rawData to post to server
            postData = { ...rawData, education: educationList, skills: skillsList };
        }

        await HandleRegister(postData, async (e, _res) => {
            if (e) setErrorAlert(e.data.message);
            else await handlers.login({ email: postData.email, password: postData.password });
        });
    };

    return (
        <AuthContainer>
            <div className="d-flex flex-column w-75 mt-5">
                <div className="h1 fw-700 mb-5"> Sign Up </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
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
                            innerRef={register({ required: true, validate: (v) => valid_email(v) })}
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
                            innerRef={register({
                                required: true,
                                validate: (v) => v === password.current,
                            })}
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
                            defaultValue=""
                        />
                        <FormFeedback className="fw-700"> Required! </FormFeedback>
                    </FormGroup>
                    <SignupFormContext.Provider value={{ register, errors, control, watch }}>
                        {role.current.value === "applicant" ? (
                            <ApplicantFields />
                        ) : role.current.value === "recruiter" ? (
                            <RecruiterFields />
                        ) : null}
                    </SignupFormContext.Provider>
                    {errorAlert ? <ErrorAlert message={errorAlert} /> : null}
                    <div className="w-100 d-flex justify-content-between align-items-center mt-2">
                        <Button color="primary w-100 mt-4 fw-700">SUBMIT</Button>
                    </div>
                </Form>
                <div className="w-100 d-flex justify-content-center align-items-center mt-5 mb-5">
                    Existing member?
                    <Button
                        tag={Link}
                        to="/"
                        type="button"
                        outline
                        color="light fw-700 border-0 mx-2 px-2"
                    >
                        LOGIN
                    </Button>
                </div>
            </div>
        </AuthContainer>
    );
};

export default Signup;
