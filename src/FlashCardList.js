import React from "react";
import FlashCard from "./FlashCard";

export default function FlashCardList(props) {
  const { flashCards } = props;

  return (
    <div className="grid">
      {flashCards.map((e) => {
        return <FlashCard flashcard={e} key={e.id} />;
      })}
    </div>
  );
}
