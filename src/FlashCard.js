import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function FlashCard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");
  const frontEl = useRef();
  const backEl = useRef();

  const maxHeight = () => {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    // const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, 100));
  };

  useEffect(() => {
    maxHeight();
  }, [flashcard.question, flashcard.answer, flashcard.options]);

  useEffect(() => {
    window.addEventListener("resize", maxHeight);
    return () => window.removeEventListener("resize", maxHeight);
  }, []);
  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {flashcard.question}

        <div className="flashcard-options">
          {flashcard.options.map((option) => {
            return (
              <div className="flashcard-option" key={option}>
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="back" back={backEl}>
        {flashcard.answer}
      </div>
    </div>
  );
}
