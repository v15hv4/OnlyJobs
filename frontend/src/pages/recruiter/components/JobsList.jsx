import { Row, Col, Container } from "reactstrap";

import JobItem from "components/JobItem";
import NullIndicator from "components/NullIndicator";

const JobsList = ({ jobs }) => {
    if (!jobs.length) return <NullIndicator> No results found. </NullIndicator>;
    return (
        <Container fluid>
            <Row>
                {jobs.map((job, key) => (
                    <Col sm={4} md={6} className="my-3 d-flex flex-fill" key={key}>
                        <JobItem {...job} editJob={() => null} deleteJob={() => null} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default JobsList;
