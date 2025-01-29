import React from 'react';
import './ViewSettings.scss';
import { SpeechPart } from 'types';
import { Button, Text } from '@gravity-ui/uikit';
import { RadioButton } from '@gravity-ui/uikit';
import { CheckboxList } from 'shared/CheckboxList/CheckboxList';
import { ALL_SPEECH_PARTS } from 'config';

export type ViewSettings = {
    speechParts: SpeechPart[];
    type: CardType;
    primaryLanguage: Language;
}

type CardType = 'word' | 'sentence';
type Language = 'Serbian' | 'Russian';

type ViewSettingsProps = {
    onSettingsSet: (settings: ViewSettings) => void,
    initialSettings: ViewSettings;
}

export function ViewSettings({ initialSettings, onSettingsSet }: ViewSettingsProps) {
    const [settings, setSettings] = React.useState(initialSettings);
    const [speechPartOptions, setSpeechPartOptions] = React.useState(() => {
        return [...ALL_SPEECH_PARTS].map((speechPart) => ({
            value: initialSettings.speechParts.includes(speechPart),
            label: speechPart,
        }))
    });

    const typeOptions: { value: CardType, content: string }[] = [
        { value: 'word', content: 'Words' },
        { value: 'sentence', content: 'Sentences' },
    ];
    const languageOptions: { value: Language, content: string }[] = [
        { value: 'Serbian', content: 'Serbian' },
        { value: 'Russian', content: 'Russian' },
    ];

    const onContinue = () => {
        onSettingsSet({
            ...settings,
            speechParts: speechPartOptions.filter((speechPart) => speechPart.value).map((v) => v.label),
        })
    };

    return (
        <div className='settings'>
            <p><Text variant='header-2' color='info'>Settings</Text></p>

            <div className='settings__section'>
                <div className='settings__title'>
                    <Text variant='body-3'>Show</Text>
                </div>
                <div>
                    <RadioButton name="type"
                        onUpdate={(newType) => setSettings({ ...settings, type: newType })}
                        value={settings.type}
                        options={typeOptions}
                        size="xl" />
                </div>
            </div>

            <div className='settings__section'>
                <div className='settings__title'>
                    <Text variant='body-3'>Primary language</Text>
                </div>
                <div>
                    <RadioButton name="language"
                        onUpdate={(language) => setSettings({ ...settings, primaryLanguage: language })}
                        value={settings.primaryLanguage}
                        options={languageOptions}
                        size="xl" />
                </div>
            </div>

            <div className='settings__section'>
                <div className='settings__title'>
                    <Text className='settings__title' variant='body-3'>Speech parts</Text>
                </div>
                <CheckboxList<SpeechPart> options={speechPartOptions} onUpdate={(state) => setSpeechPartOptions(state)} />
            </div>

            <Button width='max'
                disabled={!speechPartOptions.some((v) => v.value)}
                onClick={onContinue}
                view='action'
                size='l'>Continue</Button>

        </div>
    )
}