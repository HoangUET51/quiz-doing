import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuestionsByQuiz } from "../../../api/apiCreate/api-create";
import QuestionsQuiz from "../../../components/blocks/questionQuiz/questionQuiz";

const QuestionQuiz = () => {
  const quizId = useParams().id;
  const location = useLocation();
  const { quizTitle } = location.state;
  const [listData, setListData] = useState<any>([]);
  useEffect(() => {
    fetchQuestionQuiz();
  }, [quizId]);

  const fetchQuestionQuiz = async () => {
    let res = await getQuestionsByQuiz(quizId);
    if (res && res.EC === 0) {
      let data: any = _.chain(res.DT)
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
            isSelected: false,
          };
        })
        .value();
      setListData(data);
    }
  };
  return (
    <div>
      <QuestionsQuiz
        quizTitle={quizTitle}
        listData={listData.length > 0 ? listData : []}
      />
    </div>
  );
};

export default QuestionQuiz;
