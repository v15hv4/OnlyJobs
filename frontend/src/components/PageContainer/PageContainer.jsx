import "./styles.scss";
import { Container } from "reactstrap";

const PageContainer = ({ children }) => {
    return (
        <Container fluid className="page-container">
            {children}
        </Container>
    );
};

export default PageContainer;
