import React, { useEffect } from 'react';
import './App.scss';
import data from './data/words.json'
import { Cards } from './components/Cards/Cards';
import { Header } from './components/Header/Header';
import { Word } from 'types';
import { ViewSettings } from 'components/ViewSettings/ViewSettings';
import { INITIAL_SETTINGS } from 'config';
import { Loader } from '@gravity-ui/uikit';

function getData() {
    return Promise.resolve(data);
}

function App() {
    const [showSettings, setShowSettings] = React.useState(true);
    const [settings, setSettings] = React.useState<ViewSettings>(INITIAL_SETTINGS);
    const [data, setData] = React.useState<Word[]>();
    const [status, setStatus] = React.useState<'loading' | 'error' | 'success'>('loading');
    const [error, setError] = React.useState('');

    const version = 'v1.2';

    useEffect(() => {
        setStatus('loading');
        const requestData = async () => {
            try {
                const data = await getData();
                setData(data as Word[]);
                setStatus('success');
            } catch (err: any) {
                setError(err?.message || String(err) || 'Unexpected error');
                setStatus('error');
            }
        }
        requestData();
    }, []);

    const onBack = () => {
        setShowSettings(true);
    }

    const onSettingsSet = (settings: ViewSettings) => {
        setSettings(settings);
        setShowSettings(false);
    }

    return (
        <div className="app">
            <Header version={version} />
            {status === 'loading' && <div className='loading'><Loader size="l" /></div>}
            {status === 'error' && <div className='error'>{error}</div>}
            {status === 'success' && !showSettings && <Cards settings={settings} onBack={onBack} data={data} />}
            {status === 'success' && showSettings && <ViewSettings initialSettings={settings} onSettingsSet={onSettingsSet} />}
        </div>
    );
}

export default App;
