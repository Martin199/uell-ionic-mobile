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