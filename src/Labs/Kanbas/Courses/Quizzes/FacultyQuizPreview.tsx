import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {mockQuiz, Quiz} from "./quizType";
import {Attempt, attemptInitialState, mockAttempt} from "./Attempts/attemptType";
import {Question} from "./questionType";
import {getAttemptById, getQuizById, submitAttempt} from "./client";
//todo:写完学生的加这个就行，就是多加了个按钮并且edit quiz是直接返回到对应的edit页面，然后去除掉次数限制

export default function FacultyQuizPreview() {
    const { cid,qid, attemptId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<Quiz>();
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [attempt, setAttempt] = useState<Attempt>();//这个可以是null
    const [score, setScore] = useState<number | null>(null);
    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                if (qid && attemptId) {
                    // 获取 Quiz 数据
                    const fetchedQuiz = await getQuizById(qid);
                    setQuiz(fetchedQuiz);
                    console.log("分数是 "+ fetchedQuiz.points)
                    // 根据 attemptId 获取 Attempt 数据
                    const populatedAttempt = await getAttemptById(qid, attemptId);
                    setAttempt(populatedAttempt);
                } else {
                    console.error('Missing qid or attemptId');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchQuizData();
    }, []);

    const handleAnswerChange = (questionId: string, answer: string) => {
        // 更新 answers 状态
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));

        // 更新 attempt.answers
        setAttempt((prevAttempt) => {
            if (!prevAttempt) return prevAttempt;

            // 更新指定 questionId 的答案
            const updatedAnswers = prevAttempt.answers.map((a) => {
                const id = typeof a.questionId === 'string' ? a.questionId : a.questionId._id;
                return id === questionId ? { ...a, answer } : a;
            });

            return { ...prevAttempt, answers: updatedAnswers };
        });
    };

    //注意这个是交了后的数据，别和fetch的弄混了
    const submitQuiz = async () => {
        if (!quiz || !attempt) return;
        console.log("Submitting answers:", attempt.answers);
        if (qid && attemptId) {
            try {
                const submittedAttempt = await submitAttempt(attemptId, attempt.answers);
                console.log("传回来的是:", submittedAttempt.answers);
                setScore(submittedAttempt.score);
            } catch (error) {
                console.error("Error submitting quiz:", error);
            }
        }
    };


    const handleNavtoQuizzes =()=>{
        setAttempt(undefined)
        setScore(0)
        navigate(`/Kanbas/Courses/${cid}/Quizzes`); // 动态导航到该课程的 Quizzes 页面
    }

    const handleNavtoEditQuizzes =()=>{
        setAttempt(undefined)
        setScore(0)
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`); // 动态导航到该课程的 Quizzes 页面
    }


    return (

        <div className="container mt-4">
            {quiz && attempt && (
                <>
                    <h2>{quiz.title}</h2>
                    <p>
                        Attempt {attempt.attemptNumber}/{quiz.settings.attemptsAllowed}
                    </p>
                    {attempt.answers.map((answer) => {
                        const question = typeof answer.questionId === "string" ? null : (answer.questionId as Question);

                        return (
                            <div key={question?._id ?? (answer.questionId as string)} className="mb-3">
                                {/* Render the Question */}
                                <h5>{question?.questionText ?? "Question not available"}</h5>

                                {/* Render Multiple Choice or True/False options */}
                                {question?.type === "Multiple Choice" || question?.type === "True/False" ? (
                                    (question.type === "True/False" ? ["True", "False"] : question.choices || []).map((option: string) => (
                                        <div key={option}>
                                            <input
                                                type="radio"
                                                name={question._id}
                                                value={option}
                                                checked={answers[question._id] === option}
                                                onChange={() => handleAnswerChange(question._id, option)}
                                            />
                                            <label className="ms-2">{option}</label>
                                        </div>
                                    ))
                                ) : null}

                                {/* Render Fill in the Blank input */}
                                {question?.type === "Fill in the Blank" ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Type your answer here"
                                        value={answers[question._id] ?? ""}
                                        onChange={(e) =>
                                            handleAnswerChange(question._id, e.target.value)
                                        }
                                    />
                                ) : null}
                            </div>
                        );
                    })}
                    <button className="btn btn-secondary me-3" onClick={handleNavtoQuizzes}>
                        Back to Quizzes
                    </button>
                    <button
                        className="btn me-3 btn-danger"
                        onClick={submitQuiz}
                    >
                        Submit Quiz
                    </button>
                    <button
                        className="btn me-3 btn-secondary text-end"
                        onClick={handleNavtoEditQuizzes}
                    >
                        Edit Quiz
                    </button>

                    <hr/>
                    <h3 className="text-center">{score !== null && <p>Your Score: {score} / {quiz.points}</p>}</h3>
                </>
            )}
        </div>
    );
}