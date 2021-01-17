import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { selectStyles } from "./styles";

import { languages } from "api/endpoints";
import { HandleGET } from "api/methods";

import Select from "react-select";
import EducationInputGroup from "./EducationInputGroup";

const Applicant = ({ formData, addFormData }) => {
    const { register, handleSubmit, errors, control } = useForm();
    const [{ loading, data: skills, error }, getSkills] = HandleGET(languages.VIEW);
    useEffect(() => getSkills(), []); // eslint-disable-line

    const formattedSkills = () => {
        if (loading) return [{ value: "loading", error: "Loading..." }];
        else if (error) return [{ value: "error", error: "Error loading skills!" }];
        else return skills.map((s) => ({ value: s.name, label: s.name }));
    };

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
                <EducationInputGroup register={register} errors={errors} />
                <FormFeedback className="fw-700"> Invalid education! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="skills" className="fw-500 mb-1">
                    Skills
                </Label>
                <Controller
                    name="skills"
                    options={formattedSkills()}
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
