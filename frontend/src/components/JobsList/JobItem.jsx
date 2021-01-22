import { Card, CardBody, CardHeader, CardFooter, Button, Alert } from "reactstrap";

const JobItem = ({ deadline, duration, post_date, salary, skillset, state, title, type }) => {
    return (
        <Card className="d-flex flex-fill p-3">
            <CardHeader>
                <div className="h5 font-weight-bold">{title}</div>
            </CardHeader>
            <CardBody className="d-flex flex-fill"></CardBody>
            <CardFooter></CardFooter>
        </Card>
    );
};

export default JobItem;
