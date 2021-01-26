import { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";

import ApplicationService from "api/applications";
import ApplicantService from "api/applicants";

import PageContainer from "components/PageContainer";
import LoadingIndicator from "components/LoadingIndicator";
import EmployeeList from "./components/EmployeeList";

const Employees = () => {
    const [applications, applicationHandlers] = ApplicationService();
    useEffect(() => applicationHandlers.view({ state: "accepted" }), []); // eslint-disable-line

    const [appl, applHandlers] = ApplicantService();
    useEffect(() => applHandlers.view(), []); // eslint-disable-line

    const [matchedApplications, setMatchedApplications] = useState([]);

    useEffect(() => {
        if (applications.data && appl.data) {
            setMatchedApplications(
                applications.data.map((a) => ({
                    ...a,
                    applicant: {
                        ...a.applicant,
                        rating: appl.data.filter((p) => p._id === a.applicant._id)[0].rating,
                        skills: appl.data.filter((p) => p._id === a.applicant._id)[0].skills,
                    },
                }))
            );
        }
    }, [applications.data, appl.data]);

    const [filteredList, setFilteredList] = useState([]);
    useEffect(() => matchedApplications.length && setFilteredList(matchedApplications), [
        matchedApplications,
    ]);

    return (
        <PageContainer navbar>
            <Row className="body-height overflow-auto">
                <Col sm={3} className="mt-5"></Col>
                <Col className="mt-5">
                    {!applications.loading ? (
                        <EmployeeList
                            employees={filteredList}
                            refreshList={() => applicationHandlers.view({ state: "accepted" })}
                        />
                    ) : (
                        <LoadingIndicator />
                    )}
                </Col>
            </Row>
        </PageContainer>
    );
};

export default Employees;
