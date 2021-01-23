import { useState } from "react";
import { Row, Col, Container } from "reactstrap";

import JobItem from "components/JobItem";
import NullIndicator from "components/NullIndicator";
import ApplyModal from "../ApplyModal";

const JobsList = ({ jobs }) => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const [applyJob, setApplyJob] = useState(null);
    const apply = (job) => {
        setApplyJob(job);
        toggleModal();
    };

    if (!jobs.length) return <NullIndicator> No results found. </NullIndicator>;
    return (
        <Container fluid>
            <ApplyModal modal={modal} toggle={toggleModal} job={applyJob} />
            <Row>
                {jobs.map((job, key) => (
                    <Col sm={4} className="my-3 d-flex flex-fill" key={key}>
                        <JobItem {...job} buttonAction={apply} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default JobsList;
