import { Form, Formik, FormikContextType } from "formik";
import React, { useEffect, useState } from "react";
import { FormControl } from "../../parts/form-control/form-control";
import { Input } from "../../parts/input/input";
import * as Yup from "yup";
import Select from "react-select";
import { Button } from "../../parts/button/button";
import {
  assignQuizForUser,
  deleteQuiz,
  getAllQuiz,
  GetApiUsers,
  postCreateQuiz,
} from "../../../api/apiCreate/api-create";
import clsx from "clsx";
import { toast } from "react-toastify";
import { TableQuiz } from "../../parts/table_quiz/table_quiz";
import ModalUpdateQuiz from "../ModalEditQuiz/modal-edit-quiz";
import { Accordion } from "react-bootstrap";
interface InitialValueAdd {
  name: string;
  description: string;
}
export default function AddQuiz() {
  const [show, setShow] = useState<any>(false);
  const formRef = React.createRef<FormikContextType<InitialValueAdd>>();
  const [listQuiz, setListQuiz] = useState<any>([]);
  const [image, setImage] = useState("");
  const [currentEditQuiz, setCurrentEditQuiz] = useState<any>({});
  const [selectedOption, setSelectedOption] = useState<any>({
    value: "EASY",
    label: "EASY",
  });
  const [selectedQuiz, setSelectedQuiz] = useState<any>({
    value: "Please choose quiz",
    label: "Please choose quiz",
  });

  const [selectedUser, setSelectedUser] = useState<any>({
    value: "Please choose user",
    label: "Please choose user",
  });

  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const [selectQuiz, setSelectQuiz] = useState<any>([
    {
      value: "",
      label: "",
    },
  ]);

  const [selectUser, setSelectUser] = useState<any>([
    {
      value: "",
      label: "",
    },
  ]);

  const initialValues: InitialValueAdd = {
    name: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    description: Yup.string().required("Required field"),
  });
  const handleImage = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    handleGetAllQuiz();
    handleGetAllUser();
  }, []);

  const handleGetAllQuiz = async () => {
    let res = await getAllQuiz();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
      let newQuizs = res.DT.map((item: any, index: any) => {
        return {
          value: item.id,
          label: `${item.id}-${item.description} `,
        };
      });
      setSelectQuiz(newQuizs);
    } else {
      toast.error(res.EM);
    }
  };

  const handleGetAllUser = async () => {
    let res = await GetApiUsers();
    if (res.EC === 0) {
      let newUsers = res.DT.map((item: any, index: any) => {
        return {
          value: item.id,
          label: `${item.id}-${item.email}`,
        };
      });
      setSelectUser(newUsers);
    } else {
      toast.error(res.EM);
    }
  };

  const handleAssign = async () => {
    let res = await assignQuizForUser(selectedQuiz.value, selectedUser.value);
    if (res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  const handleCreateQuiz = async () => {
    const { name, description } = formRef.current?.values as InitialValueAdd;
    let res = await postCreateQuiz(
      description,
      name,
      selectedOption.value,
      image
    );
    if (res && res.EC === 0) {
      handleGetAllQuiz();
    } else {
      toast.error(res.DT.EM);
    }
    setImage("");
    setSelectedOption({
      value: "EASY",
      label: "EASY",
    });
    formRef.current?.resetForm();
  };

  const handleDeleteQuiz = async (id: any) => {
    let res = await deleteQuiz(id);
    if (res && res.EC === 0) {
      handleGetAllQuiz();
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  const handleBtnEdit = (quiz: any) => {
    setShow(true);
    setCurrentEditQuiz(quiz);
  };
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Add Manager Quiz</Accordion.Header>
        <Accordion.Body>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            innerRef={formRef}
            onSubmit={() => {}}
            validateOnChange
            validateOnMount
            validateOnBlur
          >
            <Form>
              <form className="row g-3">
                <div className="col-md-12">
                  <FormControl name="name">
                    <label className="form-label">Name</label>
                    <Input
                      hasShadow={false}
                      width="w-full mt-0"
                      className="!max-w-full"
                      inputClassName="font-[Arial] outline-none"
                      errorClassName="!text-[#e54e87] !font-normal"
                      placeholder="Name"
                    />
                  </FormControl>
                </div>
                <div className="col-md-12">
                  <FormControl name="description">
                    <label className="form-label">Description</label>
                    <Input
                      hasShadow={false}
                      width="w-full mt-0"
                      className="!max-w-full"
                      inputClassName="font-[Arial] outline-none"
                      errorClassName="!text-[#e54e87] !font-normal"
                      placeholder="description"
                    />
                  </FormControl>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Quiz Type</label>
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                  />
                </div>
                <div className="col-md-12">
                  <label
                    className={clsx(
                      "form-label bg-[#e2e1e1] p-2 rounded cursor-pointer",
                      { "bg-[#1e7fda]": image }
                    )}
                    htmlFor="labelInput"
                  >
                    Upload File Image
                  </label>
                  <input
                    type="file"
                    hidden
                    id="labelInput"
                    onChange={(e) => handleImage(e)}
                  />
                </div>
                <Button label="Save" onClick={handleCreateQuiz} />
              </form>

              <TableQuiz
                listQuiz={listQuiz}
                handleDeleteQuiz={handleDeleteQuiz}
                handleBtnEdit={handleBtnEdit}
              />
              <ModalUpdateQuiz
                show={show}
                setShow={setShow}
                currentEditQuiz={currentEditQuiz}
                handleGetAllQuiz={handleGetAllQuiz}
              />
            </Form>
          </Formik>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Assign Quiz For User</Accordion.Header>
        <Accordion.Body>
          <div className="col-md-4 mb-[1rem] mt-2">
            <label className="form-label text-[1.2rem]">Select Quiz</label>
            <Select
              defaultValue={selectedQuiz}
              onChange={setSelectedQuiz}
              options={selectQuiz}
            />
          </div>

          <div className="col-md-4 mb-[1rem] mt-2">
            <label className="form-label text-[1.2rem]">Select User</label>
            <Select
              defaultValue={selectedUser}
              onChange={setSelectedUser}
              options={selectUser}
            />
          </div>
          <div className="col-md-6">
            <Button label="Assign" onClick={handleAssign} />
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
