import { Link } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";

import NullIndicator from "components/NullIndicator";
import EmployeeItem from "components/EmployeeItem";

const EmployeesList = ({ employees, refreshList }) => {
    if (!employees.length)
        return (
            <NullIndicator>
                <div>You have no employees yet.</div>
                <div className="text-center mt-3">
                    <Link to="/dashboard" className="fw-700 text-dark ml-2">
                        ← Manage other listings.
                    </Link>
                </div>
            </NullIndicator>
        );
    return (
        <Container fluid>
            <Row>
                {employees.map((employee, idx) => (
                    <Col md={6} className="mb-4 d-flex flex-fill">
                        <EmployeeItem key={idx} {...employee} refreshList={refreshList} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default EmployeesList;
