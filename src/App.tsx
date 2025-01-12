import React from 'react';
import './App.scss';
import data from './data/words.json'
import { SpeechPartChooser } from './components/SpeechPartChooser/SpeechPartChooser';
import { Cards } from './components/Cards/Cards';
import { Header } from './components/Header/Header';
import { SpeechPart, SpeechPartEnum } from 'types';

function App() {
    const [showCards, setShowCards] = React.useState(false);
    const [speechParts, setSpeechParts] = React.useState<SpeechPart[]>([
        SpeechPartEnum.VERB,
        SpeechPartEnum.NOUN,
        SpeechPartEnum.ADJECTIVE,
        SpeechPartEnum.ADVERB,
        SpeechPartEnum.OTHER,
    ]);
    const version = 'v1.1';

    const onContinue = (speechParts: SpeechPart[]) => {
        setSpeechParts(speechParts);
        setShowCards(true);
    }

    const onBack = () => {
        setShowCards(false);
    }

    return (
        <div className="app">
            <Header version={version} />
            {showCards && <Cards speechParts={speechParts} onBack={onBack} data={data} />}
            {!showCards && <SpeechPartChooser selectedSpeechParts={speechParts} onContinue={onContinue} />}
        </div>
    );
}

export default App;
