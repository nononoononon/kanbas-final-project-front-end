import { useParams, useNavigate } from "react-router-dom";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";
import {Question, questionInitialState} from "../../../questionType";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import {getQuestionById, getQuizById, updateQuestion} from "../../../client";
import {useEffect, useState} from "react";
import {mockQuiz, Quiz} from "../../../quizType";



export default function ThreeQuestionEditors() {
    const { cid, qid,questionId } = useParams();
    const [question,setQuestion] = useState<Question | null>();
    const navigate = useNavigate();

    const loadQuestion = async () => {
        if (questionId) {
            console.log("quesID is " + questionId)
            try {
                const fetchQuestion = await getQuestionById(questionId);
                setQuestion(fetchQuestion);
            } catch (error) {
                console.error("Error fetching assignment:", error);
            }
        }
    };

    useEffect(() =>{
        loadQuestion();
        noQuestion();
    },[])

    const noQuestion = () => {
        if (!question) {
        return <div>Question not found</div>;
    }}

    const handleSave = (updatedQuestion: Question) => {
        try {
        const response =  updateQuestion(updatedQuestion._id, updatedQuestion);
        console.log("Saved Question:", response);
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor/questions`);}
        catch (error){
            console.error("Error saving question:", error);
            alert("Failed to save the question. ");
        }
    };

    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor/questions`);
    };

    // Render the appropriate editor based on question type
    let editorComponent;

    if (!question) {
        return <div>No question found</div>;
    }

    switch (question.type) {
        case "Multiple Choice":
            editorComponent = (
                <MultipleChoiceEditor question={question} onSave={handleSave} onCancel={handleCancel} />
            );
            break;
        case "True/False":
            editorComponent = (
                <TrueFalseEditor question={question} onSave={handleSave} onCancel={handleCancel} />
            );
            break;
        case "Fill in the Blank":
            editorComponent = (
                <FillInTheBlankEditor question={question} onSave={handleSave} onCancel={handleCancel} />
            );
            break;
        default:
            editorComponent = <div>Unknown question type</div>;
    }

    return <div>{editorComponent}</div>;
}