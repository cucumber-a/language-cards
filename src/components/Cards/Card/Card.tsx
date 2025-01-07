import React from 'react';
import { Word } from '../CardsGenerator/CardsGenerator';
import { SpeechPart } from '../../../App';
import { WordExample } from '../WordExample/WordExample';

type CardProps = {
  word: Word;
  speechPart: SpeechPart;
  onNextWord: () => void;
}

export function Card({ word, speechPart, onNextWord }: CardProps) {
  const [showTranslation, setShowTranslation] = React.useState(false);

  const translationContent = () => {
    return (
      <div className='card__translation'>
        {word.translation}

        <div className='card__examples'>
          {word.examples.map((example) => <WordExample key={example.example} example={example} />)}
        </div>
      </div>
    )
  }

  return (
    <div className='card'>
      <div className='card__word'>{word.word}</div>

      <button className='button_primary' onClick={() => setShowTranslation(!showTranslation)}>
        {showTranslation ? 'Hide translation' : 'Show translation'}
      </button>

      { showTranslation && translationContent()}

      <button className='nutton_primary' onClick={onNextWord}>Next word</button>
    </div>
  );
}