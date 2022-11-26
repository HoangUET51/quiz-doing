import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { getQuizByUsers } from "../../../api/apiCreate/api-create";
import { Button } from "../../parts/button/button";

const CartQuiz = () => {
  const [listQuiz, setListQuiz] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getListQuiz();
  }, []);

  const getListQuiz = async () => {
    let res = await getQuizByUsers();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleStartNow = (id: any, title: any) => {
    navigate(`/quiz/${id}`, { state: { quizTitle: title } });
  };

  return (
    <Container>
      <div className="flex flex-row gap-5 mt-5 flex-wrap">
        {listQuiz && listQuiz.length ? (
          listQuiz.map((item, index) => (
            <div className="card w-[25rem] h-[30rem]" key={index}>
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                className="card-img-top w-full h-2/3"
                alt="abc"
              />
              <div className="card-body">
                <h5 className="card-title text-[1.5rem] font-bold">{`Quiz ${item.id}`}</h5>
                <p className="card-text py-3 text-[1rem]">{item.description}</p>
                <Button
                  label="Start Now"
                  onClick={() => handleStartNow(item.id, item.description)}
                />
              </div>
            </div>
          ))
        ) : (
          <div>Sorry, you haven't created a quiz</div>
        )}
      </div>
    </Container>
  );
};
export default CartQuiz;
