import { Alert } from "reactstrap";

const SuccessAlert = ({ message }) => {
    return (
        <Alert color="success" className="mt-3 fw-700 bg-success text-light border-0">
            {message}
        </Alert>
    );
};

export default SuccessAlert;
