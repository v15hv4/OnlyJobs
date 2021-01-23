import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";

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
                <Col className="mt-4">
                    <Card className="p-2">
                        <CardBody className="pb-2">
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
                            <div className="fw-500 mt-3 mb-2"> Salary Range </div>
                            <FormGroup className="d-flex align-items-center">
                                <Input
                                    type="number"
                                    className="mild-border w-50 mr-2"
                                    placeholder="Min"
                                    value={salaryFilter.from}
                                    onChange={(e) => fromSalary(e.target.value)}
                                />
                                -
                                <Input
                                    type="number"
                                    className="mild-border w-50 ml-2"
                                    placeholder="Max"
                                    value={salaryFilter.to === Infinity ? "∞" : salaryFilter.to}
                                    onChange={(e) => toSalary(e.target.value)}
                                />
                            </FormGroup>
                            <div className="fw-500 mt-4 mb-2"> Duration </div>
                            <FormGroup className="d-flex align-items-center">
                                <Select
                                    options={[
                                        { value: 1, label: "Indefinite" },
                                        { value: 2, label: "< 2 months" },
                                        { value: 3, label: "< 3 months" },
                                        { value: 4, label: "< 4 months" },
                                        { value: 5, label: "< 5 months" },
                                        { value: 6, label: "< 6 months" },
                                        { value: 7, label: "< 7 months" },
                                    ]}
                                    onChange={(e) => setDurationFilter(e.value)}
                                    className="w-100"
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
