import { useContext } from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

import { SignupFormContext } from "../Signup";

import { phone_number, word_limit } from "./validators";

const RecruiterFields = () => {
    const { register, errors } = useContext(SignupFormContext);

    return (
        <>
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
        </>
    );
};

export default RecruiterFields;
