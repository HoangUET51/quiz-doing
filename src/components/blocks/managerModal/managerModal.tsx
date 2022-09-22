import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PostApiCreate } from "../../../api/apiCreate/api-create";
import { Button } from "../../parts/button/button";
import { toast } from "react-toastify";
import { Form, Formik, FormikContextType, useFormikContext } from "formik";
import { FormControl } from "../../parts/form-control/form-control";
import { Input } from "../../parts/input/input";
import * as Yup from "yup";
interface AddNewProps {
  show: any;
  handleShow: () => void;
  setShow: any;
}

interface InitialValueAdd {
  email: string;
  password: string;
  name: string;
}

const AddNewModal = (props: AddNewProps) => {
  const formRef = React.createRef<FormikContextType<InitialValueAdd>>();

  const initialValues: InitialValueAdd = {
    email: "",
    password: "",
    name: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required field").email(),
    password: Yup.string()
      .required("Required field")
      .min(8, "Your password is too short."),
    name: Yup.string().required("Required field"),
  });

  const { show, handleShow, setShow } = props;
  const [role, setRole] = useState<string>("USER");
  const [image, setImage] = useState<string>("");
  const [preview, setPreview] = useState<string>("");

  const handleClose = () => {
    setShow(false);
    setRole("USER");
    setImage("");
    setPreview("");
    formRef.current?.resetForm();
  };

  const handleImage = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    const { email, password, name } = formRef.current
      ?.values as InitialValueAdd;

    let data = await PostApiCreate(email, password, name, role, image);
    if (data && data.EC === 0) {
      handleClose();
      toast.success("Create data successfully");
    } else if (data && data.EC !== 0) {
      toast.error(data.EM);
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
        <Button
          label="Launch demo modal"
          width="180px"
          className="mb-3"
          onClick={handleShow}
        />

        <Modal
          show={show}
          onHide={handleClose}
          size="xl"
          backdrop="static"
          dialogClassName="rounded-[10px]"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="row g-3">
              <div className="col-md-6">
                <FormControl name="email">
                  <label className="form-label">Email</label>
                  <Input
                    hasShadow={false}
                    width="w-full mt-0"
                    className="!max-w-full"
                    inputClassName="font-[Arial] outline-none"
                    errorClassName="!text-[#e54e87] !font-normal"
                    placeholder="Email"
                  />
                </FormControl>
              </div>
              <div className="col-md-6">
                <FormControl name="password">
                  <label className="form-label">Password</label>
                  <Input
                    type="password"
                    hasShadow={false}
                    width="w-full mt-0"
                    className="!max-w-full"
                    inputClassName="font-[Arial] outline-none"
                    errorClassName="!text-[#e54e87] !font-normal"
                    placeholder="Password"
                  />
                </FormControl>
              </div>
              <div className="col-md-6">
                <FormControl name="name">
                  <label className="form-label">User name</label>
                  <Input
                    hasShadow={false}
                    width="w-full mt-0"
                    className="!max-w-full"
                    inputClassName="font-[Arial] outline-none"
                    errorClassName="!text-[#e54e87] !font-normal"
                    placeholder="User name"
                  />
                </FormControl>
              </div>
              <div className="col-md-4">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              label="Close"
              theme="secondary"
              onClick={handleClose}
              className="text-black"
            />
            <Button label="Save" onClick={() => handleSubmit()} />
          </Modal.Footer>
        </Modal>
      </Form>
    </Formik>
  );
};
export default AddNewModal;
