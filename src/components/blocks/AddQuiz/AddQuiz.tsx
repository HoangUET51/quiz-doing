import { Form, Formik, FormikContextType } from "formik";
import React, { useState } from "react";
import { FormControl } from "../../parts/form-control/form-control";
import { Input } from "../../parts/input/input";
import * as Yup from "yup";
import Select from "react-select";
interface InitialValueAdd {
  name: string;
  decription: string;
}
export default function AddQuiz() {
  const formRef = React.createRef<FormikContextType<InitialValueAdd>>();
  const [image, setImage] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<any>({
    value: "chocolate",
    label: "Chocolate",
  });
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const initialValues: InitialValueAdd = {
    name: "",
    decription: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    decription: Yup.string().required("Required field"),
  });
  const handleImage = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setImage(URL.createObjectURL(e.target.files[0]));
    }
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
            <FormControl name="decription">
              <label className="form-label">Decription</label>
              <Input
                hasShadow={false}
                width="w-full mt-0"
                className="!max-w-full"
                inputClassName="font-[Arial] outline-none"
                errorClassName="!text-[#e54e87] !font-normal"
                placeholder="Decription"
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
              className="form-label bg-[#e2e1e1] p-2 rounded cursor-pointer"
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
          <div className="col-md-12 border border-info rounded-4 text-center h-[200px] d-flex justify-center">
            {preview.length > 0 ? (
              <img src={preview} style={{ height: "100%", width: "50%" }} />
            ) : (
              <div className="d-flex justify-center items-center self-center">
                Preview Image
              </div>
            )}
          </div>
        </form>
      </Form>
    </Formik>
  );
}
