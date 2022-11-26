import { useState } from "react";
import { FloatingLabel, Tab, Tabs } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { changePassword } from "../../../api/apiCreate/api-create";
import camera from "../../../asset/img/a.png";
import img from "../../../asset/img/avatar.jpg";
import { Button } from "../../parts/button/button";

interface IModalProfile {
  show: any;
  setShow: any;
  account: any;
}

export default function ModalProFile(props: IModalProfile) {
  const { show, setShow, account } = props;
  const [currentPassword, setCurrentPassword] = useState<any>("");
  const [newPassword, setNewPassword] = useState<any>("");

  const handleClose = () => {
    setShow(false);
  };

  const handleChangePassword = async () => {
    let res = await changePassword(currentPassword, newPassword);
    if (res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      dialogClassName="rounded-[10px]"
    >
      <Modal.Header closeButton className="text-[1.5rem] font-semibold">
        Setting
      </Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="mb-5 flex flex-row"
          fill
        >
          <Tab eventKey="profile" title="ProFile">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={img}
                  alt="avatar"
                  className="w-[12rem] h-[12rem] border-[#000000] border-2 rounded-full"
                />
                <label
                  htmlFor="add-camera"
                  className="absolute right-[2px] bottom-[3px] cursor-pointer"
                >
                  <img
                    src={camera}
                    alt="camera"
                    className="w-[50px] h-[50px]"
                  />
                </label>
                <input type="file" hidden id="add-camera" />
              </div>

              <div className="text-[1.2rem] my-2 font-bold">
                {account.username}
              </div>

              <div className="mb-2 font-medium">{account.email}</div>

              <div className="font-medium">Role: {account.role}</div>
            </div>
          </Tab>
          <Tab eventKey="Change_password" title="Change Password">
            <div className="flex flex-col items-center">
              <FloatingLabel
                controlId="CurrentPassword"
                label="Current Password"
                className="mb-4 w-2/3"
              >
                <Form.Control
                  type="text"
                  placeholder="Current Password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="NewPassword"
                label="New Password"
                className="mb-5 w-2/3"
              >
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FloatingLabel>
              <Button label="Save" onClick={handleChangePassword} />
            </div>
          </Tab>
          <Tab eventKey="history_quiz" title="Quiz History">
            <div>Chưa có lịch sử làm bài</div>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}
