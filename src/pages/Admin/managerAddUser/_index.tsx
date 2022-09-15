import { useState } from "react";
import AddNewModal from "../../../components/blocks/managerModal/managerModal";

const ManagerUser = () => {
  const [show, setShow] = useState<any>(false);
  const handleShow = () => setShow(true);

  return (
    <div className="manager-container">
      <div className="title">Manager User</div>
      <div className="content">
        <div className="table-content">
          <AddNewModal handleShow={handleShow} show={show} setShow={setShow} />
          <div>Table content</div>
        </div>
      </div>
    </div>
  );
};
export default ManagerUser;
