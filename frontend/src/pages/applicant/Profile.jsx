import { useEffect, useState, useContext } from "react";
import { Row, Col, Container, Badge, Button } from "reactstrap";

import { SessionContext } from "App";
import ApplicantService from "api/applicants";

import PageContainer from "components/PageContainer";
import LoadingIndicator from "components/LoadingIndicator";
import EditProfile from "./components/EditProfile";

import StarRatingComponent from "react-star-rating-component";

const Profile = () => {
    const { session } = useContext(SessionContext);

    const [applicant, applicantHandlers] = ApplicantService();
    useEffect(() => applicantHandlers.view({ _id: session.user.id }), []);

    const [success, setSuccess] = useState(false);
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        if (success) {
            applicantHandlers.view({ _id: session.user.id });
            setSuccess(false);
        }
        setModal(!modal);
    };

    return (
        <PageContainer navbar>
            <EditProfile
                modal={modal}
                toggle={toggleModal}
                applicant={applicant.data && applicant.data[0]}
                successAlert={success}
                setSuccessAlert={setSuccess}
            />
            <Row>
                <Col className="pt-5">
                    {!applicant.loading ? (
                        <Container>
                            <div>
                                <div>
                                    <div className="h3 font-weight-bold">
                                        {applicant.data[0].name}
                                    </div>
                                </div>
                                <div className="text-dark d-flex align-items-end flex-column justify-content-center salary-container h3">
                                    <StarRatingComponent
                                        editing={false}
                                        starColor="#ffb400"
                                        emptyStarColor="#ffb400"
                                        value={applicant.data[0].rating.value}
                                        starCount={5}
                                        renderStarIcon={(index, value) => {
                                            return (
                                                <span>
                                                    <i
                                                        className={
                                                            index <= value
                                                                ? "fas fa-star"
                                                                : "far fa-star"
                                                        }
                                                    />
                                                </span>
                                            );
                                        }}
                                        renderStarIconHalf={() => {
                                            return (
                                                <span>
                                                    <span style={{ position: "absolute" }}>
                                                        <i className="far fa-star" />
                                                    </span>
                                                    <span>
                                                        <i className="fas fa-star-half" />
                                                    </span>
                                                </span>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mt-3">
                                E-Mail Address:
                                <div>
                                    <code>{applicant.data[0].email}</code>
                                </div>
                            </div>
                            {applicant.data[0].education.length ? (
                                <div className="mt-2">
                                    Education:
                                    <div className="mt-1">
                                        {applicant.data[0].education.map((s) => (
                                            <div>
                                                -<span className="fw-700 mx-2">{s.name}</span>
                                                (from {new Date(s.start_year).getFullYear()}{" "}
                                                {s.end_year &&
                                                    `to ${new Date(s.end_year).getFullYear()}`}
                                                )
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                            {applicant.data[0].skills.length ? (
                                <div className="mt-2">
                                    Skills:
                                    <div className="mt-1">
                                        {applicant.data[0].skills.map((s) => (
                                            <Badge color="success" className="p-2 mr-2">
                                                {s.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
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
