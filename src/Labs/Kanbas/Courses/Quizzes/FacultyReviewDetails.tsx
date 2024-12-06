import { FaPencil } from "react-icons/fa6";
import {Link, useParams} from "react-router-dom";
import {getQuizById} from "./client";
import {useEffect, useState} from "react";
import {mockQuiz, Quiz} from "./quizType";
import {Attempt, mockAttempt} from "./Attempts/attemptType";

export default function FacultyReviewQuizDetails() {
    //获得qid的数据，好fetch数据
    const{cid, qid} = useParams();
    const [quiz, setQuiz] = useState<Quiz | null>(mockQuiz);

    //todo:fetch数据之后，用useeffect在qid变化的时候更新，然后把数值弄上去
    const handleGetQuizById = async () => {
        const fetchQuiz = await getQuizById(qid ?? "674bec380e138b094ca2784c");
        //const parsedQuiz = parseQuiz(fetchQuiz.data);
        setQuiz(fetchQuiz);
    }

    useEffect(() => {

        handleGetQuizById();
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center">
                todo:加一下preview,然后创建新的attempt,然后导航，现在没法获得attemptid
                <button id="wd-add-assignment-btn" className="btn btn-lg btn-secondary me-4">
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/attempt/1234/faculty`}
                          className="text-decoration-none text-black">
                        Preview
                    </Link>
                </button>
                <button id="wd-add-assignment-btn" className="btn btn-lg btn-secondary me-4">
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`}
                          className="text-decoration-none text-black">
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
                        <h5>{quiz?.settings.quizType}</h5>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Points</h4>
                    </div>
                    <div className="col-5">
                        <h5>{quiz?.points}</h5>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Assignment Group</h4>
                    </div>
                    <div className="col-5">
                        <h5>{quiz?.settings.assignmentGroup}</h5>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Shuffle Answers</h4>
                    </div>
                    <div className="col-5">
                        <h5>{quiz?.settings.shuffleAnswers === true ? 'Yes' : 'No'}</h5>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Time Limit</h4>
                    </div>
                    <div className="col-5">
                        <h5>{quiz?.settings.timeLimit} Minutes</h5>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Multiple Attempts</h4>
                    </div>
                    <div className="col-5">
                        <h5>{quiz?.settings.multipleAttempts === true ? quiz?.settings.multipleAttempts : 'No'}</h5>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>View Responses</h4>
                    </div>
                    <div className="col-5">
                        <h5>{quiz?.settings.showCorrectAnswers === true ? 'Yes' : 'No'}</h5>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 text-sm-end">
                        <h4>Show Correct Answers</h4>
                    </div>
                    <div className="col-5">
                        <h5>{quiz?.settings.showCorrectAnswers === true ? 'Yes' : 'No'}</h5>
                    </div>
                </div>

                <div className="row mb-3">
                <div className="col-4 text-sm-end">
                        <h4>One Question at a Time</h4>
                    </div>
                    <div className="col-5">
                        <h5>{quiz?.settings.oneQuestionAtATime === true ? 'Yes' : 'No'}</h5>
                    </div>
                </div>

                <div className="row mb-3">
                <div className="col-4 text-sm-end">
                        <h4>published</h4>
                    </div>
                    <div className="col-5">
                        <h5>{quiz?.published === true ? 'Yes' : 'No'}</h5>
                    </div>
                </div>

                <div className="row mb-3">
                <div className="col-4 text-sm-end">
                        <h4>Required to View Quiz Results</h4>
                    </div>
                    <div className="col-5">
                        <h5>{quiz?.settings.lockQuestionsAfterAnswering === true ? 'Yes' : 'No'}</h5>
                    </div>
                </div>

                <div className="row mb-3">
                <div className="col-4 text-sm-end">
                        <h4>Webcam Required</h4>
                    </div>
                    <div className="col-5">
                        <h5>{quiz?.settings.webcamRequired === true ? 'Yes' : 'No'}</h5>
                    </div>
                </div>

                <div className="row mb-3">
                <div className="col-4 text-sm-end">
                        <h4>Lock Questions After Answering</h4>
                    </div>
                    <div className="col-5">
                        <h5>{quiz?.settings.lockQuestionsAfterAnswering === true ? 'Yes' : 'No'}</h5>
                    </div>
                </div>
                <hr/>

                <div id="wd-people-table">
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
                            <tr >
                                <td>{quiz?.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : "N/A"}</td>
                                <td>Everyone</td>
                                <td>{quiz?.availableFrom ? new Date(quiz.availableFrom).toLocaleDateString() : "N/A"}</td>
                                <td>{quiz?.availableUntil ? new Date(quiz.availableUntil).toLocaleDateString() : "N/A"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}