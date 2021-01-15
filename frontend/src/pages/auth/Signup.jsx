import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Form, FormGroup, FormFeedback, Label, Input } from "reactstrap";
import { SessionContext } from "App";

import AuthContainer from "components/AuthContainer";

const Signup = () => {
    const { session, handlers } = useContext(SessionContext);
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        // await handlers.login(data);
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
                    <Input
                        type="select"
                        name="role"
                        innerRef={register({ required: true })}
                        className="bg-secondary text-light"
                    >
                        <option> Applicant </option>
                        <option> Recruiter </option>
                    </Input>
                </FormGroup>
                <div className="w-100 d-flex justify-content-between align-items-center mt-2">
                    <Button color="primary w-100 mt-4 fw-700">NEXT &gt;</Button>
                </div>
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
