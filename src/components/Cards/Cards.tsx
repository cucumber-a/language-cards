import React from 'react';
import './Cards.scss';
import { Example, Word } from 'types';
import { Card } from './Card/Card';
import { ViewSettings } from 'components/ViewSettings/ViewSettings';
import { Button, Text } from '@gravity-ui/uikit';

type CardsProps = {
    data: Word[] | undefined;
    settings: ViewSettings;
    onBack: () => void;
}

export type LanguageCard = {
    primary: string;
    translation: string;
    examples?: Pick<LanguageCard, 'primary' | 'translation'>[];
}

const useCardsState = (settings: ViewSettings, data: Word[] | undefined) => {
    return React.useState<LanguageCard[]>(() => {
        if (!data) return [];

        const cards: LanguageCard[] = [];
        data.forEach((word) => {
            if (!settings.speechParts.includes(word.speechPart)) return;
            const reverseTranslation = settings.primaryLanguage !== 'Serbian';

            const primaryProp = !reverseTranslation ? 'example' : 'translation';
            const translationProp = !reverseTranslation ? 'translation' : 'example';
            const examples = word.examples.map((example: Example) => ({
                primary: example[primaryProp],
                translation: example[translationProp],
            }));

            if (settings.type === 'sentence' && word.examples?.length) {
                cards.push(...examples);
            } else {
                cards.push({
                    primary: reverseTranslation ? word.translation : word.word,
                    translation: reverseTranslation ? word.word : word.translation,
                    examples: examples,
                });
            }
        });

        return cards;
    });
}

export function Cards({ data, settings, onBack }: CardsProps) {
    const [cards, setCards] = useCardsState(settings, data);

    const currentCardIndex = React.useMemo(() => {
        return cards.length > 0 ? Math.floor(Math.random() * cards.length) : -1;
    }, [cards]);

    const removeCurrentWord = () => {
        setCards([...cards.slice(0, currentCardIndex), ...cards.slice(currentCardIndex + 1)]);
    }

    const onNextCard = () => {
        removeCurrentWord();
    }

    return (
        <div className='cards'>

            <div className='cards__header'>
                <Button view='outlined' size='l' width='auto' onClick={onBack}>
                    Back
                </Button>
                <div className='speech-parts'>
                    {settings.speechParts.map(speechPart => (
                        <Text key={speechPart} color='complementary' variant="body-1">
                            {speechPart}
                        </Text>
                    ))}
                </div>
            </div>

            {!cards.length && <div className='cards__placeholder'>All cards reviewed</div>}
            {!!cards.length && <Card key={cards[currentCardIndex].primary} card={cards[currentCardIndex]} onNextCard={onNextCard} />}
        </div>
    )
}