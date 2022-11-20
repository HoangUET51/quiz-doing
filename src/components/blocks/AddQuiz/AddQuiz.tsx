import { Form, Formik, FormikContextType } from "formik";
import React, { useEffect, useState } from "react";
import { FormControl } from "../../parts/form-control/form-control";
import { Input } from "../../parts/input/input";
import * as Yup from "yup";
import Select from "react-select";
import { Button } from "../../parts/button/button";
import {
  deleteQuiz,
  getAllQuiz,
  postCreateQuiz,
} from "../../../api/apiCreate/api-create";
import clsx from "clsx";
import { toast } from "react-toastify";
import { TableQuiz } from "../../parts/table_quiz/table_quiz";
import ModalUpdateQuiz from "../ModalEditQuiz/modal-edit-quiz";
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
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
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
  }, []);

  const handleGetAllQuiz = async () => {
    let res = await getAllQuiz();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
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
  );
}
