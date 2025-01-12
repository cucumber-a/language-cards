import React, { useEffect } from 'react';
import './App.scss';
import data from './data/words.json'
import { SpeechPartChooser } from './components/SpeechPartChooser/SpeechPartChooser';
import { Cards } from './components/Cards/Cards';
import { Header } from './components/Header/Header';
import { SpeechPart, SpeechPartEnum, Words } from 'types';

function getData() {
    return Promise.resolve(data);
}

function App() {
    const [showCards, setShowCards] = React.useState(false);
    const [speechParts, setSpeechParts] = React.useState<SpeechPart[]>([
        SpeechPartEnum.VERB,
        SpeechPartEnum.NOUN,
        SpeechPartEnum.ADJECTIVE,
        SpeechPartEnum.ADVERB,
        SpeechPartEnum.OTHER,
    ]);
    const [data, setData] = React.useState<Words>();
    const [status, setStatus] = React.useState<'loading' | 'error' | 'success'>('loading');
    const [error, setError] = React.useState('');
    const version = 'v1.1';

    useEffect(() => { 
        setStatus('loading');
        const requestData = async () => {
            try {
                const data = await getData();
                setData(data);
                setStatus('success');
            } catch (err: any) {
                setError(err?.message || String(err) || 'Unexpected error');
                setStatus('error');
            }
        }
        requestData();
    }, []);

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
            {status === 'loading' && <div className='loading'>Loading...</div>}
            {status === 'error' && <div className='error'>{error}</div>}
            {status === 'success' && showCards && <Cards speechParts={speechParts} onBack={onBack} data={data} />}
            {status === 'success' && !showCards && <SpeechPartChooser selectedSpeechParts={speechParts} onContinue={onContinue} />}
        </div>
    );
}

export default App;
