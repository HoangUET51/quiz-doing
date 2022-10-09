import React, { useEffect, useState } from "react";
import { Button } from "../../parts/button/button";
import Container from "react-bootstrap/Container";
import { getQuizByUsers } from "../../../api/apiCreate/api-create";
const CartQuiz = () => {
  const [listQuiz, setListQuiz] = useState<any[]>([]);
  useEffect(() => {
    getListQuiz();
  }, []);
  const getListQuiz = async () => {
    let res = await getQuizByUsers();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  return (
    <Container>
      <div className="flex flex-row gap-5 mt-5">
        {listQuiz && listQuiz.length ? (
          listQuiz.map((item, index) => (
            <div className="card w-1/3" key={index}>
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                className="card-img-top"
                alt="abc"
              />
              <div className="card-body">
                <h5 className="card-title text-[1.5rem] font-bold">{`Quiz ${item.id}`}</h5>
                <p className="card-text py-3 text-[1rem]">{item.description}</p>
                <Button label="Start Now" />
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
};
export default CartQuiz;