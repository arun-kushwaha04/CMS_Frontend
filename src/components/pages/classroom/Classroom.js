import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./banner/Banner";
import PostCard from "./postCard/PostCard";
import "./Classroom.scss";
import MiniToDo from "./miniToDo/MiniToDo";
import { useParams } from "react-router";
import AddAnnModal from "./addAnnModal/AddAnnModal";
import AddAsgModal from "./addAsgModal/AddAsgModal";
import { getPeopleInClassroom, getPostFeed } from "../../../axios/classroom";
import img from "./no-data.png";
import { setLoading, unsetLoading } from "../../../redux/actions/loading";
import { MdPeople } from "react-icons/md";
import PeopleModal from "./peopleModal/PeopleModal";

function Classroom() {
    const { classroomID } = useParams();
    const [feed, setFeed] = useState([]);
    const enrolledClassrooms = useSelector((state) => state.enrolledClassrooms);
    const [currentClassroom, setCurrentClassroom] = useState({});
    const [showAllDesc, setShowAllDesc] = useState(false);
    const [showPeople, setShowPeople] = useState(false);
    const [people, setPeople] = useState([]);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const user = useSelector((state) => state.user);
    const [userClassRole, setUserClassRole] = useState(user.role || "student");

    const descModifier = (showAll, description) => {
        if (description.length < 80) return <p>{description}</p>;
        return showAll ? (
            <>
                <p>{description}</p>
                <b onClick={() => setShowAllDesc(false)}>SHOW LESS</b>
            </>
        ) : (
            <>
                <p>{description.slice(0, 81)}...</p>
                <b onClick={() => setShowAllDesc(true)}>SHOW MORE</b>
            </>
        );
    };

    useEffect(() => {
        dispatch(setLoading());
        getPostFeed(classroomID).then((res) => {
            setFeed(res.data);
            dispatch(unsetLoading());
        });
        return;
    }, [classroomID, dispatch]);

    useEffect(() => {
        const currClass = enrolledClassrooms.find((item) => item._id === classroomID) || {};
        setCurrentClassroom(currClass);
        if (currClass._id && currClass.assistantIDs.includes(user._id)) setUserClassRole("assistant");
        else if (currClass._id && currClass.facultyID === user._id) setUserClassRole("teacher");
        return;
    }, [enrolledClassrooms, classroomID, user]);

    useEffect(() => {
        if (showPeople)
            getPeopleInClassroom(classroomID)
                .then((res) => {
                    setPeople(res.data);
                })
                .catch((e) => {
                    console.error(e);
                });
    }, [classroomID, showPeople]);

    return (
        <div>
            {showPeople ? <PeopleModal people={people} setShowPeople={setShowPeople} showPeople={showPeople} theme={currentClassroom.theme} /> : null}
            <Banner currentClassroom={currentClassroom} userClassRole={userClassRole}/>
            <div className="feed">
                <div className="left-column">
                    {feed.length ? (
                        feed.map((post, key) => {
                            return <PostCard classroomID={classroomID} key={key} content={post} postType={post.dueDate ? "asg" : "ann"} theme={currentClassroom.theme} />;
                        })
                    ) : loading ? null : (
                        <div className="no-data-class-img">
                            <img src={img} alt="no-data" />
                            <div>Nothing to see here.</div>
                        </div>
                    )}
                </div>

                <div className="right-column">
                    {currentClassroom.description ? (
                        <div className="class-desc">
                            <div className="desc-header">
                                <h5>About This Classroom</h5>
                                <div className="people-icon-btn" onClick={() => setShowPeople(true)}>
                                    <MdPeople />
                                </div>
                            </div>
                            {descModifier(showAllDesc, currentClassroom.description)}
                        </div>
                    ) : null}
                    <AddAnnModal classroomID={classroomID} theme={currentClassroom.theme} />
                    <AddAsgModal classroomID={classroomID} theme={currentClassroom.theme} userClassRole={userClassRole} />
                    {user.role === "student" ? <MiniToDo classroomID={classroomID} /> : null}
                </div>
            </div>
        </div>
    );
}

export default Classroom;
