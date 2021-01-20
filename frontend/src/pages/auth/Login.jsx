import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, FormFeedback, Label, Input } from "reactstrap";
import { SessionContext } from "App";

import AuthContainer from "components/AuthContainer";
import ErrorAlert from "components/ErrorAlert";

const Login = () => {
    const { session, handlers } = useContext(SessionContext);
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
        await handlers.login(data);
    };

    return (
        <AuthContainer>
            <div className="d-flex flex-column w-75">
                <div className="h1 fw-700 mb-5"> Log in </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
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
                    {session.error ? <ErrorAlert message={session.error.data} /> : null}
                    <Button color="primary w-100 mt-4 fw-700">LOGIN</Button>
                </Form>
                <div className="w-100 d-flex justify-content-center align-items-center mt-5">
                    New member?
                    <Button
                        tag={Link}
                        to="/signup"
                        type="button"
                        outline
                        color="light fw-700 border-0 mx-2 px-2"
                    >
                        SIGN UP
                    </Button>
                </div>
            </div>
        </AuthContainer>
    );
};

export default Login;
