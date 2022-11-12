import React from "react";
import PostForm from "../postForm/PostForm";
import { useState } from "react";
import "./AddAnnModal.scss";

function AddAnnModal({ classroomID, theme }) {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            {showForm ? <PostForm classroomID={classroomID} setShowForm={setShowForm} formType="ann" theme={theme} /> : null}
            <div onClick={() => setShowForm(true)} className="add-ann-cta">
                <h5>Post Announcement</h5>
            </div>
        </>
    );
}

export default AddAnnModal;
