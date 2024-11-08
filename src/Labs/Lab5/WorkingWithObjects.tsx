import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Modifying Properties</h4>
            <a id="wd-update-assignment-title"
               className="btn btn-primary float-end"
               href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input className="form-control w-75" id="wd-assignment-title"
                   value={assignment.title} onChange={(e) =>
                setAssignment({...assignment, title: e.target.value})}/>
            <hr/>
            {/* Assignment Score Update */}
            <a id="wd-update-assignment-score" className="btn btn-primary float-end"
               href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <input
                type="number"
                className="form-control w-75"
                value={assignment.score}
                onChange={(e) => setAssignment({...assignment, score: parseInt(e.target.value, 10) })}
            />


            <br/><br/>

            {/* Assignment Completed Update */}
            <a id="wd-update-assignment-completed" className="btn btn-primary float-end"
               href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                Update Completed
            </a>
            <input
                type="checkbox"
                checked={assignment.completed}
                onChange={(e) => setAssignment({...assignment, completed: e.target.checked})}
            />

            <hr/>

            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary"
               href={`${REMOTE_SERVER}/lab5/assignment`}
               target="_blank"
               rel="noopener noreferrer">
                Get Assignment
            </a>
            <hr/>
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
               href={`${REMOTE_SERVER}/lab5/assignment/title`}
               target="_blank"
               rel="noopener noreferrer">
                Get Title
            </a>
            <hr/>
        </div>
    );
}
