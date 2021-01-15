import { Row, Col } from "reactstrap";
import PageContainer from "components/PageContainer";

const Login = () => {
    return (
        <PageContainer>
            <Row className="h-75">
                <Col className="d-flex justify-content-center align-items-center"> logo </Col>
                <Col className="d-flex justify-content-center align-items-center"> form </Col>
            </Row>
        </PageContainer>
    );
};

export default Login;
