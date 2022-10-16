import React from "react";
import Modal from "react-bootstrap/Modal";
interface QuestionProps {
  show: boolean;
  setShow: any;
  result: {
    countCorrect: any;
    countTotal: any;
  };
}
export default function ResultModal(props: QuestionProps) {
  const { show, setShow, result } = props;
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        size="sm"
        backdrop="static"
        dialogClassName="rounded-[10px]"
      >
        <Modal.Header closeButton>
          <Modal.Title>Result Questions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Counts Correct: {result.countCorrect}</div>
          <div>Counts Total: {result.countTotal}</div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
