import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import FlashCardList from "./FlashCardList";
export default function App() {
  const [flashCards, setFlashCards] = useState(FlashCardQuestions);
  const [categories, setCategories] = useState([]);

  const API = "https://opentdb.com/api.php?amount=10";

  useEffect(() => {
    fetch(API)
      .then((data) => data.json())
      .then((fd) => {
        // console.log(fd.results);

        setFlashCards(
          fd.results.map((e, index) => {
            const answer = decodeString(e.correct_answer);
            const options = [
              ...e.incorrect_answers.map((a) => decodeString(a)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(e.question),
              answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      });
  }, []);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((result) => result.json())
      .then((data) => {
        setCategories(data.trivia_categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const decodeString = (str) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  };

  const handleSubmit = (e) => {
    //  console.log(amountref.current.value, cateE1.current.value);

    e.preventDefault();
    fetch(
      `https://opentdb.com/api.php?amount=${amountref.current.value}&category=${cateE1.current.value}`
    )
      .then((data) => data.json())
      .then((fd) => {
        // console.log(fd.results);

        setFlashCards(
          fd.results.map((e, index) => {
            const answer = decodeString(e.correct_answer);
            const options = [
              ...e.incorrect_answers.map((a) => decodeString(a)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(e.question),
              answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      });
  };

  const cateE1 = useRef();
  const amountref = useRef();

  return (
    <>
      <div className="header">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select name="" id="category" ref={cateE1}>
            {categories.map((e) => {
              return (
                <option value={e.id} key={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountref}
            id="amount"
          />
        </div>

        <div className="form-group">
          <button onClick={handleSubmit} className="btn">
            Generate
          </button>
        </div>
      </div>
      <div className="container">
        <FlashCardList flashCards={flashCards} />
      </div>
    </>
  );
}

const option1 = "shiv";
const option2 = "gugu";
const option3 = "shivam";
const option4 = "sam";
const FlashCardQuestions = [
  {
    id: 1,
    question: "What is your Name?",
    answer: "shivam",
    options: [option1, option2, option3, option4],
  },
  {
    id: 2,
    question: "What is your Name?",
    answer: "shivam",
    options: [option1, option2, option3, option4],
  },
  {
    id: 3,
    question: "What is your Name?",
    answer: "shivam",
    options: [option1, option2, option3, option4],
  },
  {
    id: 4,
    question: "What is your Name?",
    answer: "shivam",
    options: [option1, option2, option3, option4],
  },
];
