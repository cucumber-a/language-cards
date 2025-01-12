export enum SpeechPartEnum {
    VERB = 'Verb',
    NOUN = 'Noun',
    ADJECTIVE = 'Adjective',
    ADVERB = 'Adverb',
    OTHER = 'Other',
}
export type SpeechPart = SpeechPartEnum;
export type Example = {
    example: string;
    translation: string;
}
export type Word = {
    id: number;
    word: string;
    translation: string;
    examples: Example[];
}
export type Words = Record<SpeechPart, Word[]>;