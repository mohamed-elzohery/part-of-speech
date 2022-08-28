export enum Category{
    ADJECTIVE = "adjective",
    ADVERB = "adverb",
    VERB = "verb",
    NOUN = "noun",
}

export interface Word{
    id: number,
    word: string,
    pos: Category
}