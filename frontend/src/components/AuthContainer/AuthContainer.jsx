import "./styles.scss";
import { Row, Col } from "reactstrap";

import PageContainer from "components/PageContainer";

const AuthContainer = ({ children }) => {
    return (
        <PageContainer>
            <Row className="h-100">
                <Col
                    lg={7}
                    xl={8}
                    className="d-flex flex-column justify-content-center align-items-center"
                >
                    <img src="/onlyjobs_full.svg" alt="OnlyJobs" className="w-75" />
                    <div className="mt-4 h4 font-italic font-weight-light">
                        &lt;insert epic tagline here&gt;
                    </div>
                </Col>
                <Col className="d-flex bg-dark text-light auth-form-container">
                    <div className="d-flex justify-content-center w-100 auth-form-children">
                        {children}
                    </div>
                </Col>
            </Row>
        </PageContainer>
    );
};

export default AuthContainer;
