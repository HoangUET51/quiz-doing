import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Button } from "../../../components/parts/button/button";
import { getAllQuestions } from "../../../api/apiCreate/api-create";
import TableQuestion from "../../parts/table_question/table_question";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import iconImg from "../../../asset/img/add-img.png";
import iconPlus from "../../../asset/img/plus.png";
import iconSub from "../../../asset/img/subtract.png";
import _ from "lodash";
const { v4: uuidv4 } = require("uuid");

export default function AddQuestion() {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const [listQuestionA, setListQuestionA] = useState([
    {
      id: uuidv4(),
      description: "",
      imgFile: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCheckAnswer: false,
        },
      ],
    },
  ]);

  const handleAddRemove = (type: string, id?: any) => {
    if (type === "ADD") {
      setListQuestionA([
        ...listQuestionA,
        {
          id: uuidv4(),
          description: "",
          imgFile: "",
          answers: [
            {
              id: uuidv4(),
              description: "",
              isCheckAnswer: false,
            },
          ],
        },
      ]);
    }
    if (type === "REMOVE") {
      setListQuestionA((prevState) =>
        prevState.filter((item) => item.id !== id)
      );
    }
  };

  const handleAddRemoveAnswer = (
    type: string,
    questionId?: any,
    answerId?: any
  ) => {
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCheckAnswer: false,
      };
      let listQuestionAClone = _.cloneDeep(listQuestionA);
      let index = listQuestionAClone.findIndex(
        (item) => item.id === questionId
      );

      listQuestionAClone[index].answers.push(newAnswer);
      setListQuestionA(listQuestionAClone);
    } else if (type === "REMOVE") {
      let listQuestionAClone = _.cloneDeep(listQuestionA);
      let index = listQuestionAClone.findIndex(
        (item) => item.id === questionId
      );
      listQuestionAClone[index].answers = listQuestionAClone[
        index
      ].answers.filter((item) => item.id !== answerId);
      setListQuestionA(listQuestionAClone);
    }
  };

  const handleOnChange = (
    type: string,
    questionId: any,
    value: any,
    answerId?: any
  ) => {
    if (type === "QUESTION") {
      let listQuestionAClone = _.cloneDeep(listQuestionA);
      let index = listQuestionAClone.findIndex(
        (item) => item.id === questionId
      );
      if (index > -1) {
        listQuestionAClone[index].description = value;
        setListQuestionA(listQuestionAClone);
      }
    }

    if (type === "IMAGE") {
      let listQuestionAClone = _.cloneDeep(listQuestionA);
      let index = listQuestionAClone.findIndex(
        (item) => item.id === questionId
      );
      if (index > -1) {
        listQuestionAClone[index].imgFile = URL.createObjectURL(
          value.target.files[0]
        );
        setListQuestionA(listQuestionAClone);
      }
      console.log(listQuestionAClone);
    }

    if (type === "CHECKED") {
      let listQuestionAClone = _.cloneDeep(listQuestionA);
      let index = listQuestionAClone.findIndex(
        (item) => item.id === questionId
      );
      if (index > -1) {
        let indexAnswer = listQuestionAClone[index].answers.findIndex(
          (item) => item.id === answerId
        );
        if (indexAnswer > -1) {
          listQuestionAClone[index].answers[indexAnswer].isCheckAnswer = value;
          setListQuestionA(listQuestionAClone);
        }
      }
    }

    if (type === "ANSWER") {
      let listQuestionAClone = _.cloneDeep(listQuestionA);
      let index = listQuestionAClone.findIndex(
        (item) => item.id === questionId
      );
      if (index > -1) {
        let indexAnswer = listQuestionAClone[index].answers.findIndex(
          (item) => item.id === answerId
        );
        if (indexAnswer > -1) {
          listQuestionAClone[index].answers[indexAnswer].description = value;
          setListQuestionA(listQuestionAClone);
        }
      }
    }
  };

  return (
    <div>
      <div className="text-[30px] text-[#0eafe0]">Add New Questions</div>
      <div className="Footer-container">
        {listQuestionA &&
          listQuestionA.length &&
          listQuestionA.map((item, index) => (
            <div key={index}>
              <div className="flex flex-row">
                <FloatingLabel
                  controlId={item.id}
                  label={`Questions ${index + 1}`}
                  className="mb-3 w-1/2"
                >
                  <Form.Control
                    type="text"
                    value={item.description}
                    placeholder="Questions"
                    onChange={(e) =>
                      handleOnChange("QUESTION", item.id, e.target.value)
                    }
                  />
                </FloatingLabel>

                <div className="ml-[1rem]">
                  <label
                    className="form-label p-2 rounded cursor-pointer"
                    htmlFor={`img-${item.id}`}
                  >
                    <img
                      src={iconImg}
                      alt="add-img"
                      className={clsx("w-[40px] h-[40px]", {
                        "bg-[#16e7dd]": item.imgFile,
                      })}
                    />
                  </label>
                  <input
                    type="file"
                    hidden
                    id={`img-${item.id}`}
                    onChange={(e) => handleOnChange("IMAGE", item.id, e)}
                  />
                </div>

                <div
                  className="w-[35px] h-[35px] mt-[10px]"
                  onClick={() => handleAddRemove("ADD")}
                >
                  <img src={iconPlus} alt="icon add" />
                </div>
                {listQuestionA.length > 1 ? (
                  <div
                    className="w-[40px] h-[40px] mt-2 ml-2"
                    onClick={() => handleAddRemove("REMOVE", item.id)}
                  >
                    <img src={iconSub} alt="icon add" />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {item.answers &&
                item.answers.length &&
                item.answers.map((answer, index) => (
                  <div
                    className="flex flex-row ml-[2rem] mb-5"
                    key={`ans ${index}`}
                  >
                    <Form.Check
                      type="checkbox"
                      className="mt-3 mr-[1rem]"
                      checked={answer.isCheckAnswer}
                      onChange={(e) =>
                        handleOnChange(
                          "CHECKED",
                          item.id,
                          e.target.checked,
                          answer.id
                        )
                      }
                    />
                    <FloatingLabel
                      controlId="floatingAnswer"
                      label={`Answer ${index + 1}`}
                      className="w-2/3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Answer"
                        onChange={(e) =>
                          handleOnChange(
                            "ANSWER",
                            item.id,
                            e.target.value,
                            answer.id
                          )
                        }
                      />
                    </FloatingLabel>
                    <div
                      className="w-[35px] h-[35px] mt-[10px] ml-5"
                      onClick={() =>
                        handleAddRemoveAnswer("ADD", item.id, answer.id)
                      }
                    >
                      <img src={iconPlus} alt="icon add" />
                    </div>
                    {item.answers.length > 1 ? (
                      <div
                        className="w-[40px] h-[40px] mt-2 ml-2"
                        onClick={() =>
                          handleAddRemoveAnswer("REMOVE", item.id, answer.id)
                        }
                      >
                        <img src={iconSub} alt="icon add" />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
            </div>
          ))}
      </div>
      <div className="col-md-6">
        <Button label="Save" />
        <div className="my-3">Tabel Question</div>
        {/* <TableQuestion
          listQuestion={[]}
          handleGetAllQuestion={handleGetAllQuestion}
        /> */}
      </div>
    </div>
  );
}
