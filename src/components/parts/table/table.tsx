import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { GetApiUsers } from "../../../api/apiCreate/api-create";

function TableUser() {
  const [listUser, setListUser] = useState<any>([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    let res = await GetApiUsers();
    setListUser(res.DT);
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {listUser &&
          listUser.length > 0 &&
          listUser.map((user: any, index: any) => (
            <tr key={`tabel-${index}`}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        {listUser && listUser.length === 0 && (
          <tr key={`table`}>
            <td colSpan={5} className="text-center font-semibold">
              Not user table
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default TableUser;
