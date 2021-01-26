import { Link } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";

import NullIndicator from "components/NullIndicator";
import ApplicationItem from "components/ApplicationItem";

const ApplicationsList = ({ applications, refreshList }) => {
    if (!applications.length)
        return (
            <NullIndicator>
                <div>You haven't applied anywhere yet.</div>
                <div className="text-center mt-3">
                    <Link to="/dashboard" className="fw-700 text-dark ml-2">
                        ← Browse more jobs.
                    </Link>
                </div>
            </NullIndicator>
        );
    return (
        <Container fluid>
            <Row>
                {applications.map((application) => (
                    <Col md={6} className="mb-4 d-flex flex-fill">
                        <ApplicationItem {...application} refreshList={refreshList} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ApplicationsList;
