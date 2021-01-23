import { Row, Col, Container } from "reactstrap";

import JobItem from "./JobItem";

const JobsList = ({ jobs }) => {
    return (
        <Container fluid>
            <Row>
                {jobs.map((job, key) => (
                    <Col sm={4} className="my-3 d-flex flex-fill" key={key}>
                        <JobItem {...job} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default JobsList;
