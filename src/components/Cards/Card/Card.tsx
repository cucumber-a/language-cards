import React from 'react';
import { PairContent } from '../PairContent/PairContent';
import './Card.scss';
import { Word } from 'types';
import { IconEye } from 'icons/IconEye';

type CardProps = {
    word: Word;
    onNextWord: () => void;
}

export function Card({ word, onNextWord }: CardProps) {
    const [showTranslation, setShowTranslation] = React.useState(false);

    return (
        <div className='card'>
            <div className='card__content'>
                <div className='card__word'>{word.word}</div>
                {showTranslation && <div className='card__word card__translation'>{word.translation}</div>}
                {showTranslation && <div className='card__examples'>{word.examples.map((example) => (
                    <PairContent key={example.example} original={example.example} translation={example.translation} />
                ))}</div>}
            </div>

            <div className='card__actions'>
                <button className='button_primary button_primary-second' onClick={() => setShowTranslation(!showTranslation)}>
                    <IconEye invisible={showTranslation} />
                </button>
                <button className='button_primary' onClick={onNextWord}>Next</button>
            </div>

        </div>
    );
}