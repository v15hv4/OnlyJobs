import { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";

import JobService from "api/jobs";

import PageContainer from "components/PageContainer";
import JobsList from "./components/JobsList";
import Searchbar from "components/Searchbar";
import SortFilterSidebar from "components/SortFilterSidebar";
import LoadingIndicator from "components/LoadingIndicator";

const Dashboard = () => {
    const [jobs, jobHandlers] = JobService();
    useEffect(() => jobHandlers.view({ state: "available" }), []); // eslint-disable-line

    // searchbar state
    const [searchTerm, setSearchTerm] = useState("");

    // sort states
    const [sortOrder, setSortOrder] = useState((o) => o);
    const [descending, setDescending] = useState(false);

    // filter states
    const jobTypes = new Set(["part_time", "full_time", "work_from_home"]);
    const [typeFilter, setTypeFilter] = useState(jobTypes);
    const [salaryFilter, setSalaryFilter] = useState({ from: -Infinity, to: Infinity });
    const [durationFilter, setDurationFilter] = useState(7);

    const [filteredList, setFilteredList] = useState([]);
    useEffect(() => !jobs.loading && setFilteredList(jobs.data), [jobs.data, jobs.loading]);

    // searchbar + filter + sort logic
    useEffect(() => {
        const sortOrders = {
            salary: (a, b) => a.salary > b.salary,
            duration: (a, b) => a.duration > b.duration,
            rating: (a, b) => a.rating.value > b.rating.value,
        };

        if (!jobs.data) return [];
        if (descending) {
            setFilteredList(
                jobs.data
                    .filter((o) => o.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .filter((o) => typeFilter.has(o.type))
                    .filter((o) => salaryFilter.from <= o.salary && o.salary <= salaryFilter.to)
                    .filter((o) => o.duration < durationFilter)
                    .sort(sortOrders[sortOrder])
                    .reverse()
            );
        } else {
            setFilteredList(
                jobs.data
                    .filter((o) => o.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .filter((o) => typeFilter.has(o.type))
                    .filter((o) => salaryFilter.from <= o.salary && o.salary <= salaryFilter.to)
                    .filter((o) => o.duration < durationFilter)
                    .sort(sortOrders[sortOrder])
            );
        }
    }, [searchTerm, sortOrder, descending, typeFilter, salaryFilter, durationFilter, jobs.data]);

    return (
        <PageContainer navbar>
            <Row className="body-height overflow-auto">
                <Col sm={3} className="mt-5">
                    <SortFilterSidebar
                        setSortOrder={setSortOrder}
                        setDescending={setDescending}
                        descending={descending}
                        typeFilter={typeFilter}
                        setTypeFilter={setTypeFilter}
                        salaryFilter={salaryFilter}
                        setSalaryFilter={setSalaryFilter}
                        setDurationFilter={setDurationFilter}
                    />
                </Col>
                <Col className="mt-5">
                    <Searchbar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        className="mb-3 mild-shadow"
                    />
                    {!jobs.loading ? (
                        <JobsList
                            jobs={filteredList}
                            refreshList={() => jobHandlers.view({ state: "available" })}
                        />
                    ) : (
                        <LoadingIndicator />
                    )}
                </Col>
            </Row>
        </PageContainer>
    );
};

export default Dashboard;
