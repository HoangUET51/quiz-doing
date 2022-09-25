import AddNewModal from "../../../components/blocks/managerModal/managerModal";
import { TableUser } from "../../../components/parts/table/table";
import { useEffect, useState } from "react";
import { DeleteUser, GetApiUsers } from "../../../api/apiCreate/api-create";
import { toast } from "react-toastify";
const ManagerUser = () => {
  const [show, setShow] = useState<any>(false);
  const [listUser, setListUser] = useState<any>([]);
  const [currentEditUser, setCurrentEditUser] = useState<any>({});
  const [isModalUpdate, setIsModalUpdate] = useState<any>(false);
  const [isShowView, setIsShowView] = useState<any>(false);

  const handleShow = () => setShow(true);
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    let res = await GetApiUsers();
    setListUser(res.DT);
  };

  const handleDeleteUser = async (id: any) => {
    let dataDelete = await DeleteUser(id);
    if (dataDelete && dataDelete.EC === 0) {
      getAllUsers();
      toast.success(dataDelete.EM);
    } else if (dataDelete && dataDelete.EC !== 0) {
      toast.error(dataDelete.EM);
    }
  };

  const handleEditUser = (user: any) => {
    setShow(true);
    setCurrentEditUser(user);
    setIsModalUpdate(true);
  };

  const handleViewUser = (user: any) => {
    setShow(true);
    setCurrentEditUser(user);
    setIsModalUpdate(true);
    setIsShowView(true);
  };

  return (
    <div className="manager-container mx-3">
      <div className="title my-2 text-xl font-semibold">Manager User</div>
      <div className="content">
        <div className="table-content">
          <AddNewModal
            handleShow={handleShow}
            show={show}
            setShow={setShow}
            getAllUsers={getAllUsers}
            currentEditUser={currentEditUser}
            isModalUpdate={isModalUpdate}
            setCurrentEditUser={setCurrentEditUser}
            setIsModalUpdate={setIsModalUpdate}
            isShowView={isShowView}
            setIsShowView={setIsShowView}
          />
        </div>
        <div className="h-auto">
          <TableUser
            listUser={listUser}
            handleEditUser={handleEditUser}
            handleViewUser={handleViewUser}
            handleDeleteUser={handleDeleteUser}
          />
        </div>
      </div>
    </div>
  );
};
export default ManagerUser;
