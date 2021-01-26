import { useState } from "react";
import { Row, Col, Container, Button } from "reactstrap";

import JobService from "api/jobs";

import JobItem from "components/JobItem";
import NullIndicator from "components/NullIndicator";
import EditModal from "./EditModal";
import AddModal from "./AddModal";

const JobsList = ({ jobs, refreshList }) => {
    const [success, setSuccess] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const toggleEditModal = () => {
        if (success) {
            refreshList();
            setSuccess(false);
        }
        setEditModal(!editModal);
    };

    const [addModal, setAddModal] = useState(false);
    const toggleAddModal = () => {
        if (success) {
            refreshList();
            setSuccess(false);
        }
        setAddModal(!addModal);
    };

    const [editJob, setEditJob] = useState(null);
    const edit = (job) => {
        setEditJob(job);
        toggleEditModal();
    };

    const [jobd, jobsHandlers] = JobService();
    const delet = (id) => {
        jobsHandlers.delete(id);
        refreshList();
    };

    return (
        <Container fluid>
            <AddModal
                modal={addModal}
                toggle={toggleAddModal}
                successAlert={success}
                setSuccessAlert={setSuccess}
            />
            <EditModal
                modal={editModal}
                toggle={toggleEditModal}
                job={editJob}
                successAlert={success}
                setSuccessAlert={setSuccess}
            />
            <Button
                type="button"
                color="success"
                onClick={toggleAddModal}
                className="fw-700 px-4"
                size="lg"
            >
                + NEW LISTING
            </Button>
            {!jobs.length ? (
                <NullIndicator> No results found. </NullIndicator>
            ) : (
                <Row>
                    {jobs.map((job, key) => (
                        <Col sm={4} md={6} className="my-3 d-flex flex-fill" key={key}>
                            <JobItem {...job} editJob={edit} deleteJob={delet} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default JobsList;
