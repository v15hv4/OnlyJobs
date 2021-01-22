import { useEffect } from "react";
import { Row, Col } from "reactstrap";

import JobService from "api/jobs";

import PageContainer from "components/PageContainer";
import JobsList from "components/JobsList";

const Dashboard = () => {
    const [jobs, jobHandlers] = JobService();
    useEffect(() => jobHandlers.view(), []); // eslint-disable-line

    return (
        <PageContainer navbar>
            <Row className="body-height overflow-auto">
                <Col sm={3}></Col>
                <Col>{!jobs.loading && <JobsList jobs={jobs.data} />}</Col>
            </Row>
        </PageContainer>
    );
};

export default Dashboard;
