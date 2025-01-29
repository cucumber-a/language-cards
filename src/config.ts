import { ViewSettings } from "components/ViewSettings/ViewSettings";
import { SpeechPartEnum } from "types";

export const ALL_SPEECH_PARTS = [
    SpeechPartEnum.VERB,
    SpeechPartEnum.NOUN,
    SpeechPartEnum.ADJECTIVE,
    SpeechPartEnum.ADVERB,
    SpeechPartEnum.OTHER,
]

export const INITIAL_SETTINGS: ViewSettings = {
    speechParts: [...ALL_SPEECH_PARTS],
    type: 'word',
    primaryLanguage: 'Serbian',
}