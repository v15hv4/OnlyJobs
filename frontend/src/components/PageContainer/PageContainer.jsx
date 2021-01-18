import { Container } from "reactstrap";
import "./styles.scss";

import Navigation from "../Navigation";

const PageContainer = ({ navbar, children }) => {
    return (
        <>
            {navbar && <Navigation />}
            <Container fluid className={`page-container${navbar && "-navbar"}`}>
                {children}
            </Container>
        </>
    );
};

export default PageContainer;
