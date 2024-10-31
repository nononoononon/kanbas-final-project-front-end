import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";

export default function LessonControlButtons({
                                                 assignmentId,
                                                 deleteAssignment
                                             }: {
    assignmentId: string;
    deleteAssignment: (assignmentId: string) => void;
}) {
    return (
        <div className="float-end d-flex align-items-center">
            <FaTrash
                className="text-danger me-3 fs-5"
                onClick={() => deleteAssignment(assignmentId)}
            />
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-1" />
        </div>
    );
}