import React from "react";
import AddQuiz from "../../../components/blocks/AddQuiz/AddQuiz";

export default function ManagerQuestions() {
  return (
    <div className="manager-container mx-3">
      <div className="title my-2 text-xl font-semibold">Add Manager Quiz</div>
      <div className="content">
        <AddQuiz />
      </div>
    </div>
  );
}
