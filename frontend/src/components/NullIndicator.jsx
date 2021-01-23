import { Container } from "reactstrap";

const NullIndicator = ({ children }) => {
    return (
        <Container className="p-5 m-5 text-muted d-flex justify-content-center align-items-center">
            <h3> {children}</h3>
        </Container>
    );
};

export default NullIndicator;
