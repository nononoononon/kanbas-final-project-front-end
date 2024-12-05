import { FaPencil } from "react-icons/fa6";
import {Link, useParams} from "react-router-dom";

export default function FacultyReviewQuizDetails() {
    //获得qid的数据，好fetch数据
    const{cid, qid} = useParams<{ cid:string, qid: string }>();
    //todo:fetch数据之后，用useeffect在qid变化的时候更新，然后把数值弄上去
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center">
                todo:加一下preview,然后创建新的attempt,然后导航，现在没法获得attemptid
                <button id="wd-add-assignment-btn" className="btn btn-lg btn-secondary me-4">
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/1234/attempt/1234/faculty`}
                          className="text-decoration-none text-black">
                        Preview
                    </Link>
                </button>
                <button id="wd-add-assignment-btn" className="btn btn-lg btn-secondary me-4">
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`}
                          className="text-decoration-none text-black">
                        <FaPencil/>
                        Edit
                    </Link>
                </button>
            </div>
            <hr/>

            <div className="container mt-4">
                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Quiz Type</h4>
                    </div>
                    <div className="col-5">

                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Points</h4>
                    </div>
                    <div className="col-5">

                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Assignment Group</h4>
                    </div>
                    <div className="col-5">

                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Shuffle Answers</h4>
                    </div>
                    <div className="col-5">

                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Time Limit</h4>
                    </div>
                    <div className="col-5">

                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Multiple Attempts</h4>
                    </div>
                    <div className="col-5">

                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>View Responses</h4>
                    </div>
                    <div className="col-5">

                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Show Correct Answers</h4>
                    </div>
                    <div className="col-5">

                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>One Question at a Time</h4>
                    </div>
                    <div className="col-5">

                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Require Respondus LockDown Browser</h4>
                    </div>
                    <div className="col-5">

                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Required to View Quiz Results</h4>
                    </div>
                    <div className="col-5">

                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Webcam Required</h4>
                    </div>
                    <div className="col-5">

                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Lock Questions After Answering</h4>
                    </div>
                    <div className="col-5">

                    </div>
                </div>
                <hr />

                <div id="wd-people-table">
                    todo:这个要获取数据，然后用map列出来4项数据，完成删除
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Due</th>
                            <th>For</th>
                            <th>Available from</th>
                            <th>Until</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}