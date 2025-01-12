import React from 'react';
import './PairContent.scss';

type PairContentProps = {
    original: string;
    translation: string;
}

export function PairContent({ original, translation }: PairContentProps) {
    return (
        <div className='pair-content'>
            <div className='pair-content__original'>{original}</div>
            <div className='pair-content__translation'>{translation}</div>
        </div>
    );
}