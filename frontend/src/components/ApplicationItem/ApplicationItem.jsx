import "./styles.scss";
import { Card, CardBody, CardHeader, CardFooter } from "reactstrap";

const ApplicationItem = ({ state, SOP, join_date, job }) => {
    return (
        <Card className="d-flex flex-fill p-3">
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
            <CardBody>
                {/* TODO: change to applied_date */}
                <div className="">
                    You applied to this listing on
                    <span className="fw-700 ml-1">
                        {new Date(job.post_date).toLocaleDateString("en-IN")}.
                    </span>
                </div>
                <div className="mt-1">
                    Statement of purpose:
                    <div className="border rounded p-2 px-3 mt-2">"{SOP}"</div>
                </div>
            </CardBody>
            <CardFooter className="d-flex justify-content-end">
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
