// enrollmentReducer.ts
import { AnyAction } from "redux";
import * as db from "./Database";

interface Enrollment {
    user: string;
    course: string;
}

interface EnrollmentState {
    enrollments: Enrollment[];
}

const initialState: EnrollmentState = {
    enrollments: db.enrollments as Enrollment[], // 确保 db.enrollments 类型正确
};

const enrollmentReducer = (
    state: EnrollmentState = initialState,
    action: AnyAction
): EnrollmentState => {
    switch (action.type) {
        case "ENROLL":
            return {
                ...state,
                enrollments: [
                    ...state.enrollments,
                    {
                        user: action.payload.userId,
                        course: action.payload.courseId,
                    },
                ],
            };
        case "UNENROLL":
            return {
                ...state,
                enrollments: state.enrollments.filter(
                    (enrollment) =>
                        !(
                            enrollment.user === action.payload.userId &&
                            enrollment.course === action.payload.courseId
                        )
                ),
            };
        default:
            return state;
    }
};

export default enrollmentReducer;