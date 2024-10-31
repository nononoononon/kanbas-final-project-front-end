import React from "react";

type Assignment = {
    _id: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    availableDate: string;
    notAvailableAt: string;
};

export default function AssignmentEditor({
                                             dialogTitle,
                                             assignment,
                                             setAssignment,
                                             addAssignment
                                         }: {
    dialogTitle: string;
    assignment: Assignment;
    setAssignment: (assignment: Assignment) => void;
    addAssignment: () => void;
}) {
    return (
        <div id="wd-assignment-editor-dialog" className="modal fade  " data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-lg">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">{dialogTitle}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body ">
                        {/* Assignment Name */}
                        <div className="row mb-4  border mb-3  p-3">
                            <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                            <input
                                id="wd-name"
                                value={assignment.title}
                                className="form-control"
                                onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                            />
                        </div>

                        {/* Assignment Description */}
                        <div className="row mb-4  border mb-3  p-3">
                            <label htmlFor="wd-description" className="form-label">Description</label>
                            <textarea
                                id="wd-description"
                                rows={5}
                                className="form-control"
                                value={assignment.description}
                                onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
                            />
                        </div>

                        {/* Points */}
                        <div className="row mb-4  border mb-3  p-3">
                            <label htmlFor="wd-points" className="form-label">Points</label>
                            <input
                                id="wd-points"
                                type="number"
                                value={assignment.points}
                                className="form-control"
                                onChange={(e) => setAssignment({ ...assignment, points: Number(e.target.value) })}
                            />
                        </div>

                        {/* Due Date and Availability Dates */}
                        <div className="row mb-4 border rounded-1 p-2">
                            <div className="col-md-12 mb-3">
                                <label htmlFor="wd-due-date" className="form-label">Due Date</label>
                                <input
                                    type="date"
                                    id="wd-due-date"
                                    value={assignment.dueDate}
                                    className="form-control"
                                    onChange={(e) => setAssignment({...assignment, dueDate: e.target.value})}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="wd-available-from" className="form-label">Available from</label>
                                <input
                                    type="date"
                                    id="wd-available-from"
                                    value={assignment.availableDate}
                                    className="form-control"
                                    onChange={(e) => setAssignment({...assignment, availableDate: e.target.value})}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="wd-not-available-at" className="form-label">Available Until</label>
                                <input
                                    type="date"
                                    id="wd-not-available-at"
                                    value={assignment.notAvailableAt}
                                    className="form-control"
                                    onChange={(e) => setAssignment({...assignment, notAvailableAt: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Cancel
                        </button>
                        {/* Call addAssignment directly to save and close modal */}
                        <button onClick={addAssignment} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}