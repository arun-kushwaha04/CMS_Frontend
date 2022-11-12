import React from "react";
import { useSelector } from "react-redux";
import Card from "../../common/cards/Card";
import "./Home.scss";
import NewClassroomModal from "./NewClassroomModal";
import noClassroomIMG from "../../../images/home/no-classroom.png";

const Home = () => {
    const enrolledClassrooms = useSelector((state) => state.enrolledClassrooms);
    const user = useSelector((state) => state.user);
    const loading = useSelector((state) => state.loading);
    return (
        <>
            {enrolledClassrooms.length ? (
                <>
                    {user.role !== "admin" ? (
                        <div className="class-grid">
                            {enrolledClassrooms.map((item, idx) => (
                                <Card key={idx} details={item} />
                            ))}
                        </div>
                    ) : null}
                </>
            ) : loading ? null : (
                <>
                    <img className="no-classroom-img" src={noClassroomIMG} alt="no classroom here" />
                    <div className="no-classroom-text">No Classrooms yet...</div>
                </>
            )}
            <NewClassroomModal />
        </>
    );
};

export default Home;
