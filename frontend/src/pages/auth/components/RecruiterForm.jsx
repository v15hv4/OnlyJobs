import { useContext } from "react";
import { Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { phone_number, word_limit } from "./validators";
import { SignupFormContext } from "../Signup";

const Recruiter = () => {
    const { register, handleSubmit, errors, formData, addFormData } = useContext(SignupFormContext);

    const onSubmit = (data) => {
        addFormData(data);
        // TODO: don't add to form data, instead make an api call
        // directly using the previous state and append new
        // formdata to it
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Label for="contact" className="fw-500 mb-1">
                    Contact Number
                </Label>
                <Input
                    invalid={errors.contact}
                    type="text"
                    name="contact"
                    innerRef={register({ required: true, validate: (v) => phone_number(v) })}
                    className="bg-secondary text-light"
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
                        required: true,
                        validate: (v) => word_limit(v, 250),
                    })}
                    className="bg-secondary text-light"
                />
                <FormFeedback className="fw-700">
                    A bio (of not more than 250 words) is required!
                </FormFeedback>
            </FormGroup>
            <div className="w-100 d-flex justify-content-between align-items-center mt-2">
                <Button color="primary w-100 mt-4 fw-700">SIGN UP</Button>
            </div>
        </Form>
    );
};

export default Recruiter;
