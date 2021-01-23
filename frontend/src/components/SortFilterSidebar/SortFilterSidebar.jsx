import "./styles.scss";
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input } from "reactstrap";

const SortFilterSidebar = ({
    setSortOrder,
    setDescending,
    descending,
    typeFilter,
    setTypeFilter,
    salaryFilter,
    setSalaryFilter,
    setDurationFilter,
}) => {
    const addType = (type) => {
        typeFilter.add(type);
        setTypeFilter(new Set(typeFilter));
    };

    const removeType = (type) => {
        typeFilter.delete(type);
        setTypeFilter(new Set(typeFilter));
    };

    const fromSalary = (value) => {
        setSalaryFilter({ ...salaryFilter, from: value ? value : -Infinity });
    };

    const toSalary = (value) => {
        setSalaryFilter({ ...salaryFilter, to: value ? value : Infinity });
    };

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Card className="p-2">
                        <CardBody className="pb-0">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="fw-700 d-flex align-items-center">
                                    <img src="/sort.svg" alt="" className="mr-2" />
                                    Sort by
                                </div>
                                <FormGroup
                                    tag="fieldset"
                                    className="d-flex flex-column justify-content-center mb-1"
                                >
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type="radio"
                                                name="descending"
                                                checked={!descending}
                                                onChange={() => setDescending(false)}
                                            />
                                            <div className="ml-2">Asc ↑</div>
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type="radio"
                                                name="descending"
                                                checked={descending}
                                                onChange={() => setDescending(true)}
                                            />
                                            <div className="ml-2">Des ↓</div>
                                        </Label>
                                    </FormGroup>
                                </FormGroup>
                            </div>
                            <hr />
                            <FormGroup tag="fieldset">
                                <FormGroup check className="my-2">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sortby"
                                            onChange={() => setSortOrder("salary")}
                                        />
                                        <div className="ml-2">Salary</div>
                                    </Label>
                                </FormGroup>
                                <FormGroup check className="my-2">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sortby"
                                            onChange={() => setSortOrder("duration")}
                                        />
                                        <div className="ml-2">Duration</div>
                                    </Label>
                                </FormGroup>
                                <FormGroup check className="my-2">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sortby"
                                            onChange={() => setSortOrder("rating")}
                                        />
                                        <div className="ml-2">Rating</div>
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
                <Col className="mt-3">
                    <Card className="p-2">
                        <CardBody className="pb-0">
                            <div className="fw-700 d-flex align-items-center">
                                <img src="/filter.svg" alt="" className="mr-2" />
                                Filters
                            </div>
                            <hr />
                            <div className="fw-500 mb-1"> Job Type </div>
                            <FormGroup tag="fieldset">
                                <FormGroup check className="my-2">
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            checked={typeFilter.has("part_time")}
                                            onChange={(e) =>
                                                e.target.checked
                                                    ? addType("part_time")
                                                    : removeType("part_time")
                                            }
                                        />
                                        <div className="ml-2">Part Time</div>
                                    </Label>
                                </FormGroup>
                                <FormGroup check className="my-2">
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            checked={typeFilter.has("full_time")}
                                            onChange={(e) =>
                                                e.target.checked
                                                    ? addType("full_time")
                                                    : removeType("full_time")
                                            }
                                        />
                                        <div className="ml-2">Full Time</div>
                                    </Label>
                                </FormGroup>
                                <FormGroup check className="my-2">
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            checked={typeFilter.has("work_from_home")}
                                            onChange={(e) =>
                                                e.target.checked
                                                    ? addType("work_from_home")
                                                    : removeType("work_from_home")
                                            }
                                        />
                                        <div className="ml-2">Work from Home</div>
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                            <div className="fw-500 my-1 mb-3"> Salary Range </div>
                            <FormGroup className="d-flex align-items-center">
                                <Input
                                    type="number"
                                    className="input-border w-50 mr-2"
                                    placeholder="Min"
                                    value={salaryFilter.from}
                                    onChange={(e) => fromSalary(e.target.value)}
                                />
                                -
                                <Input
                                    type="number"
                                    className="input-border w-50 ml-2"
                                    placeholder="Max"
                                    value={salaryFilter.to === Infinity ? "∞" : salaryFilter.to}
                                    onChange={(e) => toSalary(e.target.value)}
                                />
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SortFilterSidebar;
