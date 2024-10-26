import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((item, i) => i !== index));
    };
    return (
        <div id="wd-array-state-variables" className="container mt-4">
            <h2>Array State Variable</h2>
            <button className="btn btn-success mb-3" onClick={addElement}>Add Element</button>
            <ul className="list-unstyled">
                {array.map((item, index) => (
                    <li key={index} className="mb-2">
                        <div className="d-flex align-items-center border rounded p-2">
                            <span className="me-auto">{item}</span>
                            <button onClick={() => deleteElement(index)}
                                    className="btn btn-danger ms-2">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <hr/>
        </div>
    );
}

