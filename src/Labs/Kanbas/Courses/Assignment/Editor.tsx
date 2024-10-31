import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
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

type AssignmentEditorUpdateProps = {
    assignments: Assignment[];
    updateAssignment: (updatedAssignment: Assignment) => void;
};

export default function AssignmentEditorUpdate({ assignments, updateAssignment }: AssignmentEditorUpdateProps)  {
    const { cid, aid } = useParams();
    const navigate = useNavigate();

    const initialAssignment = assignments.find((assignment) => assignment._id === aid);
    const [editedAssignment, setEditedAssignment] = useState<Assignment>(
        initialAssignment || {
            _id: "",
            title: "",
            description: "",
            points: 0,
            dueDate: "",
            availableDate: "",
            notAvailableAt: "",
        }
    );

    const showEditConfirmation = (field: string, value: string | number) => {
        setEditedAssignment({ ...editedAssignment, [field]: value });
    };

    const confirmSaveEdit = () => {
        updateAssignment(editedAssignment);
        navigate(`/Kanbas/Courses/${cid}/Assignments`); // 保存后导航回 Assignments 页面
    };

    if (!initialAssignment) {
        return <div>Assignment not found</div>;
    }

    return (
        <div id="wd-assignments-editor" className="container mt-5">
            <h2 className="mb-4">Assignment Editor</h2>

            <div className="mb-4">
                <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                <input
                    id="wd-name"
                    value={editedAssignment.title}
                    className="form-control"
                    onChange={(e) => showEditConfirmation("title", e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="wd-description" className="form-label">Description</label>
                <textarea
                    id="wd-description"
                    rows={5}
                    className="form-control"
                    value={editedAssignment.description}
                    onChange={(e) => showEditConfirmation("description", e.target.value)}
                />
            </div>
            <div className="row mb-4">
                <div className="col-md-6">
                    <label htmlFor="wd-points" className="form-label">Points</label>
                    <input
                        id="wd-points"
                        type="number"
                        value={editedAssignment.points}
                        className="form-control"
                        onChange={(e) => showEditConfirmation("points", Number(e.target.value))}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label htmlFor="wd-due-date" className="form-label">Due Date</label>
                    <input
                        type="date"
                        id="wd-due-date"
                        value={editedAssignment.dueDate}
                        className="form-control"
                        onChange={(e) => showEditConfirmation("dueDate", e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="wd-available-from" className="form-label">Available from</label>
                    <input
                        type="date"
                        id="wd-available-from"
                        value={editedAssignment.availableDate}
                        className="form-control"
                        onChange={(e) => showEditConfirmation("availableDate", e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="wd-not-available-at" className="form-label">Available Until</label>
                    <input
                        type="date"
                        id="wd-not-available-at"
                        value={editedAssignment.notAvailableAt}
                        className="form-control"
                        onChange={(e) => showEditConfirmation("notAvailableAt", e.target.value)}
                    />
                </div>
            </div>

            <div className="d-flex justify-content-end">
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
                    Cancel
                </Link>
                <button onClick={confirmSaveEdit} className="btn btn-danger">
                    Save
                </button>
            </div>
        </div>
    );
}