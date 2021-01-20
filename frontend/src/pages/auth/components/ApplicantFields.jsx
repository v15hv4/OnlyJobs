import { useContext, useState, useEffect } from "react";
import { Button, FormGroup, Label } from "reactstrap";
import { Controller } from "react-hook-form";

import LanguageService from "api/languages";

import { SignupFormContext } from "../Signup";
import { selectStyles } from "./styles";

import CreatableSelect from "react-select/creatable";

import SuccessAlert from "components/SuccessAlert";
import EducationInputGroup from "./EducationInputGroup";

const ApplicantFields = () => {
    const { control } = useContext(SignupFormContext);

    const [education, setEducation] = useState([]);
    const addEducation = () => setEducation([...education, EducationInputGroup]);

    const [skills, skillsActions] = LanguageService();
    useEffect(() => skillsActions.view(), []); // eslint-disable-line

    const [successAlert, setSuccessAlert] = useState(null);

    const formattedSkills = () => {
        if (skills.loading) return [{ value: "loading", error: "Loading..." }];
        else if (skills.data) return skills.data.map((s) => ({ value: s._id, label: s.name }));
        else return [{ value: "error", error: "Error loading skills!" }];
    };

    const addSkill = async (skill) => {
        await skillsActions.add({ name: skill });
        if (!skills.error) setSuccessAlert(`Language '${skill}' added to list!`);
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
                    as={CreatableSelect}
                    isClearable
                    isDisabled={skills.loading}
                    isLoading={skills.loading}
                    onCreateOption={addSkill}
                    defaultValue=""
                    placeholder="Search..."
                    isMulti
                />
                {successAlert ? <SuccessAlert message={successAlert} /> : null}
            </FormGroup>
        </>
    );
};

export default ApplicantFields;
