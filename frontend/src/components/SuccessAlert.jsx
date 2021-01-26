import { Alert } from "reactstrap";

const SuccessAlert = ({ message, className }) => {
    return (
        <Alert
            color="success"
            className={`mt-3 fw-700 bg-success text-light border-0 ${className}`}
        >
            {message}
        </Alert>
    );
};

export default SuccessAlert;
