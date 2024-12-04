import { FaCheckCircle, FaCircle } from "react-icons/fa";
export default function GreenPublishedCheckmark({
                                           isPublished,
                                       }: {
    isPublished: boolean;
}) {
    return (
        <span className="me-1 position-relative">
            <FaCheckCircle
                style={{ top: "2px" }}
                className={`position-absolute fs-5 ${
                    isPublished ? "text-success" : "text-muted"
                }`}
            />
            <FaCircle
                className={`fs-4 ${isPublished ? "text-white" : "text-light"}`}
            />
        </span>
    );
}