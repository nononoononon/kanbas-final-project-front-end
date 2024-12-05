import {Link, useParams} from "react-router-dom";
import React, {useState} from "react";
import {Quiz, quizInitialState} from "../../quizType";
import AddQuestionController from "./AddQuestionController";
import {Question, questionInitialState} from "../../questionType";

export default function QuestionEditorIndex() {

    //todo:获取qid,fetch数据，记得保留一份previousQuiz,点击取消的时候setQuiz (previousQuiz),
    // 你也可以选择传入qui!!!!!!
    const [quiz, setQuiz] = useState<Quiz>(quizInitialState);//得到数据这个改成刚刚得到Quiz
    //获取对应的id
    const{cid, qid} = useParams();

    const [questions, setQuestions] = useState<Question[]>([questionInitialState]);

    //todo:获取完整的question数据，要传入qid查找
    const fetchQuestions = async (quizId: string) => {
        try {
            console.log("Fetching questions with ID:", qid);
            //todo:这个改成真正的fetch逻辑
            const fetchedQuestions = [questionInitialState];
            setQuestions(fetchedQuestions); // Backup data for cancel functionality
        } catch (error) {
            console.error("Error fetching quiz:", error);
        }
    };

    const updateQuiz = async () => {
        // todo:补充好这个update只update数组，questions数组，你也可以选择从上面传入，看你自己
        try {
            console.log("updating quiz:", quiz);
            // Example: await api.update(quiz);
            alert("Quiz updated successfully!");
        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    };

    //todo:useeffect每次进来就要fetchQuestions

    return(
        <div className="container mt-4">
            {/*todo:这个数据用reducer来更新,不然更新不了，或者你试试*/}
            <h5 className="text-end ">points {quiz.points}</h5>
            {/* Tabs */}
            <div className="tabs">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`}
                      className="tab px-3 py-2 border border-black text-dark text-decoration-none">
                    Details
                </Link>
                <Link to=" "
                      className="tab px-3 py-2 border border-black text-dark text-decoration-none">
                    Questions
                </Link>
            </div>
            <hr className="border border-black w-100 mt-1 "/>

            <ul id="wd-questions-list" className="list-group rounded-0">
                {questions.map((question: Question) => (
                    <li key={question._id} className="list-group-item p-3 d-flex align-items-center rounded-2">
                        <Link
                            //todo:去到问题编辑页面，记得改链接,1234第一个是quizID,第二个改成questionID
                            to={`/Kanbas/Courses/${cid}/Quizzes/1234/editor/questions/1234`}
                            className="w-100 d-flex align-items-center text-decoration-none"
                        >
                            <div className="w-100 d-flex flex-column">
                                {/* Title */}
                                <span className="fs-5 fw-bold text-black">{question.title}</span>

                                <div className="text-muted">
                                    <strong>Type </strong>
                                    {question.type}
                                </div>

                                <div className="text-muted">
                                    <strong>Description </strong>
                                    {question.questionText}
                                </div>

                                <div className="text-muted">
                                    <strong>Points </strong>
                                    {question.points}
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            <AddQuestionController/>

            <hr/>

            {/*TODO:
                        1.save and publish 记得传递下publish == true，然后到quizz主界面
                        2.save就不管navigate到 Quiz Details
                        3.cancel 和 1一样，但就注意就是不要调用save函数储存数据到数据库

                    */}
            <div className="row">
                <div className="col-12 text-center">
                    <button
                        className="btn btn-danger float-end me-3"
                        onClick={updateQuiz}
                    >
                        Save
                    </button>
                    <button
                        className="btn btn-secondary float-end me-2"
                        onClick={() => setQuiz(quizInitialState)}//todo：这个改成previous
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>


    )
}