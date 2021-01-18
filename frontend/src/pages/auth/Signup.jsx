import { createContext, useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Alert, Button } from "reactstrap";

import { SessionContext } from "App";

import AuthContainer from "components/AuthContainer";
import ErrorAlert from "components/ErrorAlert";
import Recruiter from "./components/RecruiterForm";
import Applicant from "./components/ApplicantForm";
import Common from "./components/CommonForm";

export const SignupFormContext = createContext();

const Signup = () => {
    const { register, handleSubmit, errors, control, watch } = useForm({
        reValidateMode: "onSubmit",
    });
    const { session } = useContext(SessionContext);

    const [current, setCurrent] = useState("common");
    const [formData, setFormData] = useState({});
    const [errorAlert, setErrorAlert] = useState(null);

    const addFormData = (data) => setFormData({ ...formData, ...data });

    useEffect(() => session.error && setErrorAlert(session.error.data), [session.error]);

    const pages = {
        common: <Common />,
        applicant: <Applicant />,
        recruiter: <Recruiter />,
    };

    return (
        <AuthContainer>
            <div className="d-flex flex-column w-75">
                {errorAlert ? <ErrorAlert message={errorAlert} /> : null}
                <div className="h1 fw-700 mb-5"> Sign Up </div>
                <SignupFormContext.Provider
                    value={{
                        register,
                        handleSubmit,
                        errors,
                        control,
                        watch,
                        formData,
                        addFormData,
                        setCurrent,
                        setErrorAlert,
                    }}
                >
                    {pages[current]}
                </SignupFormContext.Provider>
                <div className="w-100 d-flex justify-content-center align-items-center mt-5">
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
