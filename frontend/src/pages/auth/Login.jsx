import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Form, FormGroup, FormFeedback, Label, Input } from "reactstrap";
import { SessionContext } from "App";

import AuthContainer from "components/AuthContainer";

const Login = () => {
    const { session, handlers } = useContext(SessionContext);
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
        await handlers.login(data);
    };

    return (
        <AuthContainer>
            <Form onSubmit={handleSubmit(onSubmit)} className="w-75">
                {session.error ? (
                    <Alert color="danger" className="mb-5 fw-700 bg-danger text-light border-0">
                        Error: {session.error.data}
                    </Alert>
                ) : null}
                <div className="h1 fw-700 mb-5"> Log in </div>
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
                <Button color="primary w-100 mt-4 fw-700">LOGIN</Button>
                <div className="w-100 d-flex justify-content-center align-items-center mt-5">
                    New member?
                    <Button type="button" outline color="light fw-700 border-0 mx-2">
                        REGISTER
                    </Button>
                </div>
            </Form>
        </AuthContainer>
    );
};

export default Login;
