import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { Button } from "../button/button";

interface TableUserProps {
  listUser: any[];
  handleEditUser: (e: any) => void;
  handleViewUser: (e: any) => void;
  handleDeleteUser: (e: any) => void;
  pageCount: any;
  getListUserPanigate: (page: any) => void;
  setCurrentPage: any;
}

export function TableUser(props: TableUserProps) {
  const {
    listUser,
    handleEditUser,
    handleViewUser,
    handleDeleteUser,
    pageCount,
    getListUserPanigate,
    setCurrentPage,
  } = props;

  const handlePageClick = (event: any) => {
    setCurrentPage(+event.selected + 1);
    getListUserPanigate(+event.selected + 1);
  };

  return (
    <>
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
      <div className="flex justify-center">
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </>
  );
}
