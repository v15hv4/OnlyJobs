import "./styles.scss";
import { Container, Input } from "reactstrap";

const Searchbar = ({ searchTerm, setSearchTerm, className }) => {
    return (
        <Container fluid className="search-container">
            <img src="/search.svg" alt="" className="search-icon" />
            <Input
                type="text"
                bsSize="lg"
                value={searchTerm}
                className={`searchbar ${className}`}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search listings..."
            />
        </Container>
    );
};

export default Searchbar;
