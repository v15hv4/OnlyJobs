import { Controller } from "react-hook-form";
import { Button, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { selectStyles } from "./styles";

import Select from "react-select";

const Applicant = ({ register, errors, control }) => {
    // TODO: fetch from API call
    const skills = [
        { value: "Python", label: "Python" },
        { value: "NodeJS", label: "NodeJS" },
        { value: "C++", label: "C++" },
        { value: "Golang", label: "Golang" },
    ];

    return (
        <>
            <FormGroup>
                <Label for="skills" className="fw-500 mb-1">
                    Skills
                </Label>
                <Controller
                    name="role"
                    options={skills}
                    styles={selectStyles}
                    control={control}
                    as={Select}
                    isMulti
                />
            </FormGroup>
            <div className="w-100 d-flex justify-content-between align-items-center mt-2">
                <Button color="primary w-100 mt-4 fw-700">NEXT &gt;</Button>
            </div>
        </>
    );
};

export default Applicant;
