export enum SpeechPartEnum {
    VERB = 'Verb',
    NOUN = 'Noun',
    ADJECTIVE = 'Adjective',
    ADVERB = 'Adverb',
    OTHER = 'Other',
}
export type SpeechPart = SpeechPartEnum;
export type Word = {
    id: number;
    speechPart: SpeechPart;
    word: string;
    translation: string;
    examples: Example[];
};
export type Example = {
    example: string;
    translation: string;
};