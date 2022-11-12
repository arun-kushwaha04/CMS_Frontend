import React, { useEffect, useState } from "react";
import "./Assignment.scss";
import { useParams } from "react-router";
import { getAssignmentDetails } from "../../../axios/assignment";
import FileAtt from "../../common/fileAtt/FileAtt";
import { postComment } from "../../../axios/comment";
import Submission from "./Submission";
import { getDate } from "../../../helper";
import { useSelector } from "react-redux";
import SubmissionsList from "./SubmissionsList";
import Comment from "../../common/comment/Comment";
import { IoSendSharp } from "react-icons/io5";

function Assignment() {
    const [body, setBody] = useState("");
    const { classroomID, assignmentID } = useParams();
    const [assignment, setAssignment] = useState({});
    const user = useSelector((state) => state.user);
    const enrolledClassrooms = useSelector((state) => state.enrolledClassrooms);
    const theme = useSelector((state) => state.theme);
    const [showSubmissions, setShowSubmissions] = useState(false);
    const [userClassRole, setUserClassRole] = useState(user.role || "student");
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const data = { body, postID: assignmentID, postType: "asg", classroomID };
        postComment(data).then((res) => {
            // console.log("comments res", res);
            const commentsList = [res.data, ...assignment.commentIDs];
            setAssignment({ ...assignment, commentIDs: commentsList });
        });
        setBody("");
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [assignmentID]);

    useEffect(() => {
        const currClass = enrolledClassrooms.find((item) => item._id === classroomID) || {};
        if (currClass._id && currClass.assistantIDs.includes(user._id)) setUserClassRole("assistant");
        else if (currClass._id && currClass.facultyID === user._id) setUserClassRole("teacher");
    }, [classroomID, user, enrolledClassrooms]);

    useEffect(() => {
        getAssignmentDetails({ classroomID, assignmentID })
            .then((res) => {
                const commentsList = res.data.commentIDs.reverse();
                setAssignment({ ...res.data, commentIDs: commentsList });
                // console.log("getasg", res.data, assignment);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [classroomID, assignmentID]);
    return (
        <>
            {showSubmissions ? (
                <>
                    <SubmissionsList assignment={assignment} theme={theme[classroomID]} setShowSubmissions={setShowSubmissions} />
                </>
            ) : (
                <div className="asg-container">
                    {userClassRole === "student" ? <Submission assignment={assignment} theme={theme[classroomID]} /> : null}
                    <div className={`asg-container2 ${user.role}-extra-margin`}>
                        <div className={`asg-detail border-${theme[classroomID]}`}>
                            <span className="asg-toprow">
                                <span className="asg-heading">
                                    <h3>{assignment.title}</h3>
                                    <h3 className={`asg-points font-${theme[classroomID]}`}>{assignment.maxMarks} points</h3>
                                </span>
                                {userClassRole=== "teacher" || userClassRole=== "assistant" ? (
                                    <span className={`showsubmissions-btn bg-${theme[classroomID]}`} onClick={() => setShowSubmissions(true)}>
                                        show submissions
                                    </span>
                                ) : null}
                            </span>
                            <div className="asg-posted-by">
                                {assignment.classroomID ? <span className={`font-${theme}`}>{assignment.classroomID.facultyID.name}</span> : null} &bull;{" "}
                                {assignment.classroomID ? <span className={`font-${theme}`}>{assignment.classroomID.subjectName}</span> : null}
                            </div>
                            <div className="asg-text">{assignment.body}</div>
                            <div className="attachments">
                                {assignment.fileIDs
                                    ? assignment.fileIDs.map((file, key) => {
                                          return <FileAtt key={key} fileData={file} />;
                                      })
                                    : null}
                            </div>
                            <div className="asg-posted">Posted {getDate(assignment.createdAt)}</div>
                        </div>
                        <form className={`asg-comment border-${theme[classroomID]}`} onSubmit={handleCommentSubmit}>
                            <input
                                placeholder="Write a Comment..."
                                onChange={(e) => {
                                    setBody(e.target.value);
                                }}
                                value={body}
                            ></input>
                            <button className="submit-btn-theme submit-comment">
                                <IoSendSharp />
                            </button>
                        </form>
                        <div className={`asg-class-comments border-${theme[classroomID]}`}>
                            <h3>Class Comments</h3>
                            <div className="asg-class-comment">
                                {assignment.commentIDs
                                    ? assignment.commentIDs.map((comment, key) => {
                                          return <Comment key={key} comment={comment} theme={theme[classroomID]}></Comment>;
                                      })
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Assignment;
