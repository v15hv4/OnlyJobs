import { useContext } from "react";
import { Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";

import { SessionContext } from "App";
import { SignupFormContext } from "../Signup";
import { phone_number, word_limit } from "./validators";

import { auth } from "api/endpoints";
import { HandlePOST } from "api/methods";

const Recruiter = () => {
    const { handlers } = useContext(SessionContext);
    const [user, registerUser] = HandlePOST(auth.REGISTER);

    const { register, handleSubmit, errors, formData, setErrorAlert } = useContext(
        SignupFormContext
    );

    const onSubmit = async (data) => {
        const postData = { ...formData, ...data };

        await registerUser(postData);

        // if error, trigger alert; else log in
        if (user.error) setErrorAlert(user.error.data.message);
        else await handlers.login({ email: postData.email, password: postData.password });
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
