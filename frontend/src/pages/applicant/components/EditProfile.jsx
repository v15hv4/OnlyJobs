import { useRef, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
} from "reactstrap";

import { valid_email } from "pages/auth/components/validators";

import ApplicantService from "api/applicants";
import LanguageService from "api/languages";

import CreatableSelect from "react-select/creatable";

import ErrorAlert from "components/ErrorAlert";
import SuccessAlert from "components/SuccessAlert";
import EducationInputGroup from "./EducationInputGroup";

const EditProfile = ({ modal, toggle, applicant, successAlert, setSuccessAlert }) => {
    const [job2, applicantHandlers] = ApplicantService();

    const { register, handleSubmit, errors, control, watch } = useForm();

    // for password confirmation field verification
    const password = useRef({});
    password.current = watch("password", "");

    const [education, setEducation] = useState([]);
    const addEducation = () => setEducation([...education, EducationInputGroup]);

    const [skills, skillsActions] = LanguageService();
    useEffect(() => skillsActions.view(), []); // eslint-disable-line

    // control error alert
    const [errorAlert, setErrorAlert] = useState(false);
    useEffect(() => setErrorAlert(false), [job2]);
    useEffect(() => job2.error && setErrorAlert(job2.error), [job2]);

    useEffect(() => setSuccessAlert(false), [job2, setSuccessAlert]);
    useEffect(() => job2.data && setSuccessAlert("Edited profile successfully!"), [
        job2.data,
        setSuccessAlert,
    ]);

    const formattedSkills = () => {
        if (skills.loading) return [{ value: "loading", error: "Loading..." }];
        else if (skills.data) return skills.data.map((s) => ({ value: s._id, label: s.name }));
        else return [{ value: "error", error: "Error loading skills!" }];
    };

    const addSkill = async (skill) => {
        await skillsActions.add({ name: skill });
        if (!skills.error) setSuccessAlert(`Language '${skill}' added to list!`);
    };

    const onSubmit = async (data) => {
        var postData = {};
        Object.keys(data).forEach((k) => (data[k] ? (postData[k] = data[k]) : null));
        if (data.skills) postData.skills = data.skills.map((s) => s.value);
        await applicantHandlers.edit(applicant._id, postData);
    };

    return (
        <Modal size="lg" centered isOpen={modal} toggle={toggle}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={toggle}>
                    Editing <span className="fw-700"> Profile </span>
                </ModalHeader>
                <ModalBody className="p-5">
                    <FormGroup>
                        <Label for="name" className="fw-500 mb-1">
                            Name
                        </Label>
                        <Input
                            invalid={errors.name}
                            type="name"
                            name="name"
                            innerRef={register}
                            className="mild-border"
                        />
                        <FormFeedback className="fw-700"> Invalid name! </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email" className="fw-500 mb-1">
                            Email
                        </Label>
                        <Input
                            invalid={errors.email}
                            type="email"
                            name="email"
                            innerRef={register({ validate: (v) => !v || valid_email(v) })}
                            className="mild-border"
                        />
                        <FormFeedback className="fw-700"> Invalid email! </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className="fw-500 mb-1">
                            Password
                        </Label>
                        <Input
                            invalid={errors.password}
                            type="password"
                            name="password"
                            innerRef={register}
                            className="mild-border"
                        />
                        <FormFeedback className="fw-700"> Invalid password! </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmpassword" className="fw-500 mb-1">
                            Confirm Password
                        </Label>
                        <Input
                            invalid={errors.confirmpassword}
                            type="password"
                            name="confirmpassword"
                            innerRef={register({
                                validate: (v) => v === password.current,
                            })}
                            className="mild-border"
                        />
                        <FormFeedback className="fw-700"> Passwords do not match! </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="education" className="fw-500 mb-1">
                            Education
                        </Label>
                        {education.map((E, idx) => (
                            <E
                                idx={idx}
                                key={idx}
                                register={register}
                                errors={errors}
                                watch={watch}
                            />
                        ))}
                    </FormGroup>
                    <Button
                        outline
                        color="light"
                        onClick={addEducation}
                        className="w-100 mb-4 text-dark"
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

export default EditProfile;
