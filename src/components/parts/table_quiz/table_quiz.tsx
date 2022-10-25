import Table from "react-bootstrap/Table";
import { Button } from "../button/button";
interface TableQuizProps {
  listQuiz: any[];
  handleDeleteQuiz: (id: any) => void;
}
export function TableQuiz(props: TableQuizProps) {
  const { listQuiz, handleDeleteQuiz } = props;
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz.length ? (
            listQuiz.map((quiz: any, index: any) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{quiz.name}</td>
                <td>{`${quiz.description} (${quiz.difficulty})`}</td>
                <td className="flex flex-row justify-center gap-3">
                  <Button label="Edit" theme="secondary" />
                  <Button
                    label="Delete"
                    theme="danger"
                    onClick={() => handleDeleteQuiz(quiz.id)}
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
    </>
  );
}
