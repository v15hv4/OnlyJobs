import { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    FormFeedback,
    Input,
    Label,
    Row,
    Col,
} from "reactstrap";

import { SessionContext } from "App";
import JobService from "api/jobs";
import LanguageService from "api/languages";

import ErrorAlert from "components/ErrorAlert";
import SuccessAlert from "components/SuccessAlert";

import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const EditModal = ({ modal, toggle, job, successAlert, setSuccessAlert }) => {
    const types = [
        { value: "part_time", label: "Part Time" },
        { value: "full_time", label: "Full Time" },
        { value: "work_from_home", label: "Work from Home" },
    ];

    const { session } = useContext(SessionContext);
    const { register, handleSubmit, errors, control } = useForm();

    const [job2, jobHandlers] = JobService();
    const [skills, skillsActions] = LanguageService();
    useEffect(() => skillsActions.view(), []); // eslint-disable-line

    const formattedSkills = () => {
        if (skills.loading) return [{ value: "loading", error: "Loading..." }];
        else if (skills.data) return skills.data.map((s) => ({ value: s._id, label: s.name }));
        else return [{ value: "error", error: "Error loading skills!" }];
    };

    const addSkill = async (skill) => {
        await skillsActions.add({ name: skill });
        if (!skills.error) setSuccessAlert(`Language '${skill}' added to list!`);
    };

    // control error alert
    const [errorAlert, setErrorAlert] = useState(false);
    useEffect(() => setErrorAlert(false), [job2]);
    useEffect(() => job2.error && setErrorAlert(job2.error), [job2]);

    useEffect(() => setSuccessAlert(false), [job2, setSuccessAlert]);
    useEffect(() => job2.data && setSuccessAlert("Edited job successfully!"), [
        job2.data,
        setSuccessAlert,
    ]);

    const onSubmit = async (data) => {
        const postData = {
            ...data,
            type: data.type.value,
            recruiter: session.user.id,
            skillset: data.skillset.map((s) => s.value),
        };
        await jobHandlers.edit(job._id, postData);
    };

    return (
        <Modal size="lg" centered isOpen={modal} toggle={toggle}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={toggle}>
                    Editing <span className="fw-700">{job && job.title}</span>
                </ModalHeader>
                <ModalBody className="p-5">
                    <FormGroup>
                        <Label for="title"> Title </Label>
                        <Input
                            invalid={errors.title}
                            name="title"
                            type="text"
                            className="mild-border"
                            defaultValue={job && job.title}
                            innerRef={register({ required: "Title is required!" })}
                        />
                        <FormFeedback>{errors.title && errors.title.message}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="type"> Type </Label>
                        <Controller
                            name="type"
                            options={types}
                            control={control}
                            as={Select}
                            defaultValue={job && types.filter((t) => t.value === job.type)[0]}
                        />
                        <FormFeedback>{errors.type && errors.type.message}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="salary"> Salary (per month) </Label>
                        <Input
                            invalid={errors.salary}
                            name="salary"
                            type="number"
                            className="mild-border"
                            defaultValue={job && job.salary}
                            innerRef={register({ required: "Salary is required!", min: 0 })}
                        />
                        <FormFeedback>{errors.salary && errors.salary.message}</FormFeedback>
                    </FormGroup>
                    <Row form>
                        <Col form>
                            <FormGroup>
                                <Label for="deadline"> Deadline </Label>
                                <Input
                                    invalid={errors.deadline}
                                    name="deadline"
                                    type="date"
                                    className="mild-border"
                                    defaultValue={
                                        job && new Date(job.deadline).toISOString().split("T")[0]
                                    }
                                    innerRef={register({
                                        required: "This field is required!",
                                        validate: (v) => new Date(v) >= new Date(),
                                    })}
                                />
                                <FormFeedback>
                                    {errors.deadline && errors.deadline.message}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col xs={4} form>
                            <FormGroup>
                                <Label for="duration"> Duration (in months) </Label>
                                <Input
                                    invalid={errors.duration}
                                    name="duration"
                                    type="number"
                                    className="mild-border"
                                    defaultValue={job && job.duration}
                                    innerRef={register({
                                        required: "Duration is required!",
                                        validate: (v) => 0 <= v && v < 7,
                                    })}
                                />
                                <FormFeedback>
                                    {errors.duration && errors.duration.message}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col form>
                            <FormGroup>
                                <Label for="max_applications"> Maximum applications allowed </Label>
                                <Input
                                    invalid={errors.max_applications}
                                    name="max_applications"
                                    type="number"
                                    className="mild-border"
                                    defaultValue={job && job.max_applications}
                                    innerRef={register({
                                        required: "This field is required!",
                                        min: 1,
                                    })}
                                />
                                <FormFeedback>
                                    {errors.max_applications && errors.max_applications.message}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col form>
                            <FormGroup>
                                <Label for="max_positions"> Maximum positions available </Label>
                                <Input
                                    invalid={errors.max_positions}
                                    name="max_positions"
                                    type="number"
                                    className="mild-border"
                                    defaultValue={job && job.max_positions}
                                    innerRef={register({
                                        required: "This field is required!",
                                        min: 1,
                                    })}
                                />
                                <FormFeedback>
                                    {errors.max_positions && errors.max_positions.message}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="skillset"> Skillset </Label>
                        <Controller
                            name="skillset"
                            options={formattedSkills()}
                            control={control}
                            as={CreatableSelect}
                            isClearable
                            isDisabled={skills.loading}
                            isLoading={skills.loading}
                            onCreateOption={addSkill}
                            defaultValue={
                                job && job.skillset.map((s) => ({ value: s._id, label: s.name }))
                            }
                            placeholder="Search..."
                            isMulti
                        />
                        <FormFeedback>{errors.skillset && errors.skillset.message}</FormFeedback>
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

export default EditModal;
