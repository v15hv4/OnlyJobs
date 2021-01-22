import { Card, CardBody, CardHeader, CardFooter, Button, Alert } from "reactstrap";

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
                    <div>{`${rating.value} (${rating.amount})`}</div>
                </div>
            </CardBody>
            <CardFooter>{state}</CardFooter>
        </Card>
    );
};

export default JobItem;
