import React, { useState } from 'react';
import './Flashcard.css';

interface FlashcardProps {
  kanji: string;
  kana: string;
  arti: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ kanji, kana, arti }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flashcard ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flashcard-inner">
        <div className="front">
          <h1>{kanji}</h1>
        </div>
        <div className="back">
          <h2 className="kana">{kana}</h2>
          <p className="arti">{arti}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
