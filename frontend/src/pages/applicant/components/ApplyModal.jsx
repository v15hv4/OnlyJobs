import { useState, useContext, useEffect } from "react";
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

import { SessionContext } from "App";
import ApplicationService from "api/applications";
import ErrorAlert from "components/ErrorAlert";
import SuccessAlert from "components/SuccessAlert";

const ApplyModal = ({ modal, toggle, job, successAlert, setSuccessAlert }) => {
    const { session } = useContext(SessionContext);
    const { register, handleSubmit, errors } = useForm();

    const [application, applicationActions] = ApplicationService();

    // control error alert
    const [errorAlert, setErrorAlert] = useState(false);
    useEffect(() => setErrorAlert(false), [job]);
    useEffect(() => application.error && setErrorAlert(application.error), [application]);

    useEffect(() => setSuccessAlert(false), [job, setSuccessAlert]);
    useEffect(() => application.data && setSuccessAlert("Submitted application."), [
        application.data,
        setSuccessAlert,
    ]);

    const onSubmit = async (data) => {
        const postData = {
            applicant: session.user.id,
            job: job._id,
            SOP: data.SOP,
        };
        await applicationActions.add(postData);
    };

    return (
        <Modal size="lg" centered isOpen={modal} toggle={toggle}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={toggle}>
                    Applying for <span className="fw-700">{job && job.title}</span>
                </ModalHeader>
                <ModalBody className="p-5">
                    <FormGroup>
                        <Label for="SOP" className="mb-3">
                            Describe your Statement of Purpose (in less than 250 words):
                        </Label>
                        <Input
                            invalid={!!errors.SOP}
                            type="textarea"
                            name="SOP"
                            innerRef={register({ required: "SOP can not be blank!" })}
                            className="mild-border"
                            rows="8"
                        />
                        <FormFeedback>{errors.SOP && errors.SOP.message}</FormFeedback>
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

export default ApplyModal;
