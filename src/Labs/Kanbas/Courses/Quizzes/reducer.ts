import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz } from "./quizType"; // Ensure this path is correct


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
        addQuiz: (state, action: PayloadAction<Quiz>) => {
            state.quizzes.push(action.payload);
        },

        // Action to delete a quiz
        deleteQuiz: (state, action: PayloadAction<string>) => {
            state.quizzes = state.quizzes.filter(quiz => quiz._id !== action.payload);
        },

        // Action to set quizzes (e.g., after fetching them)
        setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
            state.quizzes = action.payload;
        },

        // Action to update a quiz (used for updating after publish toggle or any update)
        updateQuiz: (state, action: PayloadAction<Quiz>) => {
            const index = state.quizzes.findIndex(quiz => quiz._id === action.payload._id);
            if (index !== -1) {
                state.quizzes[index] = action.payload;
            }
        }
    },
    

    //    deleteQuiz: (state, { payload: quizId }) => {
    //    state.quizzes = state.quizzes.filter(quiz => quiz._id !== quizId);

});

export const { addQuiz, deleteQuiz, setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;

