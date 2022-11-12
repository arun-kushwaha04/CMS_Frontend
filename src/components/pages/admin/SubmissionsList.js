import React, { useEffect, useState } from "react";
import { getSubmissions } from "../../../axios/submission";
import SubmissionModal from "./SubmissionModal";

function SubmissionsList({ assignment, theme, setShowSubmissions }) {
    const [submissions, setSubmissions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState({});
    const [uncheckedSubmissions, setUncheckedSubmissions] = useState(true);
    const [notSubmitted, setNotSubmitted] = useState([]);
    const emailToRollNo = (email) => {
        return email.slice(4, 8) + email.slice(0, 3).toUpperCase() + "-" + email.slice(8, 11);
    };
    const getTotalSubmissions = (submissions) => {
        let counter = 0;
        for (let i = 0; i < submissions.length; i++) {
            if (submissions[i].submissionDate) {
                counter += 1;
            }
        }
        return counter;
    };
    const openSubmissionModal = (submission) => {
        setSelectedSubmission(submission);
        setShowForm(true);
    };
    useEffect(() => {
        if (assignment?._id) {
            getSubmissions({ classroomID: assignment.classroomID, assignmentID: assignment._id })
                .then((res) => {
                    setSubmissions(res.data);
                    setNotSubmitted(res.data.filter((submission) => !submission.submissionDate));
                })
                .catch((e) => {
                    console.error(e);
                });
        }
        return;
    }, [assignment, selectedSubmission]);
    return (
        <div className="submissions-list-container">
            <div className="asg-toprow">
                {showForm ? <SubmissionModal setSelectedSubmission={setSelectedSubmission} selectedSubmission={selectedSubmission} theme={theme} setShowForm={setShowForm} /> : null}
                <h2>{assignment.title}</h2>
                <span className={`showsubmissions-btn bg-${theme}`} onClick={() => setShowSubmissions(false)}>
                    show assignment
                </span>
            </div>
            {/* <br /> */}
            <div className="asg-secondrow">
                {/* <span className="asg-secondrow1"></span> */}
                <h4>Class Submissions</h4>
                <h5 className={`total-submissions `}>
                    Total: {getTotalSubmissions(submissions)}/{submissions.length}
                </h5>
            </div>
            <div className={`asg-filter-btn font-${theme} bold`}>
                <input
                    type="checkbox"
                    className="filter-checkbox"
                    size="50px"
                    onChange={(e) => {
                        setUncheckedSubmissions(e.target.checked);
                    }}
                    checked={uncheckedSubmissions}
                />
                Unchecked Submissions Only
            </div>
            <div className="submissions-list">
                {submissions
                    .filter((submission) => {
                        return submission.submissionDate !== undefined;
                    })
                    .filter((submission) => {
                        return uncheckedSubmissions ? submission.marks === -1 : true;
                    })
                    .map((submission, key) => (
                        <span
                            key={key}
                            className="submission-item"
                            onClick={() => {
                                openSubmissionModal(submission);
                            }}
                        >
                            <div className="submission-item-left">
                                <div className="submission-item-name">{submission.studentID.name}</div>
                                <div className="submission-item-pipeline">|</div>
                                <div className={`submission-item-rollno font-${theme} bold `}>{emailToRollNo(submission.studentID.email)} </div>
                            </div>
                            <span className="submission-item-marks">
                                {submission.marks >= 0 ? submission.marks : "__"}/{submission.assignmentID.maxMarks}
                            </span>
                            <span className={`submission-item-attachments font-${theme} bold`}>Attachments: {submission.fileIDs.length} </span>
                        </span>
                    ))}
                {notSubmitted.length ? <h4 className="not-submitted-header">Not Submitted</h4> : null}

                {notSubmitted.map((submission, key) => (
                    <span key={key} className="submission-item not-clickable">
                        <div className="submission-item-left">
                            <div className="submission-item-name">{submission.studentID.name}</div>
                            <div className="submission-item-pipeline">|</div>
                            <div className={`submission-item-rollno font-${theme} bold `}>{emailToRollNo(submission.studentID.email)} </div>
                        </div>
                        <span className={`submission-item-attachments submission-item-right-align font-black bold`}>Not Submitted</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

export default SubmissionsList;
