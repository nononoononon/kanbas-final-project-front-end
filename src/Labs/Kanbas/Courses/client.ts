import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const ENROLL_API = `${REMOTE_SERVER}/api/enrollments`;
export const updateCourse = async (course: any) => {
    const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
    return data;
};

export const deleteCourse = async (id: string) => {
    const { data } = await axios.delete(`${COURSES_API}/${id}`);
    return data;
};

export const createCourse = async (course: any) => {
    const response = await axios.post(COURSES_API, course);
    return response.data;
};

export const fetchAllCourses = async () => {
    const { data } = await axios.get(COURSES_API);
    return data;
};

export const findModulesForCourse = async (courseId: string) => {
    const response = await axios
        .get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/modules`,
        module
    );
    return response.data;
};

export const enrollUserInCourse = async (userId:string, courseId:string) => {
    const response = await axios.post(`${ENROLL_API}`, {
        user: userId,
        course: courseId,
    });
    return response.data;
};

export const unenrollUserFromCourse = async (userId:string, courseId:string) => {
    const response = await axios.delete(`${ENROLL_API}`, {
        data: { user: userId, course: courseId },
    });
    return response.data;
};


export const getAllEnrollments = async () => {
    const response = await axios.get(ENROLL_API);
    return response.data;
};