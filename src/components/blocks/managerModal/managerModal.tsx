import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
interface AddNewProps {
  show: any;
  handleShow: () => void;
  setShow: any;
}
const AddNewModal = (props: AddNewProps) => {
  const { show, handleShow, setShow } = props;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("USER");
  const [image, setImage] = useState<string>("");
  const [preview, setPreview] = useState<string>("");

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setName("");
    setRole("USER");
    setImage("");
    setPreview("");
  };

  const handleImage = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", name);
    data.append("role", role);
    data.append("userImage", image);
    let res = await axios.post(
      "http://localhost:8081/api/v1/participant",
      data
    );

    console.log(res);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

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
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                placeholder="User Name"
                onChange={(e) => setName(e.target.value)}
              />
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
              <label className="form-label" htmlFor="labelInput">
                Upload File Image
              </label>
              <input
                type="file"
                hidden
                id="labelInput"
                onChange={(e) => handleImage(e)}
              />
            </div>
            <div
              className="col-md-12 border border-info rounded-4 text-center"
              style={{ height: "200px" }}
            >
              {preview.length > 0 ? (
                <img src={preview} style={{ height: "100%", width: "50%" }} />
              ) : (
                <div>Preview Image</div>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddNewModal;
