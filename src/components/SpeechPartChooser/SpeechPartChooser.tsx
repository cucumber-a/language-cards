import React from 'react';
import { SpeechPart } from "../../App"
import { CheckboxInput } from '../../shared/CheckboxInput/CheckboxInput';
import './SpeechPartChooser.scss'

type SpeechPartProps = {
  onContinue: (speechParts: SpeechPart[]) => void,
}

export function SpeechPartChooser({ onContinue: propsOnContinue }: SpeechPartProps) {

  const [speechParts, setSpeechParts] = React.useState<Record<SpeechPart, boolean>>({
    'Verbs': true,
    'Nouns': true,
    'Adjectives': true,
    'Adverbs': true,
    'Other': true,
  });

  const onContinue = React.useMemo<React.MouseEventHandler<HTMLButtonElement>>(() => {
    const selectedSpeechParts: SpeechPart[] = [];
    (Object.keys(speechParts) as SpeechPart[]).forEach((key) => {
      if (speechParts[key]) {
        selectedSpeechParts.push(key);
      }
    });
    return (event) => propsOnContinue(selectedSpeechParts);
  }, [propsOnContinue, speechParts]);

  const onCheckboxUpdate = (label: SpeechPart, checked: boolean) => {
    setSpeechParts({
      ...speechParts,
      [label]: checked,
    })
  }

  const checkboxesListContent = () => {
    const content = (Object.keys(speechParts) as SpeechPart[]).map((speechPart: SpeechPart) => {
      return (
        <CheckboxInput label={speechPart}
                       key={speechPart}
                       value={speechParts[speechPart]}
                       onUpdate={onCheckboxUpdate.bind(null, speechPart)}
        />
      )
    })

    return content;
  }

  return (
    <div>
      <div className='title'>Select</div>
      <div className='speech-part-chooser__checkbox-list'>
        {checkboxesListContent()}
      </div>
      <button className='button_primary'
              disabled={!Object.values(speechParts).some(v => v)}
              onClick={onContinue}>Continue</button>
    </div>
  )
}