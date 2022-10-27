import AddQuestion from "../../../components/blocks/AddQuestion/AddQuestion";

export default function QuestionAnswer() {

  return (
    <div className="manager-container mx-3">
      <div className="title my-2 text-xl font-semibold">Add Question</div>
      <div className="content">
        <AddQuestion />
      </div>
    </div>
  );
}
