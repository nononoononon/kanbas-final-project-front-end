import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignment = db.assignments.find(assignment => assignment._id === aid);

    if (!assignment) {
        return <div>Assignment not found</div>;
    }

    return (
        <div id="wd-assignments-editor" className="container mt-5">
            <h2 className="mb-4">Assignment Editor</h2>

            {/* Assignment Name */}
            <div className="mb-4">
                <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                <input id="wd-name" value={assignment.title} className="form-control" readOnly />
            </div>

            {/* Assignment Description */}
            <div className="mb-4">
                <label htmlFor="wd-description" className="form-label">Description</label>
                <textarea id="wd-description" rows={5} className="form-control">
                    {assignment.description}
                </textarea>
            </div>

            {/* Points, Assignment Group, Display Grade As, Submission Type */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <label htmlFor="wd-points" className="form-label">Points</label>
                    <input id="wd-points" value={assignment.points} className="form-control" readOnly />
                </div>
                <div className="col-md-6">
                    <label htmlFor="wd-group" className="form-label">Assignment Group</label>
                    <select id="wd-group" className="form-select">
                        <option value="individual">Individual</option>
                        <option value="group">Group</option>
                    </select>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6">
                    <label htmlFor="wd-display-grade-as" className="form-label">Display Grade As</label>
                    <select id="wd-display-grade-as" className="form-select">
                        <option value="points">Points</option>
                        <option value="percentage">Percentage</option>
                        <option value="complete/incomplete">Complete/Incomplete</option>
                    </select>
                </div>
            </div>

            {/* Online Entry Options */}
            <div className="mb-4 border rounded-1 p-3">
                <div className="col-md-6">
                    <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
                    <select id="wd-submission-type" className="form-select">
                        <option value="text-entry">Online</option>
                        <option value="file-upload">In person</option>
                    </select>
                </div>
                <label className="form-label">Online Entry Options</label>
                <div className="form-check">
                    <input type="checkbox" id="text-entry" className="form-check-input"/>
                    <label htmlFor="text-entry" className="form-check-label">Text Entry</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" id="website-url" className="form-check-input"/>
                    <label htmlFor="website-url" className="form-check-label">Website URL</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" id="media-recordings" className="form-check-input"/>
                    <label htmlFor="media-recordings" className="form-check-label">Media Recordings</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" id="student-annotation" className="form-check-input"/>
                    <label htmlFor="student-annotation" className="form-check-label">Student Annotation</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" id="file-uploads" className="form-check-input"/>
                    <label htmlFor="file-uploads" className="form-check-label">File Uploads</label>
                </div>
            </div>

            {/* Assign To, Due Date, Availability */}
            <div className="mb-4 border rounded-1 p-3">
                <div className="mb-4">
                    <label htmlFor="wd-assign-to" className="form-label">Assign To</label>
                    <select id="wd-assign-to" className="form-select">
                        <option value="everyone">Everyone</option>
                        <option value="specific-groups">Specific Groups</option>
                    </select>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <label htmlFor="wd-due-date" className="form-label">Due Date</label>
                        <input type="date" id="wd-due-date" value={assignment.dueDate} className="form-control" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="wd-available-from" className="form-label">Available from</label>
                        <input type="date" id="wd-available-from" value={assignment.availableDate} className="form-control"/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="wd-available-until" className="form-label">Until</label>
                        <input type="date" id="wd-available-until" value={assignment.notAvailableAt} className="form-control"/>
                    </div>
                </div>
            </div>

            {/* Save/Cancel Buttons */}
            <div className="d-flex justify-content-end">
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger">Save</Link>
            </div>
        </div>
    );
}