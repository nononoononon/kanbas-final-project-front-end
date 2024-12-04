import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import {Quiz, quizInitialState} from "../quizType";

export default function QuestionEditorIndex() {
    //todo:获取qid,fetch数据，记得保留一份previousQuiz,点击取消的时候setQuiz (previousQuiz)
    const [quiz, setQuiz] = useState<Quiz>(quizInitialState);//得到数据这个改成previousQuiz
    const{cid, qid} = useParams<{ cid:string, qid: string }>();
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
        </div>
    )
}