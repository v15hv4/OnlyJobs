import { useEffect } from "react";
import { Row, Col } from "reactstrap";

import ApplicationsService from "api/applications";

import PageContainer from "components/PageContainer";
import ApplicationsList from "./components/ApplicationsList";
import LoadingIndicator from "components/LoadingIndicator";

const Applications = () => {
    const [applications, applicationsHandlers] = ApplicationsService();
    useEffect(() => applicationsHandlers.view(), []); // eslint-disable-line

    return (
        <PageContainer navbar>
            <Row className="body-height overflow-auto">
                <Col className="mt-5">
                    {!applications.loading ? (
                        <ApplicationsList
                            applications={applications.data}
                            refreshList={() => applicationsHandlers.view()}
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
