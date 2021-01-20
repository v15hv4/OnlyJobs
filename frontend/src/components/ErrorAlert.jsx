import { Alert } from "reactstrap";

const ErrorAlert = ({ message }) => {
    return (
        <Alert color="danger" className="mt-3 fw-700 bg-danger text-light border-0">
            Error: {message}
        </Alert>
    );
};

export default ErrorAlert;
