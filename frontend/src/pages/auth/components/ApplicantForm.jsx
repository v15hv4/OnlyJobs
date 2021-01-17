import { useContext, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Button, Form, FormGroup, Label } from "reactstrap";

import { SessionContext } from "App";
import { SignupFormContext } from "../Signup";
import { selectStyles } from "./styles";

import { languages, auth } from "api/endpoints";
import { HandleGET, HandlePOST } from "api/methods";

import Select from "react-select";
import EducationInputGroup from "./EducationInputGroup";

const Applicant = () => {
    const { handlers } = useContext(SessionContext);
    const [user, registerUser] = HandlePOST(auth.REGISTER);

    const { handleSubmit, control, formData, setErrorAlert } = useContext(SignupFormContext);
    const [skills, getSkills] = HandleGET(languages.VIEW);
    useEffect(() => getSkills(), []); // eslint-disable-line

    const formattedSkills = () => {
        if (skills.loading) return [{ value: "loading", error: "Loading..." }];
        else if (skills.error) return [{ value: "error", error: "Error loading skills!" }];
        else return skills.data.map((s) => ({ value: s._id, label: s.name }));
    };

    const [education, setEducation] = useState([]);

    const addEducation = () => setEducation([...education, EducationInputGroup]);

    const onSubmit = async (data) => {
        const rawData = { ...formData, ...data };

        // parse education inputs
        var educationDict = {};
        for (var line of Object.keys(rawData)) {
            var parts = line.split("-");
            if (parts.length && parts[0] === "education") {
                if (!(parts[1] in educationDict)) educationDict[parts[1]] = {};
                educationDict[parts[1]][parts[2]] = rawData[line];
                delete rawData[line];
            }
        }
        var educationList = Object.values(educationDict);

        // parse skills input
        var skillsList = rawData.skills ? rawData.skills.map((skill) => skill.value) : [];

        // generate final data to post to server
        const postData = { ...rawData, education: educationList, skills: skillsList };

        await registerUser(postData);

        // if error, trigger alert; else log in
        if (user.error) setErrorAlert(user.error.data.message);
        else await handlers.login({ email: postData.email, password: postData.password });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Label for="education" className="fw-500 mb-1">
                    Education
                </Label>
                {education.map((E, idx) => (
                    <E idx={idx} />
                ))}
            </FormGroup>
            <Button
                outline
                color="secondary"
                onClick={addEducation}
                className="w-100 mb-4 text-light"
            >
                + ADD
            </Button>
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
