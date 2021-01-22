import { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";

import JobService from "api/jobs";

import PageContainer from "components/PageContainer";
import JobsList from "components/JobsList";
import Searchbar from "components/Searchbar";

const Dashboard = () => {
    const [jobs, jobHandlers] = JobService();
    useEffect(() => jobHandlers.view({ state: "available" }), []); // eslint-disable-line

    const [searchTerm, setSearchTerm] = useState("");

    const [filteredList, setFilteredList] = useState([]);
    useEffect(() => !jobs.loading && setFilteredList(jobs.data), [jobs.data, jobs.loading]);

    // searchbar + filters logic
    useEffect(() => {
        if (!jobs.data) return [];
        setFilteredList(
            jobs.data.filter((o) => o.title.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, jobs.data]);

    return (
        <PageContainer navbar>
            <Row className="body-height overflow-auto">
                <Col sm={3}></Col>
                <Col>
                    <div className="mt-4">
                        <Searchbar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            className="mb-3 mild-shadow"
                        />
                        {!jobs.loading && <JobsList jobs={filteredList} />}
                    </div>
                </Col>
            </Row>
        </PageContainer>
    );
};

export default Dashboard;
