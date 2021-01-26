import { useEffect, useState, useContext } from "react";
import { Row, Col, Container, Button } from "reactstrap";

import { SessionContext } from "App";
import RecruiterService from "api/recruiters";

import PageContainer from "components/PageContainer";
import LoadingIndicator from "components/LoadingIndicator";
import EditProfile from "./components/EditProfile";

const Profile = () => {
    const { session } = useContext(SessionContext);

    const [recruiter, recruiterHandlers] = RecruiterService();
    useEffect(() => recruiterHandlers.view({ _id: session.user.id }), []);

    const [success, setSuccess] = useState(false);
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        if (success) {
            recruiterHandlers.view({ _id: session.user.id });
            setSuccess(false);
        }
        setModal(!modal);
    };

    return (
        <PageContainer navbar>
            <EditProfile
                modal={modal}
                toggle={toggleModal}
                recruiter={recruiter.data && recruiter.data[0]}
                successAlert={success}
                setSuccessAlert={setSuccess}
            />
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
                            <Button
                                color="warning"
                                type="buton"
                                onClick={toggleModal}
                                className="fw-700 mt-5"
                            >
                                EDIT PROFILE
                            </Button>
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
