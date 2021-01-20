import { useContext, useState, useEffect } from "react";
import { Button, FormGroup, Label } from "reactstrap";
import { Controller } from "react-hook-form";

import { languages } from "api/endpoints";
import { HandleGET } from "api/methods";

import { SignupFormContext } from "../Signup";
import { selectStyles } from "./styles";

import Select from "react-select";
import EducationInputGroup from "./EducationInputGroup";

const ApplicantFields = () => {
    const { control } = useContext(SignupFormContext);

    const [education, setEducation] = useState([]);
    const addEducation = () => setEducation([...education, EducationInputGroup]);

    const [skills, getSkills] = HandleGET(languages.VIEW);
    useEffect(() => getSkills(), []); // eslint-disable-line

    const formattedSkills = () => {
        if (skills.loading) return [{ value: "loading", error: "Loading..." }];
        else if (skills.error) return [{ value: "error", error: "Error loading skills!" }];
        else return skills.data.map((s) => ({ value: s._id, label: s.name }));
    };

    return (
        <>
            <FormGroup>
                <Label for="education" className="fw-500 mb-1">
                    Education
                </Label>
                {education.map((E, idx) => (
                    <E idx={idx} key={idx} />
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
                    defaultValue=""
                    isMulti
                />
            </FormGroup>
        </>
    );
};

export default ApplicantFields;
