import { useEffect, useState, useContext } from "react";
import { Row, Col, Container } from "reactstrap";

import { SessionContext } from "App";
import RecruiterService from "api/recruiters";

import PageContainer from "components/PageContainer";
import LoadingIndicator from "components/LoadingIndicator";

const Profile = () => {
    const { session } = useContext(SessionContext);

    const [recruiter, recruiterHandlers] = RecruiterService();
    useEffect(() => recruiterHandlers.view({ _id: session.user.id }), []);

    return (
        <PageContainer navbar>
            <Row>
                <Col className="pt-5">
                    {!recruiter.loading ? (
                        <Container>
                            <div>
                                <div>
                                    <div className="h3 font-weight-bold">
                                        {recruiter.data[0].name}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                E-Mail Address:
                                <div>
                                    <code>{recruiter.data[0].email}</code>
                                </div>
                            </div>
                            <div className="mt-2">
                                Contact:
                                <div>
                                    <code>{recruiter.data[0].contact}</code>
                                </div>
                            </div>
                            <div className="mt-2">
                                Bio:
                                <div>
                                    <span>"{recruiter.data[0].bio}"</span>
                                </div>
                            </div>
                        </Container>
                    ) : (
                        <LoadingIndicator />
                    )}
                </Col>
            </Row>
        </PageContainer>
    );
};

export default Profile;
