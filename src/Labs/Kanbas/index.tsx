import { Routes, Route, Navigate } from "react-router";
import "./styles.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import KanbasNavigation from "./Navigation";
import * as client from "./Courses/client";
import {useEffect, useState} from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    const updateCourse = async () => {
        await client.updateCourse(course);
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
    };

    const deleteCourse = async (courseId: string) => {
        await client.deleteCourse(courseId);
        setCourses(courses.filter(
            (c) => c._id !== courseId));
    };

    const addNewCourse = async () => {
        const newCourse = await client.createCourse(course);
        setCourses([ ...courses, newCourse ]);
    };

    const fetchCourses = async () => {
        const courses = await client.fetchAllCourses();
        setCourses(courses);
    };

    useEffect(() => {
        fetchCourses();
    }, []);



    return (
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
                                updateCourse={updateCourse}/>
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
    );}
