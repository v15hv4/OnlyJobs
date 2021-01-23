import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from "reactstrap";

const ApplyModal = ({ modal, toggle, job }) => {
    return (
        <Modal size="lg" centered isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Applying for <span className="fw-700">{job && job.title}</span>
            </ModalHeader>
            <ModalBody className="p-5">
                <Label for="SOP" className="mb-3">
                    Describe your Statement of Purpose (in less than 250 words):
                </Label>
                <Input type="textarea" name="SOP" className="mild-border" rows="8" />
            </ModalBody>
            <ModalFooter>
                <Button color="success" className="fw-700 ">
                    SUBMIT
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ApplyModal;
