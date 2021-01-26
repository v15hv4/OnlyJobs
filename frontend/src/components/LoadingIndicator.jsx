import { Container, Spinner } from "reactstrap";

const LoadingIndicator = () => {
    return (
        <Container className="p-5 text-muted d-flex justify-content-center align-items-center w-100 h-75">
            <Spinner color="dark" style={{ width: "3rem", height: "3rem" }} />
        </Container>
    );
};

export default LoadingIndicator;
