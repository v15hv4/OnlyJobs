import { Row, Col, Container } from "reactstrap";

import JobItem from "./JobItem";
import NullIndicator from "../NullIndicator";

const JobsList = ({ jobs }) => {
    if (!jobs.length) return <NullIndicator> No results found. </NullIndicator>;
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
