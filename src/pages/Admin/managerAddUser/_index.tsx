import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  DeleteUser,
  GetApiUsersWithPanigate,
} from "../../../api/apiCreate/api-create";
import AddNewModal from "../../../components/blocks/managerModal/managerModal";
import { TableUser } from "../../../components/parts/table/table";

enum LIMIT_USER {
  limit = 5,
}

const ManagerUser = () => {
  const [show, setShow] = useState<any>(false);
  const [listUser, setListUser] = useState<any>([]);
  const [currentEditUser, setCurrentEditUser] = useState<any>(null);
  const [isModalUpdate, setIsModalUpdate] = useState<any>(false);
  const [isShowView, setIsShowView] = useState<any>(false);
  const [pageCount, setPageCount] = useState<any>();
  const [currentPage, setCurrentPage] = useState<any>(1);

  const handleShow = () => setShow(true);
  useEffect(() => {
    getListUserPanigate(1);
  }, []);

  const getListPanigate = () => {
    getListUserPanigate(currentPage);
  };

  const getListUserPanigate = async (page: any) => {
    let res = await GetApiUsersWithPanigate(page, LIMIT_USER.limit);
    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleDeleteUser = async (id: any) => {
    let dataDelete = await DeleteUser(id);
    if (dataDelete && dataDelete.EC === 0) {
      getListUserPanigate(currentPage);
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
            getListPanigate={getListPanigate}
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
            pageCount={pageCount}
            getListUserPanigate={getListUserPanigate}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};
export default ManagerUser;
