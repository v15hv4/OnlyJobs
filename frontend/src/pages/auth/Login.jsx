import { Row, Col } from "reactstrap";
import PageContainer from "components/PageContainer";

const Login = () => {
    return (
        <PageContainer>
            <Row className="h-100">
                <Col
                    sm={7}
                    className="d-flex flex-column justify-content-center align-items-center"
                >
                    <img src="/onlyjobs_full.svg" alt="OnlyJobs" className="w-75" />
                    <div className="mt-4 h4 font-italic font-weight-light">
                        &lt;insert epic tagline here&gt;
                    </div>
                </Col>
                <Col className="d-flex justify-content-center align-items-center bg-dark text-light">
                    form
                </Col>
            </Row>
        </PageContainer>
    );
};

export default Login;
