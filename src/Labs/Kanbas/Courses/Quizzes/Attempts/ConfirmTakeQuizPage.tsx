import React, { useState, useEffect } from "react";
import {getAttemptById, getQuizById, startAttempt} from "../client";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Quiz } from "../quizType";

interface User {
    _id: string;
    role: string;
}

interface Enrollment {
    user: string;
    course: string;
}

interface RootState {
    accountReducer: {
        currentUser: User;
    };
    enrollmentReducer: {
        enrollments: Enrollment[];
    };
}

export default function ConfirmTakeQuizPage() {
    const { cid,qid } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const studentId = currentUser._id;

    // 加载 Quiz 信息
    const loadQuiz = async () => {
        if (qid) {
            setLoading(true);
            try {
                const quizData = await getQuizById(qid);
                setQuiz(quizData);
            } catch (error) {
                console.error("Error fetching quiz:", error);
                setError("Failed to load quiz information. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (qid) {
            loadQuiz();
        }
    }, [qid]);

    const handleStartQuiz = async () => {
        setLoading(true);
        setError(null);

        try {
            const newAttempt = await startAttempt(qid!, studentId!);
            const attemptId = newAttempt._id;
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/attempt/${attemptId}`);
        } catch (err) {
            console.error("Error starting quiz attempt:", err);
            setError("Failed to start quiz attempt. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBackToQuizzes = () => {
        navigate(`/Kanbas/Courses/Quizzes`);
    };

    return (
        <div className="container mt-5 d-flex flex-column justify-content-center">
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && quiz && (
                <>
                    <h2 className="mb-4 text-center">
                        <strong>{quiz.title}</strong>
                    </h2>
                    <h5 className="mb-4 text-center">Once you begin, your attempt will be recorded.</h5>
                    <div className="mt-4 d-flex justify-content-center">
                        <button
                            className="btn btn-secondary me-4"
                            onClick={handleBackToQuizzes}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={handleStartQuiz}
                            disabled={loading}
                        >
                            Start Quiz
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}