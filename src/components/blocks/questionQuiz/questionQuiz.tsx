import { Container } from "react-bootstrap";
import { Button } from "../../parts/button/button";
import { useNavigate, useParams } from "react-router-dom";
import { postSubmit } from "../../../api/apiCreate/api-create";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ResultModal from "../result_modal/resultModal";
import moment from "moment";
import clsx from "clsx";
import icon_home from "../../../asset/img/icon-home.png";
interface QuizProps {
  quizTitle: string;
  listData: any;
  handleCheckBox: (e: any, answersId: any, questionId: any) => void;
}
interface PayLoad {
  quizId: number;
  answers: any[];
}

export default function QuestionsQuiz(props: QuizProps) {
  const [show, setShow] = useState<boolean>(false);
  const [count, setCount] = useState<any>(900);
  const [result, setResult] = useState<any>({});
  const { quizTitle, listData, handleCheckBox } = props;
  const quizId: any = useParams().id;
  const handleFinish = async () => {
    let payLoad: PayLoad = {
      quizId: +quizId,
      answers: [],
    };
    if (listData && listData.length > 0) {
      let answer: any[] = [];
      listData.map((item: any) => {
        if (item && item.answers) {
          let userAnswerId: any = [];
          item.answers.map((item: any) => {
            if (item.isSelected === true) {
              userAnswerId.push(item.id);
            }
          });
          answer.push({
            questionId: +item.questionId,
            userAnswerId: userAnswerId,
          });
        }
      });
      payLoad.answers = answer;
    }
    let res = await postSubmit(payLoad);
    if (res && res.EC === 0) {
      setShow(true);
      setResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
      });
    } else {
      toast.error(res.EM);
    }
  };

  useEffect(() => {
    let timer = setInterval(() => {
      if (count === 0) return;
      setCount((count: any) => count - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [count]);
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <div className="flex flex-row gap-2">
          <div>
            <img
              src={icon_home}
              alt=""
              className="w-[100px] h-[100px] cursor-pointer"
              onClick={() => {
                navigate("/users");
              }}
            />
          </div>
          <div className="w-2/3 border-4 border-[#605f5f] h-[80vh] p-4">
            <div className="text-[2rem] font-semibold my-3 text-[#29c0db]">
              {quizTitle}
            </div>
            {listData && listData.length ? (
              listData.map((it: any, idx: any) => (
                <div key={idx}>
                  <h1 className="text-[1.3rem] font-bold my-2">{`Quiz ${it.questionId}: ${it.questionDecription} ?`}</h1>
                  <ul className="ml-4">
                    {it.answers &&
                      it.answers.length &&
                      it.answers.map((item: any, index: any) => (
                        <div className="flex flex-row gap-2">
                          <input
                            type="checkbox"
                            id={item.id}
                            onChange={(e) =>
                              handleCheckBox(e, item.id, it.questionId)
                            }
                            checked={item.isSelected}
                          />
                          <label htmlFor={item.id} key={index}>
                            {item.decription}
                          </label>
                          <h1>{item.isSelected}</h1>
                        </div>
                      ))}
                  </ul>
                </div>
              ))
            ) : (
              <></>
            )}

            <div className="flex flex-row content-center mt-3">
              <Button label="Finish" onClick={handleFinish} />
            </div>
          </div>
          <div className="w-1/3 text-[1.5rem] font-semibold border-4 border-[#605f5f] p-4">
            <div className="text-center border-b-4 pb-3">
              {moment.utc(count * 1000).format("mm:ss")}
            </div>
            <div className="flex flex-row gap-2 mt-5 flex-wrap">
              {listData.length > 0 &&
                listData.map((item: any, index: any) => {
                  let check = item.answers.some(
                    (it: any) => it.isSelected === true
                  );
                  return (
                    <p
                      className={clsx(
                        "flex border-2 rounded-full w-[50px] h-[50px] justify-center items-center hover:text-[red] cursor-pointer",
                        { "bg-[#dfea09]": check }
                      )}
                    >
                      {index + 1}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
      </Container>
      <ResultModal
        show={show}
        setShow={setShow}
        result={result}
        count={count}
        handleFinish={handleFinish}
      />
    </>
  );
}
