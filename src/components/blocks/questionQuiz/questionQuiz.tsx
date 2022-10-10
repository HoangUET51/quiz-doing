import { Container } from "react-bootstrap";
import { Button } from "../../parts/button/button";

interface QuizProps {
  quizTitle: string;
  listData: any;
}

export default function QuestionsQuiz(props: QuizProps) {
  const { quizTitle, listData } = props;
  console.log(listData);
  return (
    <Container>
      <div className="flex flex-row">
        <div className="w-2/3">
          <div>{quizTitle}</div>
          {listData && listData.length ? (
            listData.map((it: any, idx: any) => (
              <div key={idx}>
                <h1>{`Quiz: ${it.questionId}`}</h1>
                <ul>
                  {it.answers &&
                    it.answers.length &&
                    it.answers.map((item: any, index: any) => (
                      <li key={index}>{item.decription}</li>
                    ))}
                </ul>
              </div>
            ))
          ) : (
            <></>
          )}

          <div className="flex flex-row gap-3">
            <Button label="Prev" />
            <Button label="Next" />
            <Button label="Finish" />
          </div>
        </div>
        <div className="w-1/3">CountDown</div>
      </div>
    </Container>
  );
}
