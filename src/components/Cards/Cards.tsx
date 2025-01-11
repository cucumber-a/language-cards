import React from 'react';
import './Cards.scss';
import { SpeechPart, Words } from '../../App';
import { CardsGenerator } from './CardsGenerator/CardsGenerator';

type CardsProps = {
    speechParts: SpeechPart[];
    data: Words;
    onBack: () => void;
}

export function Cards({ speechParts, onBack }: CardsProps) {

    const headerContent = () => {
        const titles = speechParts.map((speechPart) => {
            return <span key={speechPart} className='text_secondary'>{speechPart}</span>
        });
        return (
            <div className="cards__header">
                <button onClick={onBack}
                    className='button_ghost cards__back-button'>
                    Back
                </button>
                <div className='speech-parts'>{titles}</div>
            </div>
        )
    };

    return (
        <div>
            {headerContent()}
            <CardsGenerator selectedSpeechParts={speechParts} onBack={onBack}></CardsGenerator>
        </div>
    )
}