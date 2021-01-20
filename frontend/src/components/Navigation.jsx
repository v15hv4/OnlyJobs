import { useState, useContext } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { NavLink as RoutedNavLink } from "react-router-dom";
import "./PageContainer/styles.scss";

import { SessionContext } from "App";

const Navigation = () => {
    const { session } = useContext(SessionContext);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const applicantItems = [
        { to: "/dashboard", title: "Dashboard" },
        { to: "/applications", title: "My Applications" },
    ];

    const recruiterItems = [
        { to: "/dashboard", title: "Dashboard" },
        { to: "/applications", title: "My Listings" },
    ];

    // determine navitems based on logged in user's role
    const navItems =
        session.user.role === "applicant"
            ? applicantItems
            : session.user.role === "recruiter"
            ? recruiterItems
            : [];

    return (
        <Navbar color="white" light expand="md" className="m-3">
            <NavbarBrand href="/">
                <img src="/onlyjobs_full.svg" alt="OnlyJobs" className="navbar-logo" />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {navItems.map((item, idx) => (
                        <NavItem className="mx-2" key={idx}>
                            <NavLink tag={RoutedNavLink} to={item.to} className="fw-700">
                                {item.title}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default Navigation;