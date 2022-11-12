import React, { useState } from "react";
import "./SubmissionModal.scss";
import { GrFormClose } from "react-icons/gr";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { saveMarks } from "../../../axios/submission";
const baseUrl = "http://localhost:8000/api";

const SubmissionModal = ({ setShowForm, selectedSubmission, theme, setSelectedSubmission }) => {
    const [marks, setMarks] = useState(selectedSubmission.marks > 0 ? selectedSubmission.marks : 0);
    const [showSave, setShowSave] = useState(false);
    const closeOnOverlayClick = (e) => {
        if (e.target.classList[0] === "overlay") {
            // console.log("overlay click");
            setShowForm(false);
        }
        if (e.target.classList[0] === "post-form") {
            // console.log("form click");
        }
    };
    const emailToRollNo = (email) => {
        return email.slice(4, 8) + email.slice(0, 3).toUpperCase() + "-" + email.slice(8, 11);
    };
    const handleChangeMarks = (e) => {
        if (e.target.value <= selectedSubmission.assignmentID.maxMarks && e.target.value >= 0) {
            setMarks(e.target.value);
            setShowSave(true);
        }
    };
    const handleSaveMarks = () => {
        if (marks) {
            saveMarks({ assignmentID: selectedSubmission.assignmentID._id, classroomID: selectedSubmission.assignmentID.classroomID, marks: marks, studentID: selectedSubmission.studentID._id })
                .then((res) => {
                    setSelectedSubmission(res.data);
                    setShowSave(false);
                    setShowForm(false);
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    };
    return (
        <>
            <div className="overlay" onClick={closeOnOverlayClick}>
                <div className="submission-modal">
                    <div className="formclose-btn">
                        <GrFormClose onClick={() => setShowForm(false)} />
                    </div>
                    <h3>
                        <span className={`font-${theme} bold`}>Name : </span>
                        <span className="bold">{selectedSubmission.studentID.name}</span>
                    </h3>
                    <h3>
                        <span className={`font-${theme} bold`}>Roll Number : </span>
                        <span className="bold">{emailToRollNo(selectedSubmission.studentID.email)}</span>
                    </h3>
                    <h3>
                        <span className={`font-${theme} bold`}>Marks : </span>
                        <input className="submission-modal-input bold" type="number" min="0" max={selectedSubmission.assignmentID.maxMarks} value={marks} onChange={handleChangeMarks} />/
                        <span className="bold">{selectedSubmission.assignmentID.maxMarks} </span>
                        {showSave ? (
                            <span className={`submission-modal-save-marks bg-${theme} bold`} onClick={handleSaveMarks}>
                                Save
                            </span>
                        ) : null}
                    </h3>
                    <h3>
                        <span className={`font-${theme} bold`}>Files : </span>
                    </h3>
                    <div className="submission-modal-files">
                        {selectedSubmission.fileIDs.length
                            ? selectedSubmission.fileIDs.map((file, key) => {
                                  return (
                                      <a
                                          onClick={(e) => {
                                              e.stopPropagation();
                                          }}
                                          href={file._id ? `${baseUrl}/files/download?id=${file._id}` : null}
                                          download
                                          key={key}
                                      >
                                          <h4 className={`submission-modal-file font-${theme} bold`}>
                                              <span className="submission-modal-file-icon">
                                                  <BsFileEarmarkCheck />
                                              </span>
                                              {file.metadata ? file.metadata.originalname : file.name}
                                          </h4>
                                      </a>
                                  );
                              })
                            : "No Files Uploaded"}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubmissionModal;
