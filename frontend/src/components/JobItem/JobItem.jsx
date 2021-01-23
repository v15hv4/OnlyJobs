import "./styles.scss";
import { Card, CardBody, CardHeader, CardFooter, Button, Badge } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";

import { TimeSince, TimeUntil } from "utils";

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
    buttonAction,
}) => {
    return (
        <Card className="d-flex flex-fill p-3">
            <CardHeader>
                <div className="d-flex justify-content-between mb-3">
                    <div className="text-muted fw-500">{TimeSince(post_date)} ago</div>
                    <div className="text-danger fw-500">{TimeUntil(deadline)} left</div>
                </div>
                <div className="h3 font-weight-bold">{title}</div>
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
                        <Badge outline color="success" className="skill-badge my-1 mr-1 p-1">
                            {skill.name}
                        </Badge>
                    ))}
                </div>
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
                                className="d-flex align-items-center"
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
            <CardFooter className="pt-0">
                <Button
                    disabled={state === "applied"}
                    type="button"
                    color="primary"
                    className="fw-700 w-100 text-uppercase"
                    onClick={() => buttonAction({ _id, title })}
                >
                    {state === "applied" ? "APPLIED" : "APPLY"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default JobItem;
