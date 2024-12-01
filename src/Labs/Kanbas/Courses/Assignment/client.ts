import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignment`;

type Assignment = {
    _id?: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    availableDate: string;
    notAvailableAt: string;
    course?: string;
};

export const updateAssignment = async (assignment: Assignment) => {
    const { _id, ...data } = assignment; // Exclude `_id` for the request body
    const response = await axios.put(`${ASSIGNMENTS_API}/${_id}`, data);
    return response.data;
};


export const deleteAssignment = async (assignmentId: string) => {
    const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/assignment`);
    return response.data;
};

export const createAssignment = async (courseId: string, assignment: Assignment) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/assignment`, assignment);
    return response.data;
};

export const findAssignmentById = async (courseId: string, assignmentId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/assignment/${assignmentId}`);
    return response.data;
};