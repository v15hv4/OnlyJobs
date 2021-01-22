import { Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";

const JobItem = ({
    deadline,
    duration,
    post_date,
    rating,
    salary,
    skillset,
    state,
    title,
    type,
}) => {
    return (
        <Card className="d-flex flex-fill p-3">
            <CardHeader>
                <div className="h4 font-weight-bold">{title}</div>
            </CardHeader>
            <CardBody className="d-flex flex-fill flex-column justify-content-end py-1">
                <div className="d-flex">
                    <div className="mr-2 text-capitalize">{type.split("_").join(" ")}</div>
                    <div>{`${duration} month${duration > 1 ? "s" : ""}`}</div>
                </div>
                <div>{skillset.map((skill) => skill.name)}</div>
                <div>Posted {post_date}</div>
                <div>{deadline} to apply</div>
                <div className="d-flex justify-content-between">
                    <div>₹{new Intl.NumberFormat("en-IN").format(salary)}</div>
                    <div className="d-flex">
                        <div className="h5">
                            <StarRatingComponent
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
                {state === "available" && (
                    <Button type="button" color="primary" className="fw-700 w-100 text-uppercase">
                        Apply
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default JobItem;
