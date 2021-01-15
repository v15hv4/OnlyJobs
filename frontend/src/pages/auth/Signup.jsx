import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Form } from "reactstrap";
import { SessionContext } from "App";

import AuthContainer from "components/AuthContainer";
import Applicant from "./components/ApplicantForm";
import Common from "./components/CommonForm";

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
