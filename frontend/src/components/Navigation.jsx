import { useState, useContext } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { NavLink as RoutedNavLink } from "react-router-dom";
import "./PageContainer/styles.scss";

import { SessionContext } from "App";

const Navigation = () => {
    const { session, handlers } = useContext(SessionContext);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const applicantItems = [
        { to: "/dashboard", title: "Dashboard" },
        { to: "/applications", title: "My Applications" },
    ];

    const recruiterItems = [
        { to: "/listings", title: "My Listings" },
        { to: "/employees", title: "Employees" },
    ];

    // determine navitems based on logged in user's role
    const navItems =
        session.user.role === "applicant"
            ? applicantItems
            : session.user.role === "recruiter"
            ? recruiterItems
            : [];

    return (
        <Navbar color="white" light expand="md" className="p-4">
            <NavbarBrand href="/" className="mx-2">
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
                <div className="mx-3 text-muted">|</div>
                <Nav navbar>
                    <NavItem className="mx-2">
                        <NavLink
                            tag={RoutedNavLink}
                            to={`/${session.user.role}profile`}
                            className="fw-700"
                        >
                            Profile
                        </NavLink>
                    </NavItem>
                    <NavItem className="mx-2">
                        <NavLink
                            tag={RoutedNavLink}
                            to=""
                            className="fw-700 text-danger"
                            onClick={async () => await handlers.logout()}
                        >
                            Log Out
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default Navigation;
