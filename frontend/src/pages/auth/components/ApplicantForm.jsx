import { useForm, Controller } from "react-hook-form";
import { Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { selectStyles } from "./styles";

import Select from "react-select";

const Applicant = ({ formData, addFormData }) => {
    const { register, handleSubmit, errors, control, watch } = useForm();

    // TODO: fetch from API call
    const skills = [
        { value: "Python", label: "Python" },
        { value: "NodeJS", label: "NodeJS" },
        { value: "C++", label: "C++" },
        { value: "Golang", label: "Golang" },
    ];

    const onSubmit = (data) => {
        addFormData(data);
        // TODO: don't add to form data, instead make an api call
        // directly using the previous state and append new
        // formdata to it
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Label for="education" className="fw-500 mb-1">
                    Education
                </Label>
                <Input
                    invalid={errors.education}
                    type="education"
                    name="education"
                    innerRef={register({ required: true })}
                    className="bg-secondary text-light"
                />
                <FormFeedback className="fw-700"> Invalid education! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="skills" className="fw-500 mb-1">
                    Skills
                </Label>
                <Controller
                    name="skills"
                    options={skills}
                    styles={selectStyles}
                    control={control}
                    as={Select}
                    isMulti
                />
            </FormGroup>
            <div className="w-100 d-flex justify-content-between align-items-center mt-2">
                <Button color="primary w-100 mt-4 fw-700">SIGN UP</Button>
            </div>
        </Form>
    );
};

export default Applicant;
