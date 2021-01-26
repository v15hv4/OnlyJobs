import { useContext, useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter, Badge, Button } from "reactstrap";

import { SessionContext } from "App";
import ApplicantService from "api/applicants";
import SuccessAlert from "components/SuccessAlert";
import ErrorAlert from "components/ErrorAlert";

import StarRatingComponent from "react-star-rating-component";

const EmployeeItem = ({ _id, join_date, job, applicant, refreshList }) => {
    const { session } = useContext(SessionContext);
    const [rateApplicant, applicantHandlers] = ApplicantService();
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [currentRating, setCurrentRating] = useState(0);

    useEffect(() => {
        setCurrentRating(applicant.ratings.filter((r) => r.recruiter === session.user.id)[0]);
    }, [applicant.ratings]); // eslint-disable-line

    useEffect(() => {
        if (rateApplicant.data) {
            setSuccessAlert("Rated employee.");
        } else if (rateApplicant.error) {
            setErrorAlert("An error occurred.");
        }
    }, [rateApplicant.data, rateApplicant.error]);

    const handleRating = async (e) => {
        setCurrentRating(e);
        await applicantHandlers.rate(applicant._id, { rating: e });
    };

    return (
        <Card className="d-flex flex-fill p-3">
            <CardHeader className="d-flex justify-content-between">
                <div>
                    <div className="h3 font-weight-bold">{applicant.name}</div>
                </div>
                <div className="text-dark d-flex align-items-end flex-column justify-content-center salary-container">
                    <StarRatingComponent
                        name={"rating-" + _id}
                        onStarClick={handleRating}
                        starColor="#ffb400"
                        emptyStarColor="#ffb400"
                        value={currentRating && currentRating.value}
                        starCount={5}
                        renderStarIcon={(index, value) => {
                            return (
                                <span>
                                    <i className={index <= value ? "fas fa-star" : "far fa-star"} />
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
                    {successAlert && (
                        <SuccessAlert message={successAlert} className="px-2 py-0 m-0 mt-n1" />
                    )}
                    {errorAlert && <ErrorAlert message={errorAlert} className="px-2 py-1 m-0" />}
                </div>
            </CardHeader>
            <CardBody>
                <div className="text-uppercase text-muted fw-700">JOB DETAILS</div>
                <hr />
                <div className="d-flex mb-3">
                    <Badge
                        color="info"
                        className="text-capitalize mr-2 d-flex align-items-center justify-content-center p-2 py-0 badge-text"
                    >
                        <img src="/clock.svg" alt="" className="badge-icon mr-1" />
                        {job.type.split("_").join(" ")}
                    </Badge>
                    <Badge className="my-auto p-2 d-flex align-items-center justify-content-center badge-text">
                        <img src="/calendar.svg" alt="" className="badge-icon mr-1" />
                        {job.duration !== 0
                            ? `${job.duration} month${job.duration > 1 ? "s" : ""}`
                            : "Indefinite"}
                    </Badge>
                </div>
                <div className="d-flex align-items-center mt-1">
                    Job Title:
                    <span className="fw-700 ml-1">{job.title}</span>
                </div>
                <div className="d-flex align-items-center mt-2">
                    Date of joining:
                    <span className="fw-700 ml-1">{new Date(join_date).toLocaleDateString()}</span>
                </div>
                <div className="text-uppercase text-muted fw-700 mt-5">EMPLOYEE DETAILS</div>
                <hr />
                <div className="mt-3">
                    E-Mail Address: <code>{applicant.email}</code>
                </div>

                {applicant.education.length ? (
                    <div className="mt-2">
                        Education:
                        <div className="mt-1">
                            {applicant.education.map((s) => (
                                <div>
                                    -<span className="fw-700 mx-2">{s.name}</span>
                                    (from {new Date(s.start_year).getFullYear()}{" "}
                                    {s.end_year && `to ${new Date(s.end_year).getFullYear()}`})
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
                {applicant.skills.length ? (
                    <div className="mt-2">
                        Skills:
                        <div className="mt-1">
                            {applicant.skills.map((s) => (
                                <Badge color="success" className="p-2 mr-2">
                                    {s.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ) : null}
            </CardBody>
            {/* <CardFooter className={`d-flex justify-content-between`}></CardFooter> */}
        </Card>
    );
};

export default EmployeeItem;
