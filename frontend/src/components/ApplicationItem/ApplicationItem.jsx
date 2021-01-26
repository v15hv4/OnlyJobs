import "./styles.scss";
import { useContext } from "react";
import { Card, CardBody, CardHeader, CardFooter, Badge, Button } from "reactstrap";

import { SessionContext } from "App";
import ApplicationService from "api/applications";

import StarRatingComponent from "react-star-rating-component";

const ApplicationItem = ({
    _id,
    state,
    SOP,
    join_date,
    applied_date,
    job,
    applicant,
    refreshList,
}) => {
    const [application, applicationHandlers] = ApplicationService();

    const stateCallbacks = {
        shortlist: () => applicationHandlers.edit(_id, { state: "shortlisted" }),
        accept: () => applicationHandlers.accept(_id),
        reject: () => applicationHandlers.edit(_id, { state: "rejected" }),
    };

    const { session } = useContext(SessionContext);

    return (
        <Card className="d-flex flex-fill p-3">
            {session.user.role === "applicant" && (
                <CardHeader className="d-flex justify-content-between">
                    <div>
                        <div className="h3 font-weight-bold">{job.title}</div>
                        <div className="text-muted h5">
                            Posted on {new Date(job.post_date).toLocaleDateString("en-IN")} by{" "}
                            <span className="fw-700">{job.recruiter.name}</span>
                        </div>
                    </div>
                    <div className="text-dark d-flex align-items-center justify-content-end salary-container">
                        <div className="h3 fw-700 mr-1">
                            ₹{new Intl.NumberFormat("en-IN").format(job.salary)}
                        </div>
                        <div>per month</div>
                    </div>
                </CardHeader>
            )}
            {session.user.role === "recruiter" && (
                <CardHeader className="d-flex justify-content-between">
                    <div>
                        <div className="h3 font-weight-bold">{applicant.name}</div>
                        <div className="text-muted h5">
                            Applied on {new Date(applied_date).toLocaleDateString("en-IN")}
                        </div>
                    </div>
                    <div className="text-dark d-flex align-items-center justify-content-end salary-container">
                        {console.log(applicant.rating)}
                        <StarRatingComponent
                            className="mt-2"
                            editing={false}
                            starColor="#ffb400"
                            emptyStarColor="#aaaaaa"
                            value={applicant.rating.value}
                            starCount={5}
                            renderStarIcon={(index, value) => {
                                return (
                                    <span>
                                        <i
                                            className={
                                                index <= value ? "fas fa-star" : "far fa-star"
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
                        {console.log(applicant)}
                        <div className="ml-1 text-muted">({applicant.rating.amount})</div>
                    </div>
                </CardHeader>
            )}
            {session.user.role === "applicant" && (
                <CardBody>
                    {/* TODO: change to applied_date */}
                    <div className="">
                        You applied to this listing on
                        <span className="fw-700 ml-1">
                            {new Date(applied_date).toLocaleDateString("en-IN")}.
                        </span>
                    </div>
                    <div className="mt-1">
                        Statement of purpose:
                        <div className="border rounded p-2 px-3 mt-2">"{SOP}"</div>
                    </div>
                </CardBody>
            )}
            {session.user.role === "recruiter" && (
                <CardBody>
                    <div className="mt-1">
                        E-Mail Address: <code>{applicant.email}</code>
                    </div>
                    {applicant.skills.length ? (
                        <div className="mt-3">
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
                    <div className="mt-3">
                        Statement of purpose:
                        <div className="border rounded p-2 px-3 mt-2">"{SOP}"</div>
                    </div>
                </CardBody>
            )}
            <CardFooter
                className={`d-flex justify-content-${
                    session.user.role === "recruiter" || state === "accepted" ? "between" : "end"
                }`}
            >
                {session.user.role === "recruiter" &&
                    (state === "applied" ? (
                        <div>
                            <Button
                                type="button"
                                color="warning"
                                onClick={() => {
                                    stateCallbacks.shortlist();
                                    refreshList();
                                }}
                                className="fw-500 mr-2"
                            >
                                Shortlist
                            </Button>
                            <Button
                                type="button"
                                color="danger"
                                onClick={() => {
                                    stateCallbacks.reject();
                                    refreshList();
                                }}
                                className="fw-500"
                            >
                                Reject
                            </Button>
                        </div>
                    ) : state === "shortlisted" ? (
                        <div>
                            <Button
                                type="button"
                                color="success"
                                onClick={() => {
                                    stateCallbacks.accept();
                                    refreshList();
                                }}
                                className="fw-500 mr-2"
                            >
                                Accept
                            </Button>
                            <Button
                                type="button"
                                color="danger"
                                onClick={() => {
                                    stateCallbacks.reject();
                                    refreshList();
                                }}
                                className="fw-500"
                            >
                                Reject
                            </Button>
                        </div>
                    ) : null)}
                {state === "accepted" ? (
                    <div className="d-flex align-items-center">
                        Date of joining:
                        <span className="fw-700 ml-1">
                            {new Date(join_date).toLocaleDateString()}
                        </span>
                    </div>
                ) : null}
                <div
                    className={`text-uppercase d-flex justify-content-center align-items-center fw-700 px-4 py-2 rounded state-${state}`}
                >
                    {state}
                </div>
            </CardFooter>
        </Card>
    );
};

export default ApplicationItem;
