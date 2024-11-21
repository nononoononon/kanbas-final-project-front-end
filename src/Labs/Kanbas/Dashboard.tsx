// Dashboard.tsx
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import * as coursesClient from'./Courses/client'
import { useSelector, useDispatch } from "react-redux";

interface Course {
    _id: string;
    name: string;
    description: string;
}

interface User {
    _id: string;
    role: string;
}

interface Enrollment {
    user: string;
    course: string;
}

interface RootState {
    accountReducer: {
        currentUser: User;
    };
    enrollmentReducer: {
        enrollments: Enrollment[];
    };
}

interface DashboardProps {
    courses: Course[];
    course: Course;
    setCourse: (course: Course) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: string) => void;
    updateCourse: () => void;
}

export default function Dashboard({
                                      courses,
                                      course,
                                      setCourse,
                                      addNewCourse,
                                      deleteCourse,
                                      updateCourse,
                                  }: DashboardProps) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const enrollments = useSelector(
        (state: RootState) => state.enrollmentReducer.enrollments
    );
    const [showAllCourses, setShowAllCourses] = useState(false);

    const isStudent = currentUser.role.toUpperCase() === "STUDENT";
    const [allCourses, setAllCourses] = useState<Course[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesData = await coursesClient.fetchAllCourses();
                setAllCourses(coursesData);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = isStudent
        ? showAllCourses
            ? courses
            : courses.filter((course) =>
                enrollments.some(
                    (enrollment) =>
                        enrollment.user === currentUser._id && enrollment.course === course._id
                )
            )
        : courses;

    const handleEnroll = async (courseId: string) => {
        dispatch({
            type: "ENROLL",
            payload: {
                userId: currentUser._id,
                courseId,
            },
        });

        try {
            await coursesClient.enrollUserInCourse(currentUser._id, courseId);
        } catch (error) {
            console.error("Enroll failed:", error);
        }
    };

    const handleUnenroll = async (courseId: string) => {
        dispatch({
            type: "UNENROLL",
            payload: {
                userId: currentUser._id,
                courseId,
            },
        });

        try {
            await coursesClient.unenrollUserFromCourse(currentUser._id, courseId);
        } catch (error) {
            console.error("Unenroll failed:", error);
        }
    };

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            {!isStudent && (
                <>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>New Course</h5>
                        <div>
                            <button
                                className="btn btn-primary me-2"
                                id="wd-add-new-course-click"
                                onClick={addNewCourse}
                            >
                                Add
                            </button>
                            <button
                                className="btn btn-warning"
                                onClick={updateCourse}
                                id="wd-update-course-click"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                    <br />

                    <input
                        defaultValue={course.name}
                        className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                    />
                    <textarea
                        defaultValue={course.description}
                        className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    />
                </>
            )}
            <hr/>
            <div className="d-flex justify-content-between align-items-center">
                <h2 id="wd-dashboard-published">
                    Published Courses ({filteredCourses.length})
                </h2>
                {isStudent && (
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAllCourses(!showAllCourses)}
                    >
                        Enrollments
                    </button>
                )}
            </div>
            <hr/>
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {filteredCourses.map((course) => {
                        const isEnrolled = enrollments.some(
                            (enrollment) =>
                                enrollment.user === currentUser._id &&
                                enrollment.course === course._id
                        );
                        return (
                            <div
                                key={course._id}
                                className="wd-dashboard-course col"
                                style={{width: "300px"}}
                            >
                                <div className="card rounded-3 overflow-hidden">
                                    <Link
                                        to={`/Kanbas/Courses/${course._id}/Home`}
                                        className="wd-dashboard-course-link text-decoration-none text-dark"
                                    >
                                        <img
                                            src={`/images/courses/${course._id}.jpg`}
                                            width="100%"
                                            height={160}
                                            onError={(e) => {
                                                e.currentTarget.src = "/images/courses/RS101.jpg";
                                            }}
                                        />
                                        <div className="card-body">
                                            <h5 className="wd-dashboard-course-title card-title">
                                                {course.name}
                                            </h5>
                                            <p
                                                className="wd-dashboard-course-title card-text overflow-y-hidden"
                                                style={{maxHeight: 100}}
                                            >
                                                {course.description}
                                            </p>
                                            {!isStudent && (
                                                <>
                                                    <button className="btn btn-primary">Go</button>
                                                    <button
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            deleteCourse(course._id);
                                                        }}
                                                        className="btn btn-danger float-end"
                                                        id="wd-delete-course-click"
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        id="wd-edit-course-click"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            setCourse(course);
                                                        }}
                                                        className="btn btn-warning me-2 float-end"
                                                    >
                                                        Edit
                                                    </button>
                                                </>
                                            )}
                                            {isStudent && (
                                                <>
                                                    <button className="btn btn-primary">Go</button>
                                                    {isEnrolled ? (
                                                        <button
                                                            className="btn btn-danger float-end"
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                handleUnenroll(course._id);
                                                            }}
                                                        >
                                                            Unenroll
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-success float-end"
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                handleEnroll(course._id);
                                                            }}
                                                        >
                                                            Enroll
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}