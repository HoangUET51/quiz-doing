import { useState } from "react";
import AddNewModal from "../../../components/blocks/managerModal/managerModal";
import { TableUser } from "../../../components/parts/table/table";

const ManagerUser = () => {
  const [show, setShow] = useState<any>(false);
  const handleShow = () => setShow(true);

  return (
    <div className="manager-container mx-3">
      <div className="title my-2 text-xl font-semibold">Manager User</div>
      <div className="content">
        <div className="table-content">
          <AddNewModal handleShow={handleShow} show={show} setShow={setShow} />
        </div>
        <div className="h-auto">
          <TableUser />
        </div>
      </div>
    </div>
  );
};
export default ManagerUser;
