export interface IMentalStatusResponse {
    context: IContextStatus[];
    created: string | null;
    emotion: IEmotionStatus[];
    moods: IMoodsStatus[]
}
export interface IMoodsStatus {
    id: number;
    description: string;
}
    export interface IEmotionStatus {
        id: number;
        description: string;
        emotionalColor: string | null;
        imgReference: string | null;
}
export interface IContextStatus {
    id: number;
    description: string;
}
export interface IMentalStatusPayload {
    emotionIdList: number[];
    contextIdList: number[];
    moodId: number;
}

export interface Emoji {
    id: number;
    urlSvg: string;
    urlGif: string;
    label: string;
}
export interface EmotionalResponse {
   content: ContentEmotional;
}
export interface ContentEmotional {
    created?: Date;
    description: string;
    imgReference: string;
}