import React from "react";
import "./Card.scss";
import { SiGooglemeet } from "react-icons/si";
import { HiOutlineClipboardList } from "react-icons/hi";
import { useHistory } from "react-router";
import ThreeDots from "./ThreeDots";
import { useSelector } from "react-redux";

const Card = (props) => {
    const history = useHistory();
    const user = useSelector((state) => state.user);
    const { details } = props;

    return (
        <div className={`card subject-card bg-${details.theme}`}>
            <div className="card-body">
                <div className="subject-body" onClick={() => history.push(`/class/${details._id}`)}>
                    <h5 className={`card-title subject-name font-${details.theme}`}>{details.subjectName}</h5>
                    <h6 id="subject-description">{`${details.batchCode} | Semester ${details.semester} `}</h6>
                    <h6 id="subject-faculty">{details.facultyName}</h6>
                </div>
                <span className="three-dots">
                    <ThreeDots details={details} theme={details.theme}/>
                </span>
            </div>
            <div className="card-bottom">
                {user.role.toLowerCase() === "student" ? (
                    <span onClick={() => history.push(`/class/${details._id}/todos`)}>
                        <HiOutlineClipboardList /> Todo
                    </span>
                ) : null}

                <span onClick={() => history.push(`/class/${details._id}/meet/${details.meetingID}`)}>
                    <SiGooglemeet /> Meeting
                </span>
            </div>
        </div>
    );
};

export default Card;
