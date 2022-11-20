import AddQuestion from "../../../components/blocks/AddQuestion/AddQuestion";

export default function QuestionAnswer() {
  return (
    <div className="manager-container mx-3">
      <div className="text-[30px] text-[#0eafe0]">Add New Questions</div>
      <div className="content">
        <AddQuestion />
      </div>
    </div>
  );
}
