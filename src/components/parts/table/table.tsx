import Table from "react-bootstrap/Table";
import { Button } from "../button/button";
interface TableUserProps {
  listUser: any[];
  handleEditUser: (e: any) => void;
  handleViewUser: (e: any) => void;
  handleDeleteUser: (e: any) => void;
}
export function TableUser(props: TableUserProps) {
  const { listUser, handleEditUser, handleViewUser, handleDeleteUser } = props;
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
        {listUser.length ? (
          listUser.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="flex flex-row justify-center gap-3">
                <Button label="View" onClick={() => handleViewUser(user)} />
                <Button
                  label="Edit"
                  theme="secondary"
                  onClick={() => handleEditUser(user)}
                />
                <Button
                  label="Delete"
                  theme="danger"
                  onClick={() => handleDeleteUser(user.id)}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center font-semibold">
              Not user table
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
