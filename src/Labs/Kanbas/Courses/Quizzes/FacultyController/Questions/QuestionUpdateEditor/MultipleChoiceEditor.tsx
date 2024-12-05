import {useState} from "react";
import {Question} from "../../../questionType";

interface MultipleChoiceEditorProps {
    question: Question; // Question passed as a prop
    onSave: (updatedQuestion: Question) => void; // Save handler
    onCancel: () => void; // Cancel handler
}

export default function MultipleChoiceEditor({ question, onSave, onCancel }: MultipleChoiceEditorProps) {
    const [title, setTitle] = useState<string>(question.title);
    const [points, setPoints] = useState<number>(question.points);
    const [questionText, setQuestionText] = useState<string>(question.questionText);
    const [choices, setChoices] = useState<string[]>(question.choices || []);

    const handleChoiceChange = (index: number, value: string) => {
        setChoices((prev) => {
            const updatedChoices = [...prev];
            updatedChoices[index] = value;
            return updatedChoices;
        });
    };

    const addChoice = () => setChoices((prev) => [...prev, ""]); // Add a new empty choice

    const removeChoice = (index: number) => {
        setChoices((prev) => prev.filter((_, i) => i !== index)); // Remove the specified choice
    };

    const handleSave = () => {
        onSave({
            ...question,
            title,
            points,
            questionText,
            choices,
        });
    };

    return (
        <div>
            <h3>Multiple Choice Question Editor</h3>
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

            <div>
                <label>Choices</label>
                {choices.map((choice, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                        <input
                            type="text"
                            className="form-control me-2"
                            value={choice}
                            onChange={(e) => handleChoiceChange(index, e.target.value)}
                        />
                        <button
                            className="btn btn-danger ms-2"
                            onClick={() => removeChoice(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button className="btn btn-primary" onClick={addChoice}>
                    Add Choice
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