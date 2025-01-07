import React from 'react';
import { SpeechPart } from '../../../App';
import data from '../../../data/words.json';
import { generateRandomNumber } from '../../../utils/utils';
import { Card } from '../Card/Card';

type CardsGeneratorProps = {
  selectedSpeechParts: SpeechPart[];
  onBack: () => void;
}
export type Example = {
  example: string;
  translation: string;
}
export type Word = {
  word: string;
  translation: string;
  examples: Example[];
}

const useUnreadWordsState = (selectedSpeechParts: SpeechPart[]) => {
  return React.useState<Record<SpeechPart, string[]>>(() => {
    const initData: Record<SpeechPart, string[]> = selectedSpeechParts.reduce((obj, current) => {
      obj[current] = [];
      return obj;
    }, {} as Record<SpeechPart, string[]>);
    (Object.keys(data) as SpeechPart[]).filter((key) => selectedSpeechParts.includes(key)).forEach((key: SpeechPart) => {
      initData[key] = data[key].map((obj) => obj.word);
    });
    return initData;
  });
}

export function CardsGenerator({ selectedSpeechParts, onBack }: CardsGeneratorProps) {
  const [unreadWords, setUnreadWords] = useUnreadWordsState(selectedSpeechParts);
  const [currentWord, setCurrentWord] = React.useState<Word>();
  const [currentSpeechPart, setCurrentSpeechPart] = React.useState<SpeechPart>();

  const removePrevWord = () => {
    if (!unreadWords || !currentSpeechPart) return;
    const newSpeechPartWords = unreadWords[currentSpeechPart].filter((word) => word !== currentWord?.word);
    if (!newSpeechPartWords.length) {
      const newWords = { ...unreadWords };
      delete newWords[currentSpeechPart];
      setUnreadWords(newWords);
      return;
    }
    setUnreadWords({
      ...unreadWords,
      [currentSpeechPart]: newSpeechPartWords,
    })
  }

  const generateNextWord = () => {
    if (!!currentWord) {
      removePrevWord();
    }

    const unreadSpeechPartCount = unreadWords ? Object.keys(unreadWords)?.length : 0;
    if (!unreadSpeechPartCount || !unreadWords) {
      onBack();
      return;
    }
    const speechPartIndex = generateRandomNumber(unreadSpeechPartCount);
    const speechPart = (Object.keys(unreadWords) as SpeechPart[])[speechPartIndex];
    if (!speechPart) return;
    const wordIndex = generateRandomNumber(unreadWords[speechPart].length);
    const word = unreadWords[speechPart][wordIndex];
    const wordObject = data[speechPart].find((obj: Word) => obj.word === word);
    setCurrentWord(wordObject);
    setCurrentSpeechPart(speechPart);
  }

  React.useEffect(() => {
    generateNextWord();
  }, []);

  const cardsContent = () => {
    if (!currentWord || !currentSpeechPart) return <div>No word</div>;

    return (
      <Card word={currentWord}
        speechPart={currentSpeechPart}
        onNextWord={generateNextWord}>
      </Card>
    );
  }

  const completedContent = () => {
    return (
      <div>
        All words reviewed.
      </div>
    );
  }

  return (!unreadWords || !Object.keys(unreadWords).length) ? completedContent() : cardsContent();
}
