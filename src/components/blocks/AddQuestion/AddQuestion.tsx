import clsx from "clsx";
import { Form, Formik, FormikContextType } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Button } from "../../../components/parts/button/button";
import { FormControl } from "../../parts/form-control/form-control";
import { Input } from "../../parts/input/input";
import plus from "../../../asset/img/plus3.png";
import sub from "../../../asset/img/subtrac1.png";
import { getAllQuestions } from "../../../api/apiCreate/api-create";
import TableQuestion from "../../parts/table_question/table_question";
interface InitialValueAdd {
  description: string;
  answer:string;
}
export default function AddQuestion() {
  const formRef = React.createRef<FormikContextType<InitialValueAdd>>();
  const [listQuestion,setListQuestion] = useState<any>([])
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const initialValues: InitialValueAdd = {
    description: "",
    answer: '',
  };

  useEffect(()=>{
    handleGetAllQuestion()
  },[])

  const handleGetAllQuestion = async()=> {
    let res = await getAllQuestions()
    if(res && res.EC ===0) {
      setListQuestion(res.DT)
    }
  }
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      innerRef={formRef}
      onSubmit={() => {}}
      validateOnChange
      validateOnMount
      validateOnBlur
    >
      <Form>
        <form className="row g-3">
          <div className="col-md-4">
            <FormControl name="description">
              <label className="form-label">Description</label>
              <Input
                hasShadow={false}
                width="w-auto mt-0"
                className="!max-w-full"
                inputClassName="font-[Arial] outline-none"
                errorClassName="!text-[#e54e87] !font-normal"
                placeholder="Description"
              />
            </FormControl>
          </div>
          <div className="col-md-2">
            <label
              className={clsx(
                "form-label bg-[#e2e1e1] p-2 rounded cursor-pointer mt-[30px]"
              )}
              htmlFor="labelInput"
            >
              Upload File Image
            </label>
            <input type="file" hidden id="labelInput" />
          </div>
          <div className="col-md-1 relative">
            <img
              src={plus}
              alt="plus"
              className="w-[50px] h-[50px] absolute top-6"
            />
            <img
              src={sub}
              alt="plus"
              className="w-[50px] h-[50px] absolute top-6 left-[50px]"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Select Quiz</label>
            <Select options={options} />
          </div>
          <div className="col-md-7">
            <FormControl name="answer">
              <label className="form-label">Answer</label>
              <Input
                hasShadow={false}
                width="w-auto mt-0"
                className="!max-w-full"
                inputClassName="font-[Arial] outline-none"
                errorClassName="!text-[#e54e87] !font-normal"
                placeholder="Answer"
              />
            </FormControl>
          </div>
          <div className="col-md-1 relative">
            <img
              src={plus}
              alt="plus"
              className="w-[50px] h-[50px] absolute top-6"
            />
            <img
              src={sub}
              alt="plus"
              className="w-[50px] h-[50px] absolute top-6 left-[50px]"
            />
          </div>
          <div className='col-md-6'> 

          <Button label="Save"/>
          <div className="my-3">Tabel Question</div>
          <TableQuestion listQuestion={listQuestion} handleGetAllQuestion={handleGetAllQuestion}/>
          </div>
        </form>
      </Form>
    </Formik>
  );
}
