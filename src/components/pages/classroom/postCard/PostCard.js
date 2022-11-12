import "./PostCard.scss";
import React, { useEffect, useState } from "react";
import FileAtt from "../../../common/fileAtt/FileAtt";

import { useHistory } from "react-router";
import Comment from "../../../common/comment/Comment";
import { IoSendSharp } from "react-icons/io5";
import { postComment } from "../../../../axios/comment";

function formatDate(datestr) {
    const date = new Date(datestr);
    const d = date
        .toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
        })
        .split(",");
    return d[0] + d[1].toUpperCase();
}

function PostCard({ postType, theme, content, classroomID }) {
    const history = useHistory();
    const openAsg = (postType) => {
        if (postType === "asg") {
            history.push(`/class/${classroomID}/asg/${content._id}`);
        }
    };
    const [showAllComments, setShowAllComments] = useState(false);
    const [body, setBody] = useState("");
    const [comments, setComments] = useState(content.commentIDs);
    useEffect(() => {
        setComments((comments) => comments.reverse());
    }, []);
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const data = { body, postID: content._id, postType: postType, classroomID: classroomID };
        postComment(data).then((res) => {
            console.log("comments res", res);
            setComments([res.data, ...content.commentIDs]);
        });
        setBody("");
    };
    return (
        <div className={`post-card-container border-${theme} ${postType}-card`}>
            <div onClick={() => openAsg(postType)} className={`post-card`}>
                {postType === "asg" && <h5 className={`asg-marker font-${theme}`}>ASSIGNMENT &bull; DUE {formatDate(content.dueDate)}</h5>}
                <h2>{content.title}</h2>
                <div className="subtitle">
                    <h5 className="post-auth">{postType === "asg" ? content.facultyID.name : content.userID.name}</h5>
                    <h5>&bull;</h5>
                    <h5 className="post-date">{formatDate(content.createdAt)}</h5>
                </div>
                {content.body ? <p>{content.body}</p> : null}
                <div className="attachments">
                    {content.fileIDs.map((file, key) => {
                        return <FileAtt key={key} fileData={file} />;
                    })}
                </div>
            </div>
            <div className="card-comment-input">
                <input type="text" name="" id="" placeholder="Write a Comment" value={body} onChange={(e) => setBody(e.target.value)} />
                <div onClick={handleCommentSubmit} className={`comment-submit-btn font-${theme}`}>
                    <IoSendSharp />
                </div>
            </div>
            <div className="comment-area">
                {(showAllComments ? comments : comments.slice(0, 1))?.map((comment, key) => {
                    return <Comment key={key} comment={comment} theme={theme}></Comment>;
                })}
                {comments?.length > 1 ? (
                    <div
                        className="show-all-btn"
                        onClick={() => {
                            setShowAllComments(!showAllComments);
                        }}
                    >
                        {showAllComments ? "SHOW LESS COMMENTS" : "SHOW MORE COMMENTS"}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default PostCard;
