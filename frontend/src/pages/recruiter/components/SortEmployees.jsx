import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input } from "reactstrap";

const SortEmployees = ({ setSortOrder, sortOrder, setDescending, descending }) => {
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
                                            onChange={() => setSortOrder("name")}
                                            checked={sortOrder === "name"}
                                        />
                                        <div className="ml-2">Employee Name</div>
                                    </Label>
                                </FormGroup>
                                <FormGroup check className="my-2">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sortby"
                                            onChange={() => setSortOrder("job_title")}
                                            checked={sortOrder === "job_title"}
                                        />
                                        <div className="ml-2">Job Title</div>
                                    </Label>
                                </FormGroup>
                                <FormGroup check className="my-2">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sortby"
                                            onChange={() => setSortOrder("join_date")}
                                            checked={sortOrder === "join_date"}
                                        />
                                        <div className="ml-2">Date of Joining</div>
                                    </Label>
                                </FormGroup>
                                <FormGroup check className="my-2">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sortby"
                                            onChange={() => setSortOrder("rating")}
                                            checked={sortOrder === "rating"}
                                        />
                                        <div className="ml-2">Rating</div>
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SortEmployees;
