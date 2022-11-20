import React, { useState, useEffect } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Button } from "../../parts/button/button";
import Select from "react-select";
import clsx from "clsx";
import iconImg from "../../../asset/img/add-img.png";
import { updateQuiz } from "../../../api/apiCreate/api-create";
import { toast } from "react-toastify";
interface IAddQuiz {
  show: any;
  setShow: any;
  currentEditQuiz: any;
  handleGetAllQuiz: () => void;
}
export default function ModalUpdateQuiz(props: IAddQuiz) {
  const { show, setShow, currentEditQuiz, handleGetAllQuiz } = props;
  const [selectedOption, setSelectedOption] = useState<any>({
    value: "Please choose quiz",
    label: "Please choose quiz",
  });
  const options = [
    { value: "EASY", label: "EASY" },
    {
      value: "MEDIUM",
      label: "MEDIUM",
    },
    {
      value: "HARD",
      label: "HARD",
    },
  ];

  const [name, setName] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [imgFile, setImgFile] = useState<any>("");
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    setName(currentEditQuiz.name);
    setDescription(currentEditQuiz.description);
    setSelectedOption({
      value: currentEditQuiz.difficulty,
      label: currentEditQuiz.difficulty,
    });
    setImgFile(currentEditQuiz.image);
  }, [currentEditQuiz]);

  const handleImage = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setImgFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpdateQuiz = async () => {
    let res = await updateQuiz(
      currentEditQuiz.id,
      description,
      name,
      selectedOption.value,
      imgFile
    );
    if (res.EC === 0) {
      handleClose();
      handleGetAllQuiz();
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        dialogClassName="rounded-[10px]"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <FloatingLabel
                controlId="updateNameQuiz"
                label="Name"
                className="mb-3 w-full"
              >
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FloatingLabel>
            </div>
            <div className="col-md-6">
              <FloatingLabel
                controlId="updateDesQuiz"
                label="Description"
                className="mb-3 w-full"
              >
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FloatingLabel>
            </div>
            <div className="col-md-6 flex flex-row">
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                className="w-2/3"
                value={selectedOption}
              />
              <div className="ml-3">
                <label
                  className="form-label rounded cursor-pointer"
                  htmlFor={`img`}
                >
                  <img
                    src={iconImg}
                    alt="add-img"
                    className={clsx("w-[40px] h-[40px]", {
                      "bg-[#16e7dd]": imgFile,
                    })}
                    onChange={(e) => handleImage(e)}
                  />
                </label>
                <input type="file" hidden id={`img`} />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            label="Close"
            theme="secondary"
            onClick={handleClose}
            className="text-black"
          />
          <Button label="Update" onClick={handleUpdateQuiz} />
        </Modal.Footer>
      </Modal>
    </>
  );
}
