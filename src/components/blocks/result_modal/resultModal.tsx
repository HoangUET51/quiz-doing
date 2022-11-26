import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";

interface QuestionProps {
  show: boolean;
  setShow: any;
  result: {
    countCorrect: any;
    countTotal: any;
  };
  count: any;
  handleFinish: () => void;
}

export default function ResultModal(props: QuestionProps) {
  const { show, setShow, result, count, handleFinish } = props;

  useEffect(() => {
    if (count === 0) {
      setShow(true);
      handleFinish();
    }
  }, [count]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        size="sm"
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
