import React from "react";
import PostForm from "../postForm/PostForm";
import { useState } from "react";
import "./AddAsgModal.scss";

function AddAsgModal({ classroomID, theme ,userClassRole}) {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            {userClassRole === "teacher" || userClassRole === "assistant" ? (
                <div>
                    {showForm ? <PostForm classroomID={classroomID} setShowForm={setShowForm} formType="asg" theme={theme} /> : null}
                    <div onClick={() => setShowForm(true)} className="add-asg-cta">
                        <h5>Post Assignment</h5>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default AddAsgModal;
