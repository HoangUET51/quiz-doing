import React from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteQuestion } from "../../../api/apiCreate/api-create";
import { Button } from "../button/button";

interface QuestionProps {
  listQuestion: any[];
  handleGetAllQuestion: () => void;
}

export default function TableQuestion(props: QuestionProps) {
  const { listQuestion, handleGetAllQuestion } = props;
  const handleDeleteQuestion = async (id: any, quizId: any) => {
    let res = await deleteQuestion(id, quizId);
    if (res && res.EC === 0) {
      handleGetAllQuestion();
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Quiz_Id</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuestion.length ? (
            listQuestion.map((question: any, index: any) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{question.quiz_id}</td>
                <td>{question.description}</td>
                <td className="flex flex-row justify-center gap-3">
                  <Button label="Edit" theme="secondary" />
                  <Button
                    label="Delete"
                    theme="danger"
                    onClick={() =>
                      handleDeleteQuestion(question.id, question.quiz_id)
                    }
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
