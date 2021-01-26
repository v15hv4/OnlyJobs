import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "reactstrap";

import ApplicationsService from "api/applications";
import ApplicantService from "api/applicants";

import PageContainer from "components/PageContainer";
import ApplicationsList from "./components/ApplicationsList";
import LoadingIndicator from "components/LoadingIndicator";
import SortApplications from "./components/SortApplications";

const Applications = () => {
    const { id } = useParams();
    const [applications, applicationsHandlers] = ApplicationsService();
    useEffect(() => applicationsHandlers.view({ job: id }), []); // eslint-disable-line

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

    // sort states
    const [sortOrder, setSortOrder] = useState((o) => o);
    const [descending, setDescending] = useState(false);

    const [filteredList, setFilteredList] = useState([]);
    useEffect(() => matchedApplications.length && setFilteredList(matchedApplications), [
        matchedApplications,
    ]);

    // sort logic
    useEffect(() => {
        const sortOrders = {
            name: (a, b) => a.applicant.name.toLowerCase() < b.applicant.name.toLowerCase(),
            applied_date: (a, b) => a.applied_date > b.applied_date,
            rating: (a, b) => a.applicant.rating.value > b.applicant.rating.value,
        };

        if (!matchedApplications.length) return [];
        if (descending) {
            setFilteredList(matchedApplications.sort(sortOrders[sortOrder]).reverse());
        } else {
            setFilteredList(matchedApplications.sort(sortOrders[sortOrder]));
        }
    }, [sortOrder, descending, matchedApplications]);

    return (
        <PageContainer navbar>
            <Row className="body-height overflow-auto">
                <Col sm={3} className="mt-5">
                    <SortApplications
                        setSortOrder={setSortOrder}
                        sortOrder={sortOrder}
                        setDescending={setDescending}
                        descending={descending}
                    />
                </Col>
                <Col className="mt-5">
                    {!applications.loading ? (
                        <ApplicationsList
                            applications={filteredList}
                            refreshList={() => applicationsHandlers.view({ job: id })}
                        />
                    ) : (
                        <LoadingIndicator />
                    )}
                </Col>
            </Row>
        </PageContainer>
    );
};

export default Applications;
