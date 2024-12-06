import {Quiz} from "./quizType";

export type Question = {
    _id: string; // MongoDB ObjectId
    quizId: string | Quiz; // MongoDB ObjectId referencing the Quiz
    type: 'Multiple Choice' | 'True/False' | 'Fill in the Blank'; // Question type
    title: string; // Question title
    points: number; // Points for the question
    questionText: string; // Text of the question
    choices?: string[]; // Possible answers for Multiple Choice questions
    correctAnswer?: string; // Correct answer for Multiple Choice or Fill in the Blank
    correctAnswers?: string[]; // Multiple correct answers for Fill in the Blank
};

export const questionInitialState: Question = {
    _id: '674bf70a05421f3c54d1760c', // 默认值，用于测试；实际情况留空，待 MongoDB 填充
    quizId: '674bec380e138b094ca2784c', // 必须设置为有效的 Quiz ID
    type: 'Multiple Choice', // 默认问题类型
    title: 'New Question', // 默认标题
    points: 20, // 默认分值
    questionText: 'Write your question here...', // 默认问题文本
    choices: [], // 默认没有选项
    correctAnswer: '', // 默认没有正确答案
    correctAnswers: [], // 默认没有多答案
};

const mockQuestion: Question =
    {
        _id: "1234",
        quizId: "1234",
        type: "Multiple Choice",
        title: "Sample Question",
        points: 10,
        questionText: "What is 2 + 2?",
        choices: ["2", "3", "4"],
        correctAnswer: "4",
    };

export const defaultQuizId : string =  "674bec380e138b094ca2784c";