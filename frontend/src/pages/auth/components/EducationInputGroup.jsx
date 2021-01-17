import { useContext, useRef } from "react";
import { Input, FormFeedback, Row, Col } from "reactstrap";
import { SignupFormContext } from "../Signup";

const EducationInputGroup = () => {
    const { register, errors, watch } = useContext(SignupFormContext);

    const startYear = useRef({});
    startYear.current = watch("education_from", "");

    return (
        <>
            <Row form className="mb-2">
                <Col form>
                    <Input
                        type="text"
                        name="education_name"
                        innerRef={register({ required: true })}
                        className="bg-secondary text-light"
                        placeholder="Institution Name"
                    />
                </Col>
            </Row>
            <Row form className="mb-3">
                <Col form>
                    <Input
                        invalid={errors.education_from}
                        type="number"
                        name="education_from"
                        innerRef={register({
                            required: true,
                            validate: (v) =>
                                parseInt(v) > 1900 && parseInt(v) <= new Date().getFullYear(),
                        })}
                        className="bg-secondary text-light"
                        placeholder="Start year"
                    />
                    <FormFeedback className="fw-700"> Really? </FormFeedback>
                </Col>
                <Col form>
                    <Input
                        invalid={errors.education_to}
                        type="number"
                        name="education_to"
                        innerRef={register({
                            required: false,
                            validate: (v) => {
                                console.log(v, startYear.current);
                                return v ? parseInt(v) >= parseInt(startYear.current) : true;
                            },
                        })}
                        className="bg-secondary text-light"
                        placeholder="End year (optional)"
                    />
                    <FormFeedback className="fw-700"> You can't end before starting! </FormFeedback>
                </Col>
            </Row>
        </>
    );
};

export default EducationInputGroup;
