export type QuizSettings = {
    quizType: 'Graded Quiz' | 'Practice Quiz' | 'Graded Survey' | 'Ungraded Survey';
    assignmentGroup: 'Quizzes' | 'Exams' | 'Assignments' | 'Project';
    shuffleAnswers: boolean;
    timeLimit: number; // In minutes
    multipleAttempts: boolean;
    attemptsAllowed: number;
    showCorrectAnswers: boolean;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
};

export type Quiz = {
    _id: string; // MongoDB ObjectId
    title: string;
    description?: string;
    courseId: string; // MongoDB ObjectId (referencing CourseModel)
    createdBy: string; // MongoDB ObjectId (referencing UserModel)
    settings: QuizSettings;
    points: number;
    published: boolean;
    questions: string[]; // Array of MongoDB ObjectIds (referencing QuestionModel)
    dueDate?: Date;
    availableFrom?: Date;
    availableUntil?: Date;
};

export const quizInitialState: Quiz = {
    _id: '', // 测试目前是1234，正常初始为空，等mongodb给
    title: 'New Quiz',
    description: 'Please describe this quiz',
    courseId: '6747e89997ff8ea63ab721ae', // 这个记得给值，不然报错
    createdBy: '6747c18897ff8ea63ab7218d', // 这个记得给值，不然报错
    settings: {
        quizType: 'Graded Quiz',
        assignmentGroup: 'Quizzes',
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        attemptsAllowed: 1,
        showCorrectAnswers: true,
        accessCode: '',
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
    },
    points: 0,
    published: false,
    questions: [], //question id合集
    dueDate: new Date(),
    availableFrom: new Date(),
    availableUntil: new Date(),
};

export const mockQuiz: Quiz = {
    _id: '', // 测试目前是1234，正常初始为空，等mongodb给
    title: 'New Quiz',
    description: 'Please describe this quiz',
    courseId: '', // 这个记得给值，不然报错
    createdBy: '', // 这个记得给值，不然报错
    settings: {
        quizType: 'Graded Quiz',
        assignmentGroup: 'Quizzes',
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        attemptsAllowed: 1,
        showCorrectAnswers: true,
        accessCode: '',
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
    },
    points: 30,
    published: false,
    questions: ['1234'], //question id合集
    dueDate: new Date(),
    availableFrom: new Date(),
    availableUntil: new Date(),
};