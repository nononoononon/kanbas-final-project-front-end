import {BsSearch} from "react-icons/bs";
import {IoAdd} from "react-icons/io5";
import React, {useState} from "react";
import QuizAddNewEditor from "./QuizAddNewEditor";
import {useNavigate} from "react-router-dom";

export default function FacultyQuizController(){
    const navigate = useNavigate();
    const handleNavigate =() =>{
        //这个后面要改就是你要获得课程的cid(courseid）替换6746a21c827a3fc0370a5691
        //然后获取课程下的qid替换editor，同时要在course下面主index把route换了
        navigate("/Kanbas/Courses/6746a21c827a3fc0370a5691/Quizzes/editor");
    }

    return (
        <div id="wd-quizzes-bar" className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="input-group " style={{ width: "300px" }}>
          <span className="input-group-text bg-white border-end-0 fs-6 ">
            <BsSearch />
          </span>
                    <input
                        id="wd-search-quizzes"
                        className="form-control border-start-0"
                        placeholder="Search for quizzes"
                    />
                </div>
                <div>
                    <button
                        id="wd-add-quizzes"
                        className="btn btn-danger "
                        onClick={handleNavigate}
                    >
                        <IoAdd className="fs-5" /> Quizzes
                    </button>
                </div>
            </div>
        </div>
    );
}