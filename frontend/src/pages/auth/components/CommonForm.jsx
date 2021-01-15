import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { selectStyles } from "./styles";

import Select from "react-select";

const Common = ({ addFormData, setCurrent }) => {
    const { register, handleSubmit, errors, control, watch } = useForm();

    const password = useRef({});
    password.current = watch("password", "");

    const roles = [
        { value: "applicant", label: "Applicant" },
        { value: "recruiter", label: "Recruiter" },
    ];

    const onSubmit = (data) => {
        addFormData({ ...data, role: data.role.value });
        setCurrent(data.role.value);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Label for="name" className="fw-500 mb-1">
                    Name
                </Label>
                <Input
                    invalid={errors.name}
                    type="name"
                    name="name"
                    innerRef={register({ required: true })}
                    className="bg-secondary text-light"
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
                    innerRef={register({ required: true })}
                    className="bg-secondary text-light"
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
                    innerRef={register({ required: true })}
                    className="bg-secondary text-light"
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
                        required: true,
                        validate: (v) => v === password.current,
                    })}
                    className="bg-secondary text-light"
                />
                <FormFeedback className="fw-700"> Passwords do not match! </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="role" className="fw-500 mb-1">
                    Who are you?
                </Label>
                <Controller
                    name="role"
                    options={roles}
                    styles={selectStyles}
                    control={control}
                    as={Select}
                    defaultValue={roles[0]}
                />
                <FormFeedback className="fw-700"> Required! </FormFeedback>
            </FormGroup>
            <div className="w-100 d-flex justify-content-between align-items-center mt-2">
                <Button color="primary w-100 mt-4 fw-700">NEXT &gt;</Button>
            </div>
        </Form>
    );
};

export default Common;
