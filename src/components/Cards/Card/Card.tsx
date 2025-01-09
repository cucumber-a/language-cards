import React, { useEffect } from 'react';
import { Word } from '../CardsGenerator/CardsGenerator';
import { SpeechPart } from '../../../App';
import { WordExample } from '../WordExample/WordExample';
import './Card.scss';

type CardProps = {
  word: Word;
  speechPart: SpeechPart;
  onNextWord: () => void;
}

export function Card({ word, speechPart, onNextWord }: CardProps) {
  const [showTranslation, setShowTranslation] = React.useState(false);

  useEffect(() => {
    setShowTranslation(false);
  }, [word]);

  const translationContent = () => {
    return (
      <div className='card__translation'>
        <span className='text_primary'>{word.translation}</span>

        <div className='card__examples'>
          {word.examples.map((example) => <WordExample key={example.example} example={example} />)}
        </div>
      </div>
    )
  }

  return (
    <div className='card'>
      <div className='card__description'>
        <div className='card__word text_primary'>{word.word}</div>
        { showTranslation && translationContent()}
      </div>

      <div className='card__actions'>
        <button className='button_primary button_primary-second' onClick={() => setShowTranslation(!showTranslation)}>
          {showTranslation ? 'Hide translation' : 'Show translation'}
        </button>
        <button className='button_primary' onClick={onNextWord}>Next</button>
      </div>

    </div>
  );
}