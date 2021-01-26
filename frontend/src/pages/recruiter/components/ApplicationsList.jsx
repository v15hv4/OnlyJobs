import { Link } from "react-router-dom";
import { Row, Col, Container, Button } from "reactstrap";

import NullIndicator from "components/NullIndicator";
import ApplicationItem from "components/ApplicationItem";

const ApplicationsList = ({ applications, refreshList }) => {
    if (!applications.length)
        return (
            <NullIndicator>
                <div>There are no applications yet for this listing.</div>
                <div className="text-center mt-3">
                    <Link to="/dashboard" className="fw-700 text-dark ml-2">
                        ← Manage other listings.
                    </Link>
                </div>
            </NullIndicator>
        );
    return (
        <Container fluid>
            <Button
                tag={Link}
                to="/listings"
                type="button"
                color="dark"
                className="fw-700 px-4"
                size="lg"
            >
                ← GO BACK
            </Button>
            <Row className="mt-3">
                {applications.map((application, idx) => (
                    <Col md={6} className="mb-4 d-flex flex-fill">
                        <ApplicationItem key={idx} {...application} refreshList={refreshList} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ApplicationsList;
