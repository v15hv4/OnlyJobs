import { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";

import JobService from "api/jobs";

import PageContainer from "components/PageContainer";
import JobsList from "components/JobsList";
import Searchbar from "components/Searchbar";
import SortFilterSidebar from "components/SortFilterSidebar";

const sortOrders = {
    salary: (a, b) => a.salary > b.salary,
    duration: (a, b) => a.duration > b.duration,
    rating: (a, b) => a.rating.value > b.rating.value,
};

const Dashboard = () => {
    const [jobs, jobHandlers] = JobService();
    useEffect(() => jobHandlers.view({ state: "available" }), []); // eslint-disable-line

    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState((o) => o);
    const [descending, setDescending] = useState(false);

    const [filteredList, setFilteredList] = useState([]);
    useEffect(() => !jobs.loading && setFilteredList(jobs.data), [jobs.data, jobs.loading]);

    // searchbar + filter + sort logic
    useEffect(() => {
        if (!jobs.data) return [];
        if (descending) {
            setFilteredList(
                jobs.data
                    .filter((o) => o.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .sort(sortOrders[sortOrder])
                    .reverse()
            );
        } else {
            setFilteredList(
                jobs.data
                    .filter((o) => o.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .sort(sortOrders[sortOrder])
            );
        }
    }, [searchTerm, sortOrder, descending, jobs.data]);

    return (
        <PageContainer navbar>
            <Row className="body-height overflow-auto">
                <Col sm={3} className="mt-5">
                    <SortFilterSidebar
                        setSortOrder={setSortOrder}
                        setDescending={setDescending}
                        descending={descending}
                    />
                </Col>
                <Col className="mt-5">
                    <Searchbar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        className="mb-3 mild-shadow"
                    />
                    {!jobs.loading && <JobsList jobs={filteredList} />}
                </Col>
            </Row>
        </PageContainer>
    );
};

export default Dashboard;
