import "./styles.scss";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardHeader, CardFooter, Button, Badge } from "reactstrap";

import { SessionContext } from "App";
import { TimeSince, TimeUntil } from "utils";

import StarRatingComponent from "react-star-rating-component";

const JobItem = ({
    _id,
    deadline,
    duration,
    post_date,
    rating,
    salary,
    skillset,
    state,
    title,
    type,
    recruiter,
    buttonAction,
    editJob,
    deleteJob,
    max_applications,
    max_positions,
    filled_applications,
    filled_positions,
}) => {
    const history = useHistory();
    const { session } = useContext(SessionContext);

    return (
        <Card className="d-flex flex-fill p-3">
            <CardHeader>
                <div className="h3 font-weight-bold">{title}</div>
                <div className="d-flex flex-column mb-3">
                    {session.user.role === "applicant" && (
                        <>
                            <div className="text-muted fw-500">
                                Posted {TimeSince(post_date)} ago by
                                <span className="fw-700 ml-1">{recruiter.name}</span>
                            </div>
                            <div className="text-danger fw-500">
                                {TimeUntil(deadline)} left to apply
                            </div>
                        </>
                    )}
                    {session.user.role === "recruiter" && (
                        <div className="text-danger fw-500">Deadline in {TimeUntil(deadline)}</div>
                    )}
                </div>
            </CardHeader>
            <CardBody className="d-flex flex-fill flex-column justify-content-end py-1">
                <div className="d-flex mb-3">
                    <Badge
                        color="info"
                        className="text-capitalize mr-2 d-flex align-items-center justify-content-center p-2 py-0 badge-text"
                    >
                        <img src="/clock.svg" alt="" className="badge-icon mr-1" />
                        {type.split("_").join(" ")}
                    </Badge>
                    <Badge className="my-auto p-2 d-flex align-items-center justify-content-center badge-text">
                        <img src="/calendar.svg" alt="" className="badge-icon mr-1" />
                        {duration !== 0
                            ? `${duration} month${duration > 1 ? "s" : ""}`
                            : "Indefinite"}
                    </Badge>
                </div>
                <div>
                    {skillset.map((skill) => (
                        <Badge outline color="success" className="skill-badge my-1 mr-2 p-2">
                            {skill.name}
                        </Badge>
                    ))}
                </div>
                {session.user.role === "recruiter" && (
                    <>
                        <div className="mt-3">
                            Number of Applicants:
                            <span className="fw-500">
                                <span className="fw-700 mx-1">{filled_applications}</span>
                                (max: {max_applications})
                            </span>
                        </div>
                        <div className="mt-1">
                            Remaining Positions:
                            <span className="fw-500">
                                <span className="fw-700 mx-1">
                                    {max_positions - filled_positions}
                                </span>
                                (max: {max_positions})
                            </span>
                        </div>
                    </>
                )}
                <div className="d-flex justify-content-between my-3">
                    <div className="text-secondary">
                        <div className="h4 fw-700 mb-0 pb-0">
                            ₹{new Intl.NumberFormat("en-IN").format(salary)}
                        </div>
                        <div className="mt-0 pt-0 permonth">per month</div>
                    </div>
                    <div className="d-flex my-auto ">
                        <div className="h5 my-auto">
                            <StarRatingComponent
                                id={_id}
                                name={_id}
                                editing={false}
                                starColor="#ffb400"
                                emptyStarColor="#ffb400"
                                value={rating.value}
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
                        </div>
                        <div className="ml-1 text-muted">({rating.amount})</div>
                    </div>
                </div>
            </CardBody>
            {session.user.role === "applicant" && (
                <CardFooter className="pt-0">
                    <Button
                        disabled={["applied", "full"].includes(state)}
                        outline={["applied", "full"].includes(state)}
                        type="button"
                        color={state === "full" ? "danger" : "primary"}
                        className="fw-700 w-100 text-uppercase"
                        onClick={() => buttonAction({ _id, title })}
                    >
                        {state === "applied" ? "APPLIED" : state === "full" ? "FULL" : "APPLY"}
                    </Button>
                </CardFooter>
            )}
            {session.user.role === "recruiter" && (
                <CardFooter className="pt-0 d-flex">
                    {filled_applications ? (
                        <Button
                            type="button"
                            color="primary"
                            className="fw-700 w-100 mr-2"
                            onClick={() => history.push(`/listings/${_id}/applications`)}
                        >
                            VIEW APPLICATIONS
                        </Button>
                    ) : null}
                    <Button
                        type="button"
                        color="warning"
                        className="fw-700 w-50"
                        onClick={() =>
                            editJob({
                                _id,
                                title,
                                type,
                                salary,
                                duration,
                                deadline,
                                max_applications,
                                max_positions,
                                skillset,
                            })
                        }
                    >
                        EDIT
                    </Button>
                    <Button
                        type="button"
                        color="danger"
                        className="fw-700 w-50 ml-2"
                        onClick={() => deleteJob(_id)}
                    >
                        DELETE
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

export default JobItem;
