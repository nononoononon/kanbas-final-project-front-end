import { useParams, useNavigate } from "react-router-dom";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";
import { Question } from "../../../questionType";
import MultipleChoiceEditor from "./MultipleChoiceEditor";

const mockQuestion: Question =
    // todo: Replace this with actual data fetching
    {
        _id: "1234",
        quizId: "1234",
        type: "Multiple Choice",
        title: "Sample Question",
        points: 10,
        questionText: "What is 2 + 2?",
        choices: ["2", "3", "4"],
        correctAnswer: "4",
    }

//todo:这个里面传入真正的question数据
export default function ThreeQuestionEditors() {
    const { cid, qid,questionId } = useParams();
    const navigate = useNavigate();
    // todo:这个到时候变成真的数据，就直接删除这个了，fetch questionID得到数据，useeffect更新
    const question = mockQuestion;

    if (!question) {
        return <div>Question not found</div>;
    }

    const handleSave = (updatedQuestion: Question) => {
        //todo:这个接update question的内容
        console.log("Saved Question:", updatedQuestion);
        //todo:这个链接有问题，到时候改一下
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`);
    };

    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`);
    };

    // Render the appropriate editor based on question type
    let editorComponent;
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