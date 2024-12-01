import { Routes, Route, Navigate } from "react-router";
import "./styles.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import KanbasNavigation from "./Navigation";
import * as courseClient from "./Courses/client";
import {useEffect, useState} from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import {useSelector} from "react-redux";
export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",enrolled: false,
    });
    const [enrolling, setEnrolling] = useState<boolean>(false);

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const findCoursesForUser = async () => {
        if (!currentUser) {
            console.error("currentUser is null");
            return;
        }
        try {
            const courses = await userClient.findCoursesForUser(currentUser._id);
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
            console.log('Enrolled Courses:', enrolledCourses);
            const courses = allCourses.map((course: any) => {
                if (enrolledCourses.find((c: any) => c._id === course._id)) {
                    return { ...course, enrolled: true };
                } else {
                    return course;
                }
            });
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };


    const updateCourse = async () => {
        await courseClient.updateCourse(course);
        setCourses(courses.map((c) => {
                if (c._id === course._id) { return course; }
                else { return c; }
            })
        );};

    const deleteCourse = async (courseId: string) => {
        const status = await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
    };

    const addNewCourse = async () => {
        const newCourse = await courseClient.createCourse(course);
        setCourses([...courses, newCourse]);
    };

    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        if (enrolled) {
            await userClient.enrollIntoCourse(currentUser._id, courseId);
        } else {
            await userClient.unenrollFromCourse(currentUser._id, courseId);
        }
        setCourses(
            courses.map((course) => {
                if (course._id === courseId) {
                    return { ...course, enrolled: enrolled };
                } else {
                    return course;
                }
            })
        );
    };

    useEffect(() => {
        console.log("Current User:", currentUser);
        if (!currentUser) {
            console.log("currentUser is null, waiting for it to be set.");
            return;
        }
        if (enrolling) {
            fetchCourses();
        } else {
            findCoursesForUser();
            console.log("Current User's courses:", courses);
        }
    }, [currentUser, enrolling]);




    return (
        <Session>
        <div id="wd-kanbas">
            <div>
                <KanbasNavigation />
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="/Kanbas/Account" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="Dashboard" element={
                            <ProtectedRoute>
                            <Dashboard
                                courses={courses}
                                course={course}
                                setCourse={setCourse}
                                addNewCourse={addNewCourse}
                                deleteCourse={deleteCourse}
                                updateCourse={updateCourse}
                                enrolling={enrolling}
                                setEnrolling={setEnrolling}
                                updateEnrollment={updateEnrollment}
                            />
                            </ProtectedRoute>
                        } />
                        <Route path="Courses/:cid/*" element={
                            <ProtectedRoute>
                            <Courses courses={courses} />
                            </ProtectedRoute>
                        } />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
            </div>

        </div>
        </Session>
    );}
