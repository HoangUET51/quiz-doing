import { Form, Formik, FormikContextType } from "formik";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { PostApiCreate, PutApiUser } from "../../../api/apiCreate/api-create";
import { Button } from "../../parts/button/button";
import { FormControl } from "../../parts/form-control/form-control";
import { Input } from "../../parts/input/input";

interface AddNewProps {
  show: any;
  handleShow: () => void;
  setShow: any;
  getListPanigate: () => void;
  currentEditUser: any;
  isModalUpdate: any;
  setIsModalUpdate: any;
  setCurrentEditUser: any;
  isShowView: any;
  setIsShowView: any;
}

interface InitialValueAdd {
  email: string;
  password: string;
  username: string;
}

const AddNewModal = (props: AddNewProps) => {
  const [role, setRole] = useState<string>("USER");
  const [image, setImage] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const formRef = React.createRef<FormikContextType<InitialValueAdd>>();
  const initialValues: InitialValueAdd = {
    email: "",
    password: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required field").email(),
    password: Yup.string()
      .required("Required field")
      .min(8, "Your password is too short."),
    username: Yup.string().required("Required field"),
  });

  const {
    show,
    handleShow,
    setShow,
    getListPanigate,
    currentEditUser,
    isModalUpdate,
    setCurrentEditUser,
    setIsModalUpdate,
    isShowView,
    setIsShowView,
  } = props;

  useEffect(() => {
    if (currentEditUser) {
      formRef.current?.resetForm({
        values: {
          email: currentEditUser.email,
          password: currentEditUser.password,
          username: currentEditUser.username,
        },
      });
    }
  }, [currentEditUser, formRef]);

  const handleClose = () => {
    setShow(false);
    setRole("USER");
    setImage("");
    setPreview("");
    formRef.current?.resetForm();
    getListPanigate();
    setCurrentEditUser(null);
    setIsModalUpdate(false);
    setIsShowView(false);
  };

  const handleImage = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    const { email, password, username } = formRef.current
      ?.values as InitialValueAdd;

    let data = await PostApiCreate(email, password, username, role, image);
    if (data && data.EC === 0) {
      handleClose();
      toast.success("Create data successfully");
    } else if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const handleBtnUpdateUser = async () => {
    const { username } = formRef.current?.values as InitialValueAdd;
    let dataEdit = await PutApiUser(currentEditUser.id, username, role, image);
    if (dataEdit && dataEdit.EC === 0) {
      handleClose();
      toast.success("Update data successfully");
    } else if (dataEdit && dataEdit.EC !== 0) {
      toast.error(dataEdit.EM);
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
          label="Add New User"
          width="150px"
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
            <Modal.Title>
              {isModalUpdate
                ? isShowView
                  ? "User Detail"
                  : "Update User"
                : "Add New User"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="row g-3">
              <div className="col-md-6">
                <FormControl name="email">
                  <label className="form-label">Email</label>
                  <Input
                    disabled={isModalUpdate}
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
                    disabled={isModalUpdate}
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
                <FormControl name="username">
                  <label className="form-label">User name</label>
                  <Input
                    disabled={isShowView}
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
                  disabled={isShowView}
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
                  disabled={isShowView}
                  type="file"
                  hidden
                  id="labelInput"
                  onChange={(e) => handleImage(e)}
                />
              </div>
              <div className="col-md-12 border border-info rounded-4 text-center h-[200px] d-flex justify-center">
                {preview.length > 0 ? (
                  <img
                    src={preview}
                    style={{ height: "100%", width: "50%" }}
                    alt="preview"
                  />
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
            {isModalUpdate ? (
              isShowView ? (
                <></>
              ) : (
                <Button label="Update" onClick={handleBtnUpdateUser} />
              )
            ) : (
              <Button label="Save" onClick={handleSubmit} />
            )}
          </Modal.Footer>
        </Modal>
      </Form>
    </Formik>
  );
};
export default AddNewModal;
