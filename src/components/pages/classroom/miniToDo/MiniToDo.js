import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getUpcomingAssignments } from "../../../../axios/classroom";
import "./MiniToDo.scss";

function MiniToDo({ classroomID }) {
    const [pendingSubmissions, setPendingSubmissions] = useState([]);
    useEffect(() => {
        getUpcomingAssignments({ classroomID })
            .then((res) => {
                // console.log('getUpcomingAssignments_res',res);
                setPendingSubmissions(res.data);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [classroomID]);
    const history = useHistory();
    const openAssignment = (assignmentID) => {
        history.push(`/class/${classroomID}/asg/${assignmentID}`);
    };
    return (
        <div className="mini-to-do">
            <h4>Pending Work</h4>
            <ul>
                {pendingSubmissions.map((submission) => {
                    return <li onClick={() => openAssignment(submission.assignmentID._id)}>{submission.assignmentID.title}</li>;
                })}
            </ul>
        </div>
    );
}

export default MiniToDo;
