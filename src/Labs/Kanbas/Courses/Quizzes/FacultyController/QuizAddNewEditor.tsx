import { FaRegCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import { Quiz, quizInitialState } from "../quizType";
import {useNavigate, useParams} from "react-router-dom";

export default function QuizAddNewEditor() {
    const navigate = useNavigate();
    const {cid} = useParams();
    //todo:初始化的时候没有userId和courseID,你要存一下复制存入
    const [quiz, setQuiz] = useState<Quiz>(quizInitialState);

    const handleNavtoQuiz =() =>{
        navigate(`/Kanbas/Courses/${cid}/Quizzes`); // 动态导航到该课程的 Quizzes 页面
    }

    const handleInputChange = (field: keyof Quiz, value: any) => {
        setQuiz((prev) => ({ ...prev, [field]: value }));
    };

    const handleSettingsChange = (field: keyof Quiz["settings"], value: any) => {
        setQuiz((prev) => ({
            ...prev,
            settings: { ...prev.settings, [field]: value },
        }));
    };

    const addQuiz = async () => {
        // todo:补充好这个add，检查下数据传入正确吗
        try {
            console.log("Saving quiz:", quiz);
            // Example: await api.addQuiz(quiz);
            alert("Quiz saved successfully!");
        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    };

    return (
        <div className="container mt-4">
            {/* 标题 */}
            <div className="row mb-3">
                <div className="col-12">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter quiz name"
                        value={quiz.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                </div>
            </div>

            {/* 描述 */}
            <div className="mb-3">
                <textarea
                    className="form-control"
                    rows={4}
                    value={quiz.description || ""}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                />
            </div>

            {/* Quiz 类型 */}
            <div className="row mb-3">
                <div className="col-4 text-sm-end">
                    <h4>Quiz Type</h4>
                </div>
                <div className="col-5">
                    <select
                        className="form-control form-select"
                        value={quiz.settings.quizType}
                        onChange={(e) => handleSettingsChange("quizType", e.target.value)}
                    >
                        <option value="Graded Quiz">Graded Quiz</option>
                        <option value="Practice Quiz">Practice Quiz</option>
                        <option value="Graded Survey">Graded Survey</option>
                        <option value="Ungraded Survey">Ungraded Survey</option>
                    </select>
                </div>
            </div>

            {/* 分值 */}
            <div className="row mb-3">
                <div className="col-4 text-sm-end">
                    <h4>Points</h4>
                </div>
                <div className="col-5">
                    <input
                        type="number"
                        className="form-control"
                        value={quiz.points}
                        onChange={(e) => handleInputChange("points", +e.target.value)}
                    />
                </div>
            </div>

            {/* Assignment Group */}
            <div className="row mb-3">
                <div className="col-4 text-sm-end">
                    <h4>Assignment Group</h4>
                </div>
                <div className="col-5">
                    <select
                        className="form-control form-select"
                        value={quiz.settings.assignmentGroup}
                        onChange={(e) =>
                            handleSettingsChange("assignmentGroup", e.target.value)
                        }
                    >
                        <option value="Quizzes">Quizzes</option>
                        <option value="Exams">Exams</option>
                        <option value="Assignments">Assignments</option>
                        <option value="Project">Project</option>
                    </select>
                </div>
            </div>

            {/* Options */}
            <div className="row mb-3">
                <div className="col-4 text-sm-end">
                    <h4>Options</h4>
                </div>
                <div className="col-8">
                    {/* Shuffle Answers */}
                    <div className="row mb-2">
                        <div className="col-6">
                            <label>Shuffle Answers</label>
                        </div>
                        <div className="col-6">
                            <input
                                type="checkbox"
                                checked={quiz.settings.shuffleAnswers}
                                onChange={(e) =>
                                    handleSettingsChange("shuffleAnswers", e.target.checked)
                                }
                            />
                        </div>
                    </div>

                    {/* Time Limit */}
                    <div className="row mb-2">
                        <div className="col-6">
                            <label>Time Limit (Minutes)</label>
                        </div>
                        <div className="col-6">
                            <input
                                type="number"
                                className="form-control"
                                value={quiz.settings.timeLimit}
                                onChange={(e) => handleSettingsChange("timeLimit", +e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Multiple Attempts */}
                    <div className="row mb-2">
                        <div className="col-6">
                            <label>Multiple Attempts</label>
                        </div>
                        <div className="col-6">
                            <input
                                type="checkbox"
                                checked={quiz.settings.multipleAttempts}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    handleSettingsChange("multipleAttempts", checked);
                                    if (!checked) {
                                        handleSettingsChange("attemptsAllowed", 1); // 重置为默认值
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Attempts Allowed */}
                    {quiz.settings.multipleAttempts && (
                        <div className="row mb-2">
                            <div className="col-6">
                                <label>Attempts Allowed</label>
                            </div>
                            <div className="col-6">
                                <input
                                    type="number"
                                    className="form-control"
                                    value={quiz.settings.attemptsAllowed}
                                    onChange={(e) =>
                                        handleSettingsChange("attemptsAllowed", +e.target.value)
                                    }
                                    min={1} // 限制最小值为 1
                                />
                            </div>
                        </div>
                    )}

                    {/* Show Correct Answers */}
                    <div className="row mb-2">
                        <div className="col-6">
                            <label>Show Correct Answers</label>
                        </div>
                        <div className="col-6">
                            <input
                                type="checkbox"
                                checked={quiz.settings.showCorrectAnswers}
                                onChange={(e) =>
                                    handleSettingsChange("showCorrectAnswers", e.target.checked)
                                }
                            />
                        </div>
                    </div>

                    {/* Access Code */}
                    <div className="row mb-2">
                        <div className="col-6">
                            <label>Access Code</label>
                        </div>
                        <div className="col-6">
                            <input
                                type="text"
                                className="form-control"
                                value={quiz.settings.accessCode}
                                onChange={(e) =>
                                    handleSettingsChange("accessCode", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* One Question at a Time */}
                    <div className="row mb-2">
                        <div className="col-6">
                            <label>One Question at a Time</label>
                        </div>
                        <div className="col-6">
                            <input
                                type="checkbox"
                                checked={quiz.settings.oneQuestionAtATime}
                                onChange={(e) =>
                                    handleSettingsChange("oneQuestionAtATime", e.target.checked)
                                }
                            />
                        </div>
                    </div>

                    {/* Webcam Required */}
                    <div className="row mb-2">
                        <div className="col-6">
                            <label>Webcam Required</label>
                        </div>
                        <div className="col-6">
                            <input
                                type="checkbox"
                                checked={quiz.settings.webcamRequired}
                                onChange={(e) =>
                                    handleSettingsChange("webcamRequired", e.target.checked)
                                }
                            />
                        </div>
                    </div>

                    {/* Lock Questions After Answering */}
                    <div className="row mb-2">
                        <div className="col-6">
                            <label>Lock Questions After Answering</label>
                        </div>
                        <div className="col-6">
                            <input
                                type="checkbox"
                                checked={quiz.settings.lockQuestionsAfterAnswering}
                                onChange={(e) =>
                                    handleSettingsChange(
                                        "lockQuestionsAfterAnswering",
                                        e.target.checked
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Assign 时间 */}
            <div className="row mb-3">
                <div className="col-4 text-sm-end">
                    <h4>Assign</h4>
                </div>
                <div className="col-8">
                    <div className="card">
                        <div className="card-body">
                            <label className="form-label"><strong>Due</strong></label>
                            <div className="input-group mb-3">
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    value={quiz.dueDate?.toISOString().substring(0, 16) || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "dueDate",
                                            new Date(e.target.value)
                                        )
                                    }
                                />
                                <span className="input-group-text">
                                    <FaRegCalendarAlt/>
                                </span>
                            </div>
                            <label className="form-label"><strong>Available From</strong></label>
                            <div className="input-group mb-3">
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    value={
                                        quiz.availableFrom?.toISOString().substring(0, 16) || ""
                                    }
                                    onChange={(e) =>
                                        handleInputChange(
                                            "availableFrom",
                                            new Date(e.target.value)
                                        )
                                    }
                                />
                                <span className="input-group-text">
                                    <FaRegCalendarAlt/>
                                </span>
                            </div>
                            <label className="form-label"><strong>Available Until</strong></label>
                            <div className="input-group mb-3">
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    value={
                                        quiz.availableUntil?.toISOString().substring(0, 16) || ""
                                    }
                                    onChange={(e) =>
                                        handleInputChange(
                                            "availableUntil",
                                            new Date(e.target.value)
                                        )
                                    }
                                />
                                <span className="input-group-text">
                                    <FaRegCalendarAlt/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <hr/>
            {/*TODO:
                        1.save and publish 记得传递下publish == true，然后到quizz主界面
                        2.save就不管navigate到 Quiz Details
                        3.cancel 和 1一样，但就注意就是不要调用save函数储存数据到数据库
                        4.建议都改成button然后通过link来handong函数
                    */}
            <div className="row">
                <div className="col-12 text-center">
                    <button
                        className="btn btn-danger float-end me-3"
                        onClick={() => {
                            handleInputChange("published", true);
                            addQuiz();
                            handleNavtoQuiz();
                        }}
                    >
                        Save & Publish
                    </button>
                    <button
                        className="btn btn-danger float-end me-3"
                        onClick={() => {
                            addQuiz();
                            handleNavtoQuiz();
                        }}
                    >
                        Save
                    </button>
                    <button
                        className="btn btn-secondary float-end me-3"
                        onClick={() => {
                            setQuiz(quizInitialState)// 重置 Quiz
                            handleNavtoQuiz();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}