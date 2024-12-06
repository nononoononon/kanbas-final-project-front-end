import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Quiz, quizInitialState} from "../../quizType";
import AddQuestionController from "./AddQuestionController";
import {defaultQuizId, Question, questionInitialState} from "../../questionType";
import {getQuestionsForQuiz, getQuizById} from "../../client";
import {IoEllipsisVertical} from "react-icons/io5";
import {FaTrash} from "react-icons/fa";
import {FaPencil} from "react-icons/fa6";

export default function QuestionEditorIndex() {

    const [quiz, setQuiz] = useState<Quiz>();//得到数据这个改成刚刚得到Quiz
    //获取对应的id
    const{cid, qid} = useParams();

    const [questions, setQuestions] = useState<Question[]>([]);

    const fetchQuestions = async () => {
        try {
            console.log("Fetching questions with ID:", qid);
            if(qid){
                const fetchedQuestions =  await getQuestionsForQuiz(qid);
                setQuestions(fetchedQuestions)
            }

        } catch (error) {
            console.error("Error fetching quiz:", error);
        }
    };
    const loadQuiz = async () => {
        if (qid) {
            try {
                const quiz = await getQuizById(qid);
                setQuiz(quiz);
            } catch (error) {
                console.error("Error fetching assignment:", error);
            }
        }
    };

    const updateQuiz = async () => {
        if (!quiz || !quiz._id) {
            console.error("Quiz data is invalid or missing _id");
            return;
        }

        // 准备要更新的数据
        const updatedData = {
            questions: questions, // 只更新 questions 数组
        };

        try {
            console.log("updating quiz:", quiz);
            // Example: await api.update(quiz);
            alert("Quiz updated successfully!");
        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    };

    const navigate = useNavigate()
    const handleNavtoQuizzes = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`);
    }

    useEffect(() => {
        if (cid && qid) {
            fetchQuestions();
            loadQuiz();
        }
    }, []);

    return (
        <div className="container mt-4">

            {/*todo:这个数据用reducer来更新,不然更新不了，或者你试试*/}
            <h5 className="text-end ">points : {quiz?.points ?? "N/A"}</h5>
            {/* Tabs */}
            <div className="tabs">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`}
                      className="tab px-3 py-2 border border-black text-dark text-decoration-none">
                    Details
                </Link>
                <Link to=" "
                      className="tab px-3 py-2 border border-black text-dark text-decoration-none">
                    Questions
                </Link>
            </div>
            <hr className="border border-black w-100 mt-1 "/>

            <ul id="wd-questions-list" className="list-group rounded-0">
                {questions.map((question: Question) => (
                    <li key={question._id} className="list-group-item p-3 d-flex align-items-center rounded-2">
                        <Link
                            //渠道商编辑详情页面
                            to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor/questions/${question._id}`}
                            className="w-100 d-flex align-items-center text-decoration-none"
                        >
                            <div className="w-100 d-flex flex-column">
                                {/* Title */}
                                <span className="fs-5 fw-bold text-black">{question.title}</span>

                                <div className="text-muted">
                                    <strong>Type </strong>
                                    {question.type}
                                </div>

                                <div className="text-muted">
                                    <strong>Description </strong>
                                    {question.questionText}
                                </div>

                                <div className="text-muted">
                                    <strong>Points </strong>
                                    {question.points}
                                </div>
                            </div>
                        </Link>
                        <FaPencil className="text-secondary me-3 fs-5"/>
                        <FaTrash
                            className="text-danger me-3 fs-5"
                            onClick={() => 0}
                        />
                    </li>
                ))}
            </ul>

            <AddQuestionController/>

            <hr/>

            <div className="row">
                <div className="col-12 text-center">
                    <button
                        className="btn btn-danger float-end me-3"
                        onClick={updateQuiz}
                    >
                        Save
                    </button>
                    <button
                        className="btn btn-secondary float-end me-2"
                        onClick={() => handleNavtoQuizzes()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>


    )
}