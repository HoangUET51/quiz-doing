import _ from "lodash";
import { useEffect, useState } from "react";
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
              isSelected: false,
            })),
            questionDecription: value[0].description,
            image: value[0].image,
          };
        })
        .value();
      setListData(data);
    }
  };

  const handleCheckBox = (e: any, answersId: any, questionId: any) => {
    let listDataClone: any = _.cloneDeep(listData);
    let dataQuestion = listDataClone.find(
      (item: any) => +item.questionId === +questionId
    );

    if (dataQuestion && dataQuestion.answers) {
      dataQuestion.answers.map((item: any) => {
        if (+item.id === +answersId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      setListData(listDataClone);
    }
  };

  return (
    <div className="mt-10">
      <QuestionsQuiz
        quizTitle={quizTitle}
        listData={listData.length > 0 ? listData : []}
        handleCheckBox={handleCheckBox}
      />
    </div>
  );
};

export default QuestionQuiz;
