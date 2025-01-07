import React from 'react';
import './App.scss';
import data from './data/words.json'
import { SpeechPartChooser } from './components/SpeechPartChooser/SpeechPartChooser';
import { Cards } from './components/Cards/Cards';

export type SpeechPart = keyof typeof data;
export type Words = typeof data;

function App() {
  const [showCards, setShowCards] = React.useState(false);
  const [speechParts, setSpeechParts] = React.useState<SpeechPart[]>(Object.keys(data) as SpeechPart[]);

  const onContinue = (speechParts: SpeechPart[]) => {
    setSpeechParts(speechParts);
    setShowCards(true);
  }

  const onBack = () => {
    setSpeechParts(Object.keys(data) as SpeechPart[]);
    setShowCards(false);
  }

  const renderContent = () => {
    if (showCards) {
      return <Cards speechParts={speechParts} onBack={onBack} data={data} />
    }
    return <SpeechPartChooser onContinue={onContinue}/>;
  }

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;
