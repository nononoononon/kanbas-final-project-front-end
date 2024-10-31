import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../Database";
type Assignment = {
    _id: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    availableDate: string;
    notAvailableAt: string;
};

const initialState = {
    assignments: db.assignments as Assignment[], // 使用初始数据填充
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            const newAssignment = {
                ...action.payload,
                _id: `A${new Date().getTime().toString().slice(3)}`,
            };
            state.assignments.push(newAssignment);
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) =>
                assignment._id === action.payload._id ? action.payload : assignment
            );
        },
        editAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) =>
                assignment._id === action.payload
                    ? { ...assignment, editing: true }
                    : assignment
            );
        },
    },
});

export const {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    editAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;