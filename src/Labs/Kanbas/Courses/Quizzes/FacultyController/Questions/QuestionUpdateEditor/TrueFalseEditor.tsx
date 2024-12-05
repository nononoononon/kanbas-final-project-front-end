import {Question} from "../../../questionType";
import {useState} from "react";

interface TrueFalseEditorProps {
    question: Question;
    onSave: (updatedQuestion: Question) => void;
    onCancel: () => void;
}

function TrueFalseEditor({ question, onSave, onCancel }: TrueFalseEditorProps) {
    const [title, setTitle] = useState<string>(question.title);
    const [points, setPoints] = useState<number>(question.points);
    const [questionText, setQuestionText] = useState<string>(question.questionText);
    const [correctAnswer, setCorrectAnswer] = useState<string>(question.correctAnswer || "True");

    const handleSave = () => {
        const updatedQuestion: Question = {
            ...question,
            title,
            points,
            questionText,
            correctAnswer,
        };
        onSave(updatedQuestion);
    };

    return (
        <div>
            <h3>True/False Question Editor</h3>
            <div className="mb-3">
                <label>Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label>Points</label>
                <input
                    type="number"
                    className="form-control"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                />
            </div>

            <div className="mb-3">
                <label>Question Text</label>
                <textarea
                    className="form-control"
                    rows={4}
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label>Correct Answer</label>
                <div>
                    <label className="me-2">
                        <input
                            type="radio"
                            name="trueFalse"
                            value="True"
                            checked={correctAnswer === "True"}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                        />
                        True
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="trueFalse"
                            value="False"
                            checked={correctAnswer === "False"}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                        />
                        False
                    </label>
                </div>
            </div>

            <div className="mt-4">
                <button className="btn btn-secondary me-2" onClick={onCancel}>
                    Cancel
                </button>
                <button className="btn btn-success" onClick={handleSave}>
                    Save Question
                </button>
            </div>
        </div>
    );
}

export default TrueFalseEditor;