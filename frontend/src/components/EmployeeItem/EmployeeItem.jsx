import { Card, CardBody, CardHeader, CardFooter, Badge, Button } from "reactstrap";

import StarRatingComponent from "react-star-rating-component";

const EmployeeItem = ({ _id, join_date, job, applicant, refreshList }) => {
    return (
        <Card className="d-flex flex-fill p-3">
            <CardHeader className="d-flex justify-content-between">
                <div>
                    <div className="h3 font-weight-bold">{applicant.name}</div>
                </div>
                <div className="text-dark d-flex align-items-center justify-content-end salary-container">
                    <StarRatingComponent
                        className="d-flex align-items-center mt-2"
                        editing={false}
                        starColor="#ffb400"
                        emptyStarColor="#ffb400"
                        value={applicant.rating.value}
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
