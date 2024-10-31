import Modules from "./Modules";
import Home from "./Home";
import Assignment from "./Assignment";
import AssignmentEditorUpdate from "./Assignment/Editor";
import { Navigate, Route, Routes, Link, useLocation, useParams } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import {useState} from "react";
import * as db from '../Database';


export default function  Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const course = courses.find((course) => course._id === cid);
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

    const [assignments, setAssignments] = useState<Assignment[]>(db.assignments);

    const updateAssignment = (updatedAssignment: Assignment) => {
        setAssignments((prevAssignments) =>
            prevAssignments.map((assignment) =>
                assignment._id === updatedAssignment._id ? updatedAssignment : assignment
            )
        );
    };

    const addAssignment = (newAssignment: Assignment) => {
        setAssignments((prevAssignments) => [
            ...prevAssignments,
            newAssignment,
        ]);
    };
    type Assignment = {
        _id: string;
        title: string;
        description: string;
        points: number;
        dueDate: string;
        availableDate: string;
        notAvailableAt: string;
    };
    type AssignmentsProps = {
        assignments: Assignment[];
        updateAssignment: (updatedAssignment: Assignment) => void;
    };
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
                        {links.map((label) => (
                            <Link
                                key={label}
                                to={`/Kanbas/Courses/${cid}/${label}`}
                                id={`wd-course-${label.toLowerCase()}-link`}
                                className={`list-group-item border border-0 
                                    ${pathname.includes(label) ? "active text-black bg-white" : "text-danger"}`}>
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignment />} />
                        <Route
                            path="Assignments/:aid"
                            element={<AssignmentEditorUpdate />}
                        />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}