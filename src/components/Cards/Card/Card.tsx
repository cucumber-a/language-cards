import React from 'react';
import './Card.scss';
import { LanguageCard } from '../Cards';
import { Button, Card as UiCard, Text, Icon } from '@gravity-ui/uikit';
import { Eye, EyeSlash } from '@gravity-ui/icons';

type CardProps = {
    card: LanguageCard;
    onNextCard: () => void;
}

export function Card({ card, onNextCard }: CardProps) {
    const [showTranslation, setShowTranslation] = React.useState(false);

    return (
        <UiCard className='card' theme="normal" size="l">
            <div className='card__content'>
                <div>
                    <Text variant='display-1' color='info'>
                        {card.primary}
                    </Text>
                </div>
                {showTranslation && (
                    <div><Text variant='display-1' color='primary'>{card.translation}</Text></div>
                )}

                {showTranslation && card.examples && card.examples.map((example) => (
                    <div className='card__examples' key={example.primary}>
                        <div><Text variant='body-3' color='info'>{example.primary}</Text></div>
                        <div><Text variant='body-3' color='primary'>{example.translation}</Text></div>
                    </div>
                ))}
            </div>

            <div className='card__actions'>
                <Button view='outlined-action' size='l' width='max'
                    onClick={() => setShowTranslation(!showTranslation)}>
                    {!showTranslation && <Icon data={Eye}></Icon>}
                    {showTranslation && <Icon data={EyeSlash}></Icon>}
                </Button>
                <Button view='action' size='l' width='max' onClick={onNextCard}>
                    Next
                </Button>
            </div>
        </UiCard>
    );
}