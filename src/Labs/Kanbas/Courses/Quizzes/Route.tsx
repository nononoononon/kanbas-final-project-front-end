import {Route, Routes} from "react-router-dom";
import QuizAddNewEditor from "./FacultyController/QuizAddNewEditor";
import FacultyReviewQuizDetails from "./FacultyReviewDetails";
import QuizEditor from "./FacultyController/QuizEdiotr";
import QuestionEditorIndex from "./FacultyController/Questions/QuestionEditorIndex";
import React from "react";

export default function QuizzesRoutes() {
    return (
        <Routes>
            {/* 添加新测验的编辑器 */}
            <Route path="editor" element={<QuizAddNewEditor />} />

            {/* 查看测验详细信息 */}
            <Route path=":qid/review" element={<FacultyReviewQuizDetails />} />

            {/* 编辑测验 */}
            <Route path=":qid/editor" element={<QuizEditor />} />

            {/* 编辑测验问题 */}
            <Route path=":qid/editor/questions" element={<QuestionEditorIndex />} />
        </Routes>
    );
}