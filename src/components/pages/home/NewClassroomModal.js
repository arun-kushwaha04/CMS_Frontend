import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { createClassroom } from "../../../axios/classroom";
import "./NewClassroomModal.scss";
import { pushClassroom } from "../../../redux/actions/enrolledClassrooms";

const ClassForm = ({ setShowForm }) => {
    const history = useHistory();
    const [subjectName, setSubjectName] = useState("");
    const [batchCode, setBatchCode] = useState("");
    const [description, setDescription] = useState("");
    const [semester, setSemester] = useState("");
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            subjectName,
            batchCode,
            description,
            semester,
            facultyID: user._id,
        };
        createClassroom(data)
            .then((resp) => {
                const redirectURL = `/class/${resp.data._id}`;
                dispatch(pushClassroom(resp.data));
                history.push(redirectURL);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const closeOnOverlayClick = (e) => {
        if (e.target.classList[0] === "overlay") {
            // console.log("overlay click");
            setShowForm(false);
        }
        if (e.target.classList[0] === "post-form") {
            // console.log("form click");
        }
    };
    return (
        <>
            <div className="overlay" onClick={closeOnOverlayClick}>
                <form className="classroom-form" onSubmit={handleSubmit}>
                    <h2>Add New Classroom</h2>
                    <div className="form-input">
                        {subjectName.length ? <h6>SUBJECT NAME</h6> : null}
                        <input required type="text" placeholder="Subject Name" onChange={(e) => setSubjectName(e.target.value)} />
                    </div>
                    <div className="form-input">
                        {batchCode.length ? <h6>BATCH CODE</h6> : null}
                        <input required type="text" placeholder="Batch Code (ex. IMT20XX)" onChange={(e) => setBatchCode(e.target.value)} />
                    </div>
                    <div className="form-input">
                        {semester.length ? <h6>SEMESTER</h6> : null}
                        <input required min="0" max="10" type="number" placeholder="Semester" onChange={(e) => setSemester(e.target.value)} />
                    </div>
                    <div className="form-input">
                        {description.length ? <h6>SUBJECT DESCRIPTION</h6> : null}
                        <textarea placeholder="Subject Description..." rows={6} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <button onSubmit={handleSubmit}>+ Add Classroom</button>
                    <div className="formclose-btn">
                        <GrFormClose onClick={() => setShowForm(false)} />
                    </div>
                </form>
            </div>
        </>
    );
};

const NewClassroomModal = () => {
    const [showForm, setShowForm] = useState(false);
    const user = useSelector((state) => state.user);
    return (
        <>
            {showForm ? (
                <ClassForm setShowForm={setShowForm} />
            ) : user.role !== "student" ? (
                <div onClick={() => setShowForm(true)} className="plus-btn">
                    <FaPlus />
                </div>
            ) : null}
        </>
    );
};

export default NewClassroomModal;
