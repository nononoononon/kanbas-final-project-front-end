import React from "react";
import { IoAdd } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import AssignmentEditor from "./AssignmentEditor";

type Assignment = {
    _id: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    availableDate: string;
    notAvailableAt: string;
};

export default function AssignmentController({
                                                 dialogTitle,
                                                 assignment,
                                                 setAssignment,
                                                 addAssignment,
                                             }: {
    dialogTitle: string;
    assignment: Assignment;
    setAssignment: (assignment: Assignment) => void;
    addAssignment: () => void;
}) {
    return (
        <div id="wd-assignments-bar" className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="input-group " style={{ width: "300px" }}>
          <span className="input-group-text bg-white border-end-0 fs-6 ">
            <BsSearch />
          </span>
                    <input
                        id="wd-search-assignment"
                        className="form-control border-start-0"
                        placeholder="Search for Assignments"
                    />
                </div>
                <div>
                    <button id="wd-add-assignment-group" className="btn btn-secondary me-2">
                        <IoAdd className="fs-5" /> Group
                    </button>
                    <button
                        id="wd-add-assignment"
                        className="btn btn-danger "
                        data-bs-toggle="modal"
                        data-bs-target="#wd-assignment-editor-dialog"
                    >
                        <IoAdd className="fs-5" /> Assignment
                    </button>
                </div>
            </div>
            <AssignmentEditor
                dialogTitle={dialogTitle}
                assignment={assignment}
                setAssignment={setAssignment}
                addAssignment={addAssignment}
            />
        </div>
    );
}