import {BsBookHalf, BsGripVertical, BsPlus, BsSearch} from "react-icons/bs";
import {IoAdd, IoEllipsisVertical} from "react-icons/io5";
import React, {useState} from "react";
import LessonControlButtons from "./LessonControlButtons";
import {useParams, Link, useNavigate, Route} from "react-router-dom";
import * as db from "../../Database";
import AssignmentController from "./AssignmentController"
import { useSelector, useDispatch } from "react-redux";
import {Button, Modal} from "react-bootstrap";
import AssignmentEditorUpdate from "./Editor";
import {addAssignment, deleteAssignment} from "./reducer";

type Assignment = {
    _id: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    availableDate: string;
    notAvailableAt: string;
};


export default function Assignments() {
    const { cid, aid } = useParams();
    const dispatch = useDispatch();
    const assignments = useSelector(
        (state: any) => state.assignmentsReducer.assignments
    );

    const [newAssignment, setNewAssignment] = useState<Assignment>({
        _id: "",
        title: "",
        description: "",
        points: 0,
        dueDate: "",
        availableDate: "",
        notAvailableAt: "",
    });

    const handleAddAssignment = () => {
        dispatch(addAssignment(newAssignment));
        setNewAssignment({
            _id: "",
            title: "",
            description: "",
            points: 0,
            dueDate: "",
            availableDate: "",
            notAvailableAt: "",
        });
    };

    const [showModal, setShowModal] = useState(false);
    const [assignmentToDelete, setAssignmentToDelete] = useState<Assignment | null>(null);

    const showDeleteConfirmation = (assignment: Assignment) => {
        setAssignmentToDelete(assignment);
        setShowModal(true);
    };

    const confirmDeleteAssignment = () => {
        if (assignmentToDelete) {
            dispatch(deleteAssignment(assignmentToDelete._id));
        }
        setShowModal(false);
        setAssignmentToDelete(null);
    };




    return (
        <div id="wd-assignments" className="p-3">
            <AssignmentController
                dialogTitle={"Add New Assignment"}
                assignment={newAssignment}
                setAssignment={setNewAssignment}
                addAssignment={handleAddAssignment}
            />

            {/* confirmation of delete */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to remove the assignment？</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteAssignment}>
                        ok
                    </Button>
                </Modal.Footer>
            </Modal>


            <h5 id="wd-assignments-title"
                className="d-flex justify-content-between align-items-center bg-secondary p-3 mb-0">
                <div className="d-flex align-items-center">
                    <BsGripVertical className="fs-1 me-2"/>
                    ASSIGNMENTS
                </div>
                <div className="d-flex justify-content-end align-items-center">
                    <span
                        className="border border-1 rounded px-3 py-2 text-muted fs-5 d-inline-block">40% of Total</span>
                    <button className="btn btn-secondary btn-sm ms-2 text-muted fs-3">
                        <BsPlus/>
                    </button>
                    <IoEllipsisVertical className="fs-1 text-muted ms-2"/>
                </div>
            </h5>

            <ul id="wd-assignment-list" className="list-group rounded-0">
                {assignments.map((assignment: Assignment) => (
                    <li key={assignment._id} className="list-group-item p-3 d-flex align-items-center wd-lesson">
                        <Link
                            to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                            className="w-100 d-flex align-items-center text-decoration-none"
                        >
                            <BsGripVertical className="fs-1 me-2 text-muted text-black"/>
                            <BsBookHalf className="fs-1 me-3 text-success"/>
                            <div className="w-100 d-flex justify-content-between align-items-center">
                                <div>
                                    <span className="fs-5 fw-bold text-black">{assignment._id}</span>
                                    <div className="assignment-title text-muted">
                                        <span className="text-danger">{assignment.title}</span> |
                                        <strong>Not available at</strong> {assignment.notAvailableAt} <br/>
                                        <strong>Due</strong> : {assignment.dueDate} | {assignment.points} pt
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="text-muted ms-auto ">
                            <LessonControlButtons
                                assignmentId={assignment._id}
                                deleteAssignment={() => showDeleteConfirmation(assignment)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}