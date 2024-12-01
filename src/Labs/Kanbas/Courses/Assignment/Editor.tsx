import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { findAssignmentById, updateAssignment } from "./client";
import { useDispatch } from "react-redux";

type Assignment = {
    _id: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    availableDate: string;
    notAvailableAt: string;
    course?: string;
};

export default function AssignmentEditorUpdate() {
    const { cid, aid } = useParams<{ cid: string; aid: string }>();
    const navigate = useNavigate();

    const [editedAssignment, setEditedAssignment] = useState<Assignment | null>(null);

    useEffect(() => {
        const loadAssignment = async () => {
            if (cid && aid) {
                try {
                    const assignment = await findAssignmentById(cid, aid);
                    console.log("Editing assignment:", JSON.stringify(assignment, null, 2));
                    setEditedAssignment(assignment);
                } catch (error) {
                    console.error("Error fetching assignment:", error);
                    setEditedAssignment(null);
                }
            }
        };
        loadAssignment();
    }, [cid, aid]);

    const handleInputChange = (field: string, value: string | number) => {
        if (editedAssignment) {
            setEditedAssignment({ ...editedAssignment, [field]: value });
        }
    };

    const confirmSaveEdit = async () => {
        if (editedAssignment) {
            try {
                await updateAssignment(editedAssignment);
                navigate(`/Kanbas/Courses/${cid}/Assignments`);
            } catch (error) {
                console.error("Error updating assignment:", error);
            }
        }
    };

    if (!editedAssignment) {
        return <div>Assignment not found</div>;
    }

    const formatDate = (dateString: string): string => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "";
        return date.toISOString().split("T")[0];
    };
    return (
        <div id="wd-assignments-editor" className="container mt-5">
            <h2 className="mb-4">Assignment Editor</h2>

            <div className="row mb-4 border mb-3 p-3">
                <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                <input
                    id="wd-name"
                    value={editedAssignment.title}
                    className="form-control"
                    onChange={(e) => handleInputChange("title", e.target.value)}
                />
            </div>
            <div className="row mb-4 border mb-3 p-3">
                <label htmlFor="wd-description" className="form-label">Description</label>
                <textarea
                    id="wd-description"
                    rows={5}
                    className="form-control"
                    value={editedAssignment.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                />
            </div>

            <div className="row mb-4 border rounded-1 p-2">
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
                        value={formatDate(editedAssignment.dueDate)}
                        className="form-control"
                        onChange={(e) => handleInputChange("dueDate", e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="wd-available-from" className="form-label">Available from</label>
                    <input
                        type="date"
                        id="wd-available-from"
                        value={formatDate(editedAssignment.availableDate)}
                        className="form-control"
                        onChange={(e) => handleInputChange("availableDate", e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="wd-not-available-at" className="form-label">Available Until</label>
                    <input
                        type="date"
                        id="wd-not-available-at"
                        value={formatDate(editedAssignment.notAvailableAt)}
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