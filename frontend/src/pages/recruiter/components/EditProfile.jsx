import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    FormFeedback,
    Input,
    Label,
} from "reactstrap";

import RecruiterService from "api/recruiters";

import ErrorAlert from "components/ErrorAlert";
import SuccessAlert from "components/SuccessAlert";
import { phone_number, word_limit, valid_email } from "pages/auth/components/validators";

const EditProfile = ({ modal, toggle, recruiter, successAlert, setSuccessAlert }) => {
    const [job2, recruiterHandlers] = RecruiterService();

    const { register, handleSubmit, errors, watch } = useForm();

    // for password confirmation field verification
    const password = useRef({});
    password.current = watch("password", "");

    // control error alert
    const [errorAlert, setErrorAlert] = useState(false);
    useEffect(() => setErrorAlert(false), [job2]);
    useEffect(() => job2.error && setErrorAlert(job2.error), [job2]);

    useEffect(() => setSuccessAlert(false), [job2, setSuccessAlert]);
    useEffect(() => job2.data && setSuccessAlert("Edited profile successfully!"), [
        job2.data,
        setSuccessAlert,
    ]);

    const onSubmit = async (data) => {
        var postData = {};
        Object.keys(data).forEach((k) => (data[k] ? (postData[k] = data[k]) : null));
        await recruiterHandlers.edit(recruiter._id, postData);
    };

    return (
        <Modal size="lg" centered isOpen={modal} toggle={toggle}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={toggle}>
                    Editing <span className="fw-700"> Profile </span>
                </ModalHeader>
                <ModalBody className="p-5">
                    <FormGroup>
                        <Label for="name" className="fw-500 mb-1">
                            Name
                        </Label>
                        <Input
                            invalid={errors.name}
                            type="name"
                            name="name"
                            innerRef={register}
                            className="mild-border"
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
                            innerRef={register({ validate: (v) => !v || valid_email(v) })}
                            className="mild-border"
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
                            innerRef={register}
                            className="mild-border"
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
                                validate: (v) => v === password.current,
                            })}
                            className="mild-border"
                        />
                        <FormFeedback className="fw-700"> Passwords do not match! </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="contact" className="fw-500 mb-1">
                            Contact Number
                        </Label>
                        <Input
                            invalid={errors.contact}
                            type="text"
                            name="contact"
                            innerRef={register({
                                validate: (v) => !v || phone_number(v),
                            })}
                            className="mild-border"
                        />
                        <FormFeedback className="fw-700"> Invalid contact number! </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="education" className="fw-500 mb-1">
                            Bio
                        </Label>
                        <Input
                            invalid={errors.bio}
                            type="textarea"
                            name="bio"
                            rows={5}
                            innerRef={register({
                                validate: (v) => !v || word_limit(v, 250),
                            })}
                            className="mild-border"
                        />
                        <FormFeedback className="fw-700">
                            A bio (of not more than 250 words) is required!
                        </FormFeedback>
                    </FormGroup>
                    {errorAlert && <ErrorAlert message={errorAlert.data.message} />}
                    {successAlert && <SuccessAlert message={successAlert} />}
                </ModalBody>
                <ModalFooter>
                    {successAlert ? (
                        <Button color="secondary" className="fw-700" onClick={toggle}>
                            CLOSE
                        </Button>
                    ) : (
                        <Button color="success" className="fw-700">
                            SUBMIT
                        </Button>
                    )}
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default EditProfile;
