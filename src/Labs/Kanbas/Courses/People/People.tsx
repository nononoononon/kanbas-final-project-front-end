import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import PeopleTable from "./Table";
import * as coursesClient from "../client";
import PeopleDetails from "./Details";
import {FaUserCircle} from "react-icons/fa";
// people for module
export default function People() {
    const { cid } = useParams<{ cid: string }>(); // course id
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsersForCourse = async () => {
        try {
            if (cid) {
                const usersData = await coursesClient.findUsersForCourse(cid);
                setUsers(usersData);
            }
        } catch (error) {
            console.error("Failed to fetch users for course:", error);
        }
    };

    useEffect(() => {
        fetchUsersForCourse();
    }, [cid]); // based on course id
    //add filter name function later
    return (
        <div id="wd-people-page">
            <h3 className="text-danger">People in Course</h3>
            <div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Section</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users
                        .map((user) => (
                            <tr key={user._id}>
                                <td className="wd-name">{user.firstName}  {user.lastName}</td>
                                <td className="wd-section">{user.section}</td>
                                <td className="wd-role">{user.role}</td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}