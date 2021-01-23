import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input } from "reactstrap";

const SortFilterSidebar = ({ setSortOrder, setDescending, descending }) => {
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
                    <Card>
                        <CardBody>
                            <div className="fw-700 d-flex align-items-center">
                                <img src="/filter.svg" alt="" className="mr-2" />
                                Filters
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SortFilterSidebar;
