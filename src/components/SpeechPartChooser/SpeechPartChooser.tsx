import React from 'react';
import { CheckboxInput } from '../../shared/CheckboxInput/CheckboxInput';
import './SpeechPartChooser.scss'
import { SpeechPart, SpeechPartEnum } from 'types';

type SpeechPartProps = {
    selectedSpeechParts: SpeechPart[];
    onContinue: (speechParts: SpeechPart[]) => void,
}

function setInitialSpeechParts(selectedSpeechParts: SpeechPart[] = []): Record<SpeechPartEnum, boolean> {
    const selectedParts = {
        [SpeechPartEnum.VERB]: false,
        [SpeechPartEnum.NOUN]: false,
        [SpeechPartEnum.ADJECTIVE]: false,
        [SpeechPartEnum.ADVERB]: false,
        [SpeechPartEnum.OTHER]: false,
    };
    selectedSpeechParts.forEach((speechPart) => selectedParts[speechPart] = true);
    return selectedParts;
}

export function SpeechPartChooser({ selectedSpeechParts, onContinue }: SpeechPartProps) {
    const [speechParts, setSpeechParts] = React.useState(setInitialSpeechParts(selectedSpeechParts));

    const isContinueDisabled = Object.values(speechParts).every((v) => !v);
    
    const onContinueClick = () => {
        const selectedSpeechParts: SpeechPart[] = [];
        (Object.keys(speechParts) as SpeechPart[]).forEach((key) => {
            if (speechParts[key]) {
                selectedSpeechParts.push(key);
            }
        });
        return onContinue(selectedSpeechParts);
    };

    const onCheckboxUpdate = (label: SpeechPart, checked: boolean) => {
        setSpeechParts({
            ...speechParts,
            [label]: checked,
        });
    };

    const checkboxContent = (speechPart: SpeechPart) => {
        return (
            <CheckboxInput label={`${speechPart}s`}
                key={speechPart}
                value={speechParts[speechPart]}
                onUpdate={onCheckboxUpdate.bind(null, speechPart)} />
        )
    };

    const checkboxesListContent = () => {
        return (Object.keys(speechParts) as SpeechPart[])
            .map((speechPart: SpeechPart) => checkboxContent(speechPart));
    };

    return (
        <div className='speech-part-chooser'>
            <div className='speech-part-chooser__title title'>Select</div>
            <div className='speech-part-chooser__checkbox-list'>
                {checkboxesListContent()}
            </div>
            <button className='button_primary'
                disabled={isContinueDisabled}
                onClick={onContinueClick}>
                Continue
            </button>
        </div>
    )
}
