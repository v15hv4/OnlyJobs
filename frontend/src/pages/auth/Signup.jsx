import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Alert, Button } from "reactstrap";
import { SessionContext } from "App";

import AuthContainer from "components/AuthContainer";
import Recruiter from "./components/RecruiterForm";
import Applicant from "./components/ApplicantForm";
import Common from "./components/CommonForm";

const Signup = () => {
    const { session, handlers } = useContext(SessionContext);

    const [current, setCurrent] = useState("common");
    const [formData, setFormData] = useState({});

    const addFormData = (data) => setFormData({ ...formData, ...data });

    useEffect(() => console.log(formData), [formData]);

    const formProps = {
        formData,
        addFormData,
        setCurrent,
    };

    const pages = {
        common: <Common {...formProps} />,
        applicant: <Applicant {...formProps} />,
        recruiter: <Recruiter {...formProps} />,
    };

    // const onSubmit = async (data) => {
    //     console.log(data);
    //     setCurrentData({ ...currentData, data });

    //     if ("role" in data) setCurrent(data.role.value);
    //     else await handlers.login(data);
    // };

    return (
        <AuthContainer>
            <div className="d-flex flex-column w-75">
                {session.error ? (
                    <Alert color="danger" className="mb-5 fw-700 bg-danger text-light border-0">
                        Error: {session.error.data}
                    </Alert>
                ) : null}
                <div className="h1 fw-700 mb-5"> Sign Up </div>
                {pages[current]}
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
