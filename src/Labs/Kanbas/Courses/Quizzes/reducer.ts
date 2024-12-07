import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockQuiz, Quiz, quizInitialState } from "./quizType"; 


interface QuizzesState {
    quizzes: Quiz[];
}

const initialState: QuizzesState = {
    quizzes: [] as Quiz[],
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,

    reducers: {
        // Action to add a quiz
        addQuiz: (state: any, { payload: quiz }) => {
            const newQuiz = quizInitialState; // 使用 quizInitialState 作为初始 quiz
            state.quizzes = [ ...state.quizzes, newQuiz];
        },

        // Action to delete a quiz
        deleteQuiz: (state: any, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
        },

        // Action to set quizzes (e.g., after fetching them)
        setQuizzes: (state: any, action: any) => {
            state.quizzes = action.payload;
        },

        // Action to update a quiz (used for updating after publish toggle or any update)
        updateQuiz: (state: any, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quiz._id ? quiz : q
            ) as any;
        },

        // Action to edit a quiz
        editQuiz: (state: any, { payload: quizId }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quizId ? { ...q, editing: true } : q
            ) as any;
        },
    },

});

export const { addQuiz, deleteQuiz, setQuizzes, updateQuiz, editQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;

