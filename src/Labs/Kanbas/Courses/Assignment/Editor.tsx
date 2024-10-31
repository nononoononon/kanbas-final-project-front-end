import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import * as db from "../../Database";
import {updateAssignment} from "./reducer";
import {useDispatch, useSelector} from "react-redux";

type Assignment = {
    _id: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    availableDate: string;
    notAvailableAt: string;
};
export default function AssignmentEditorUpdate() {
    const { cid, aid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const assignments = useSelector(
        (state: any) => state.assignmentsReducer.assignments
    );

    const initialAssignment = assignments.find(
        (assignment: Assignment) => assignment._id === aid
    );

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

    const handleInputChange = (field: string, value: string | number) => {
        setEditedAssignment({ ...editedAssignment, [field]: value });
    };

    const confirmSaveEdit = () => {
        dispatch(updateAssignment(editedAssignment));
        navigate(`/Kanbas/Courses/${cid}/Assignments`);
    };

    if (!initialAssignment) {
        return <div>Assignment not found</div>;
    }

    return (
        <div id="wd-assignments-editor" className="container  mt-5">
            <h2 className="mb-4">Assignment Editor</h2>

            <div className="row mb-4  border mb-3  p-3">
                <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                <input
                    id="wd-name"
                    value={editedAssignment.title}
                    className="form-control"
                    onChange={(e) => handleInputChange("title", e.target.value)}
                />
            </div>
            <div className="row mb-4 border  mb-3 p-3">
                <label htmlFor="wd-description" className="form-label">Description</label>
                <textarea
                    id="wd-description"
                    rows={5}
                    className="form-control"
                    value={editedAssignment.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                />
            </div>

            <div className="row mb-4 border rounded-1  p-2">
                <div className="col-md-4 mb-3">
                    <label htmlFor="wd-points" className="form-label">Points</label>
                    <input
                        id="wd-points"
                        type="number"
                        value={editedAssignment.points}
                        className="form-control"
                        onChange={(e) => handleInputChange("points", Number(e.target.value))}
                    />
                </div>
            </div>

            <div className="row mb-4 border rounded-1 p-2">
                <div className="col-md-12 mb-3">
                    <label htmlFor="wd-due-date" className="form-label">Due Date</label>
                    <input
                        type="date"
                        id="wd-due-date"
                        value={editedAssignment.dueDate}
                        className="form-control"
                        onChange={(e) => handleInputChange("dueDate", e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="wd-available-from" className="form-label">Available from</label>
                    <input
                        type="date"
                        id="wd-available-from"
                        value={editedAssignment.availableDate}
                        className="form-control"
                        onChange={(e) => handleInputChange("availableDate", e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="wd-not-available-at" className="form-label">Available Until</label>
                    <input
                        type="date"
                        id="wd-not-available-at"
                        value={editedAssignment.notAvailableAt}
                        className="form-control"
                        onChange={(e) => handleInputChange("notAvailableAt", e.target.value)}
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