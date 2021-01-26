import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "reactstrap";

import ApplicationsService from "api/applications";

import PageContainer from "components/PageContainer";
import ApplicationsList from "./components/ApplicationsList";
import LoadingIndicator from "components/LoadingIndicator";

const Applications = () => {
    const { id } = useParams();
    const [applications, applicationsHandlers] = ApplicationsService();
    useEffect(() => applicationsHandlers.view({ job: id }), []); // eslint-disable-line

    useEffect(() => console.log(applications.data), [applications]);

    return (
        <PageContainer navbar>
            <Row className="body-height overflow-auto">
                <Col className="mt-5">
                    {!applications.loading ? (
                        <ApplicationsList
                            applications={applications.data}
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
