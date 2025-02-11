export interface Question {
    question?: string;
    answerA: Answer,
    answerB: Answer,
    answerC?: Answer,
    fcName: string 
}

interface Answer {
    label: string,
    value: number | boolean
}