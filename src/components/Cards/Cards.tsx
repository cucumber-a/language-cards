import React from 'react';
import './Cards.scss';
import { SpeechPart, Word, Words } from 'types';
import { Card } from './Card/Card';

type CardsProps = {
    speechParts: SpeechPart[];
    data: Words;
    onBack: () => void;
}

const useAllowedWordsState = (selectedSpeechParts: SpeechPart[], data: Words) => {
    return React.useState<Word[]>(() => {
        const words = selectedSpeechParts.map((speechPart) => data[speechPart]);
        return words.flat();
    });
}

export function Cards({ speechParts, data, onBack }: CardsProps) {
    const [allowedWords, setAllowedWords] = useAllowedWordsState(speechParts, data);

    const currentWordIndex = React.useMemo(() => {
        return allowedWords.length > 0 ? Math.floor(Math.random() * allowedWords.length) : -1;
    }, [allowedWords]);

    const removeCurrentWord = () => {
        const nextWords = [...allowedWords.slice(0, currentWordIndex), ...allowedWords.slice(currentWordIndex + 1)];
        setAllowedWords(nextWords);
    }

    const cardsContent = () => {
        if (!allowedWords.length) {
            return <div>All words reviewed</div>;
        }
        const word = allowedWords[currentWordIndex];
        return <Card word={word} key={word.word} onNextWord={removeCurrentWord} />
    }

    const titlesContent = speechParts.map((speechPart) => {
        return <span key={speechPart} className='text_secondary'>{speechPart}</span>
    });

    return (
        <div className='cards'>
            <div className="cards__header">
                <button onClick={onBack}
                    className='button_ghost cards__back-button'>
                    Back
                </button>
                <div className='speech-parts'>{titlesContent}</div>
            </div>
            <div className='cards__content'>
                {cardsContent()}
            </div>
        </div>
    )
}