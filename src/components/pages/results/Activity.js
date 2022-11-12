import React from "react";
import { useHistory } from "react-router";

const getDate = (givenDate) => {
    const date = new Date(givenDate);
    const d = date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", hour12: true, hour: "2-digit", minute: "2-digit" }).split(",");
    const finalDate = d[0] + d[1].toUpperCase();
    return finalDate;
};
const getActivityStatus = (activity) => {
    const submissionDate = activity.createdAt;
    if (submissionDate > activity.assignmentID.dueDate) {
        if (activity.marks < 0) return "Not submitted";
        return "Turned in late";
    } else {
        return "";
    }
};

const Activity = ({ activity, ...props }) => {
    const history = useHistory();
    const status = getActivityStatus(activity);
    return (
        <div onClick={() => history.push(props.link)} className={`activity-container border-${props.theme}`}>
            <div className="activity-details">
                <div className="activity-details-head">
                    <span className="activity-details-title">
                        <strong>{activity.assignmentID.title}</strong>
                    </span>
                    <span className="activity-details-status">
                        <strong>
                            <span style={status === "Undergoing Checking ..." ? { color: "rgb(236, 186, 19)" } : {}}>{status}</span>
                        </strong>
                    </span>
                </div>
                <div>{getDate(activity.submissionDate ? activity.submissionDate : activity.assignmentID.dueDate)}</div>
            </div>
            <div className="activity-marks">
                <strong>Marks:</strong>
                <strong>
                    <span className={`font-${props.theme}`}>{activity.marks < 0 ? "--" : activity.marks}</span> / {activity.assignmentID.maxMarks}
                </strong>
            </div>
        </div>
    );
};

export default Activity;
