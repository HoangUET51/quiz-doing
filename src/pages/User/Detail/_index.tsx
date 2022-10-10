import _, { values } from "lodash";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionsByQuiz } from "../../../api/apiCreate/api-create";

const QuestionQuiz = () => {
  const quizId = useParams().id;
  useEffect(() => {
    fetchQuestionQuiz();
  }, [quizId]);

  const fetchQuestionQuiz = async () => {
    let res = await getQuestionsByQuiz(quizId);
    if (res && res.EC === 0) {
      let data = _.chain(res.DT)
        .groupBy("id")
        .map((value, key) => {
          return {
            questionId: key,
            answers: value.map((item) => ({
              id: item.answers.id,
              decription: item.answers.description,
            })),
            questionDecription: value[0].description,
            image: value[0].image,
          };
        })
        .value();
      console.log(data);
    }
  };
  return <div>hello detail</div>;
};

export default QuestionQuiz;
