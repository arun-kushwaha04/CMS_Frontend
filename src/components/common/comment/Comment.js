import React from "react";
import "./Comment.scss";

function Comment({ comment, theme }) {
    const getDate = (givenDate) => {
        if (!givenDate) return;
        const date = new Date(givenDate);
        const d = date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", hour12: true, hour: "2-digit", minute: "2-digit" }).split(",");
        const finalDate = d[0] + d[1].toUpperCase();
        return finalDate;
    };
    return (
        <div className="comment">
            <div className={`avatar bg-${theme}`}>{comment.userID.name[0]}</div>
            <div className="comment-content">
                <h6>
                    <span>{comment.userID.name}</span> &bull; {getDate(comment.createdAt)}
                </h6>
                <p>{comment.body}</p>
            </div>
        </div>
    );
}

export default Comment;
