import { useForm } from "react-hook-form";
import { Button, Row, Col, Form, FormGroup, FormFeedback, Label, Input } from "reactstrap";

import PageContainer from "components/PageContainer";

const Login = () => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <PageContainer>
            <Row className="h-100">
                <Col
                    md={8}
                    className="d-flex flex-column justify-content-center align-items-center"
                >
                    <img src="/onlyjobs_full.svg" alt="OnlyJobs" className="w-75" />
                    <div className="mt-4 h4 font-italic font-weight-light">
                        &lt;insert epic tagline here&gt;
                    </div>
                </Col>
                <Col className="d-flex justify-content-center align-items-center bg-dark text-light">
                    <Form onSubmit={handleSubmit(onSubmit)} className="w-75">
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
                    </Form>
                </Col>
            </Row>
        </PageContainer>
    );
};

export default Login;
