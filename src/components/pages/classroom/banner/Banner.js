import React from "react";
import { FaVideo, FaClipboard } from "react-icons/fa";
import { useHistory } from "react-router";
import ThreeDots from "../../../common/cards/ThreeDots";
import "./Banner.scss";

function Banner({ currentClassroom, ...props }) {
    const history = useHistory();
    return (
        <>
            <div className={`banner bg-${currentClassroom.theme}`}>
                <span className="three-dots">
                    <ThreeDots details={currentClassroom} theme={currentClassroom.theme} />
                </span>
                <div className="info">
                    <h1>{currentClassroom.subjectName}</h1>
                    <h3>
                        Semester {currentClassroom.semester} | {currentClassroom.batchCode}
                    </h3>
                </div>
                <div className="actions">
                    <button onClick={() => history.push(`/class/${currentClassroom._id}/meet/${currentClassroom.meetingID}`)}>
                        <FaVideo /> Meeting
                    </button>
                    <button
                        onClick={() =>
                            props.userClassRole.toLowerCase() === "student" ? history.push(`/class/${currentClassroom._id}/results`) : history.push(`/class/${currentClassroom._id}/graphs`)
                        }
                    >
                        <FaClipboard /> Results
                    </button>
                </div>
            </div>
        </>
    );
}

export default Banner;
