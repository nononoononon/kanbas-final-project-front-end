import {useState} from "react";
import {Question} from "../../questionType";

interface FillInTheBlankEditorProps {
    question: Question;
    onSave: (updatedQuestion: Question) => void;
    onCancel: () => void;
}

function FillInTheBlankEditor({ question, onSave, onCancel }: FillInTheBlankEditorProps) {
    const [title, setTitle] = useState<string>(question.title);
    const [points, setPoints] = useState<number>(question.points);
    const [questionText, setQuestionText] = useState<string>(question.questionText);
    const [correctAnswers, setCorrectAnswers] = useState<string[]>(question.correctAnswers || []);

    const handleAnswerChange = (index: number, value: string) => {
        setCorrectAnswers((prev) => {
            const updatedAnswers = [...prev];
            updatedAnswers[index] = value;
            return updatedAnswers;
        });
    };

    const addAnswer = () => setCorrectAnswers((prev) => [...prev, ""]); // Add empty answer

    const removeAnswer = (index: number) => {
        setCorrectAnswers((prev) => prev.filter((_, i) => i !== index)); // Remove answer
    };

    const handleSave = () => {
        const updatedQuestion: Question = {
            ...question,
            title,
            points,
            questionText,
            correctAnswers,
        };
        onSave(updatedQuestion);
    };

    return (
        <div>
            <h3>Fill in the Blank Question Editor</h3>
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
                <label>Correct Answers</label>
                {correctAnswers.map((answer, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                        <input
                            type="text"
                            className="form-control me-2"
                            value={answer}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                        />
                        <button
                            className="btn btn-danger ms-2"
                            onClick={() => removeAnswer(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button className="btn btn-primary" onClick={addAnswer}>
                    Add Answer
                </button>
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

export default FillInTheBlankEditor;