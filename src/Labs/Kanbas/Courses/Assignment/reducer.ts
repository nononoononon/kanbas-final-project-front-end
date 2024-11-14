import { createSlice } from "@reduxjs/toolkit";

type Assignment = {
    _id: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    availableDate: string;
    notAvailableAt: string;
    course?: string;
};

const initialState = {
    assignments: [] as Assignment[],
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },

        addAssignment: (state, { payload: assignment }) => {
            const newAssignment: Assignment = {
                _id: `A${new Date().getTime().toString().slice(3)}`,
                title: assignment.title,
                description: assignment.description,
                points: assignment.points,
                dueDate: assignment.dueDate,
                availableDate: assignment.availableDate,
                notAvailableAt: assignment.notAvailableAt,
                course: assignment.course,
            };
            state.assignments = [...state.assignments, newAssignment];
        },

        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== assignmentId
            );
        },

        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a) =>
                a._id === assignment._id ? assignment : a
            );
        },

        editAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.map((a) =>
                a._id === assignmentId ? { ...a, editing: true } : a
            );
        },
    },
});

export const { setAssignments, addAssignment, deleteAssignment, updateAssignment, editAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;