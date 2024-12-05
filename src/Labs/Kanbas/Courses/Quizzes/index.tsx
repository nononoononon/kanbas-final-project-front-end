
import FacultyQuizController from "./FacultyController/FacultyQuizController";
import {BsBookHalf, BsGripVertical, BsPlus} from "react-icons/bs";
import React, {useEffect, useState} from "react";
import {IoEllipsisVertical} from "react-icons/io5";
import {Link, Route, Routes, useParams} from "react-router-dom";
import {Quiz, quizInitialState} from "./quizType";
import QuizControlButtons from "./FacultySideThreeDotsController/DotsController";
import QuizAddNewEditor from "./FacultyController/QuizAddNewEditor";
import Home from "../Home";
import Modules from "../Modules";
import AssignmentEditorUpdate from "../Assignment/Editor";
import People from "../People/People";
import FacultyReviewQuizDetails from "./FacultyReviewDetails";
import QuizEditor from "./FacultyController/QuizEdiotr";
import QuestionEditorIndex from "./FacultyController/Questions/QuestionEditorIndex";
import QuizzesRoutes from "./Route";
//这个里面定义了数据类型，需要查看看这里



export default function Quizzes() {
    //todo:获取到了当前courseId，你还需要想办法要到userid
    const { cid } = useParams<{ cid: string }>();
    //设置获取quizzes的变化
    const [quizzes, setQuizzes] = useState<Quiz[]>([quizInitialState]);

    //获取当前课程下的所有quizz,方便接下来展示
    const fetchQuizzes = async (courseId: string) => {
        try {
            //todo:添加好client,然后fetch所有quizzes
            //todo: 然后setQuizzes = fetch到的所有数据
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    };

    //todo:传入user role,是教授导航到编辑，学生导航到考试
    function navToDifferentLink (cid: string, quizId: string, userRole: string):string{
        if (userRole === "student") {
            return `/Kanbas/Courses/${cid}/Quizzes/${quizId}`;
        }else{
            return `/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit`;
        }
    }

    // todo: 这个effect是每次进入新的课程会获取课程一次，课程内实时更新需要用reducer
    useEffect(() => {
        if (cid) {
            fetchQuizzes(cid);
        }else {
            console.error("Course ID (cid) is missing or invalid");
        }
    }, [cid]);

    return (
        <div id="wd-quizzes">
            {/*TODO:如果是faculty，ADMIN,展示quzzies controller 组件
                 获取用户role判断这个人是不是学生，参考dashboard
                 const isStudent = currentUser.role.toUpperCase() === "STUDENT";
                */}
            <div id="wd-assignments" className="p-3">
                <FacultyQuizController/>
            </div>


            {/*前面的装饰条，不用管*/}
            <div id="wd-assignments-title"
                 className="d-flex justify-content-between align-items-center bg-secondary p-3 mb-0">
                <div className="d-flex align-items-center">
                    <BsGripVertical className="fs-1 me-2"/>
                    Assignment Quizzes
                </div>
                <div className="d-flex justify-content-end align-items-center">

                    <IoEllipsisVertical className="fs-1 text-muted ms-2"/>
                </div>
            </div>

            <ul id="wd-quizzes-list" className="list-group rounded-0">
                {quizzes.map((quiz: Quiz) => (
                    <li key={quiz._id} className="list-group-item p-3 d-flex align-items-center wd-lesson">
                        <Link
                            //todo:引入这个函数navToDifferentLink，学生和其他人进入的不同
                            //目前是测试用，这个要换成to={navToDifferentLink}
                            to={`/Kanbas/Courses/${cid}/Quizzes/1234/review`}
                            className="w-100 d-flex align-items-center text-decoration-none"
                        >
                            <BsGripVertical className="fs-1 me-2 text-muted text-black"/>
                            <BsBookHalf className="fs-1 me-3 text-success"/>
                            <div className="w-100 d-flex flex-column">
                                {/* Quiz Title */}
                                <span className="fs-5 fw-bold text-black">{quiz.title}</span>

                                {/* Availability Information */}
                                <div className="text-muted">
                                    <p>
                                        <strong>Available
                                            at:</strong> {quiz.availableFrom ? quiz.availableFrom.toLocaleDateString() : "N/A"} |
                                        <strong> Not available
                                            at:</strong> {quiz.availableUntil ? quiz.availableUntil.toLocaleDateString() : "N/A"}
                                    </p>
                                </div>

                                {/* Due Date and Points */}
                                <div className="text-muted">
                                    <p>
                                        <strong>Due:</strong> {quiz.dueDate ? quiz.dueDate.toLocaleDateString() : "N/A"} | <strong>{quiz.points || 0} pt</strong>
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <div className="text-muted ms-auto">
                            {/*你可以根据你传入参数不同来修改函数，我只是实现基础的*/}
                            <QuizControlButtons quiz={quiz} deleteQuiz={() => 0} editQuiz={() => 0}
                                                publishQuiz={() => 0}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}