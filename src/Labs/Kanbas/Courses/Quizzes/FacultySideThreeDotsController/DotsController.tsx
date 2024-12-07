import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenPublishedCheckmark from "./GreenMark";

export default function QuizControlButtons({
                                               quiz,
                                               deleteQuiz,
                                               editQuiz,
                                               publishQuiz,
                                               sortQuizzes,
                                           }: {
    quiz: {
        _id: string;
        published: boolean;
    };
    deleteQuiz: (quizId: string) => void;
    editQuiz: (quizId: string) => void;
    publishQuiz: (quizId: string, publish: boolean) => void;
    sortQuizzes: (quizId: string) => void;
}) {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div className="float-end d-flex align-items-center position-relative">
            {/*这个对号有要求变绿变浅*/}
            <GreenPublishedCheckmark isPublished={quiz.published}/>
            <IoEllipsisVertical
                className="fs-1"
                onClick={toggleMenu}
                style={{ cursor: "pointer" }}
            />

            {menuVisible && (
                <div
                    className="position-absolute bg-white border rounded shadow p-2"
                    style={{
                        top: "100%",
                        right: "0",
                        zIndex: 1000,
                    }}
                >
                    <button
                        className="btn btn-link text-start w-100 text-decoration-none text-dark"
                        onClick={() => {
                            editQuiz(quiz._id);
                            setMenuVisible(false);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-link text-start w-100 text-decoration-none text-dark"
                        onClick={() => {
                            deleteQuiz(quiz._id);
                            setMenuVisible(false);
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className="btn btn-link text-start w-100 text-decoration-none text-dark"
                        onClick={() => {
                            publishQuiz(quiz._id, !quiz.published);
                            setMenuVisible(false);
                        }}
                    >
                        {quiz.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                        className="btn btn-link text-start w-100 text-decoration-none text-dark"
                        onClick={() => {
                            sortQuizzes(quiz._id);
                            setMenuVisible(false);
                        }}
                    >
                        Sort
                    </button>
                </div>
            )}
        </div>
    );
}