import { useEffect } from "react";
import { Row, Col } from "reactstrap";

import JobService from "api/jobs";

import PageContainer from "components/PageContainer";
import JobsList from "./components/JobsList";
import LoadingIndicator from "components/LoadingIndicator";

const Listings = () => {
    const [jobs, jobHandlers] = JobService();
    useEffect(() => jobHandlers.view({ state: "available" }), []); // eslint-disable-line

    return (
        <PageContainer navbar>
            <Row className="body-height overflow-auto">
                <Col className="mt-5">
                    {!jobs.loading ? (
                        <JobsList
                            jobs={jobs.data}
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

export default Listings;
