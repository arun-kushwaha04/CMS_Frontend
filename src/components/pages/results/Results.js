import React, { useEffect, useMemo, useState } from "react";
import "./result.scss";
import Activity from "./Activity";
import Head from "./Head";
import { useParams } from "react-router-dom";
import AverageSection from "./AverageSection";
import Error from "../error/Error";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../../common/no-data/NoData";
import { getUserClassAssignments } from "../../../axios/classroom";
import { setLoading, unsetLoading } from "../../../redux/actions/loading";
import Graph from "../result-graph/Graph";

const calcMarks = (activities, classAverage) => {
    let maxMarks = 0,
        yourMarks = 0,
        yourPercentage = 0;
    for (let i = 0; i < activities.length; i++) {
        yourMarks += activities[i].marks > -1 ? activities[i].marks : 0;
        maxMarks += activities[i].assignmentID.maxMarks;
        yourPercentage += activities[i].marks > -1 ? (activities[i].marks * 100) / (activities[i].assignmentID.maxMarks || 1) : 0;
    }
    const marks = {
        yourMarks,
        maxMarks,
        yourAverage: Math.round(yourPercentage / (activities.length || 1)),
        classAverage,
    };
    return marks;
};

const getSubjectName = (enrolledClassrooms, classroonID) => {
    for (let i = 0; i < enrolledClassrooms.length; i++) {
        if (enrolledClassrooms[i]._id === classroonID) return enrolledClassrooms[i].subjectName;
    }
};
const Results = () => {
    const [classAverage, setClassAverage] = useState(0);
    const { classroomID } = useParams();
    const theme = useSelector((state) => state.theme);
    const enrolledClassrooms = useSelector((state) => state.enrolledClassrooms);
    const loading = useSelector((state) => state.loading);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [activities, setActivities] = useState([]);

    const dropdownList = useMemo(() => {
        let result = [];
        for (let i = 0; i < enrolledClassrooms.length; i++) {
            result.push({
                name: enrolledClassrooms[i].subjectName,
                href: `/class/${enrolledClassrooms[i]._id}/results`,
            });
        }
        return result;
    }, [enrolledClassrooms]);

    /******************   useEffect()   **************/
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [classroomID]);

    //fetch all subject activities
    useEffect(() => {
        //fetch from backend logic
        dispatch(setLoading());
        getUserClassAssignments({ classroomID, id: user._id })
            .then((resp) => {
                // console.log("getUserClassAssignments_res", resp);
                setActivities(resp.data.assignments.sort((a, b) => b.assignmentID.dueDate - a.assignmentID.dueDate));
                setClassAverage(resp.data.classAverage);
                dispatch(unsetLoading());
            })
            .catch((err) => {
                console.error(err);
                setActivities([]);
                dispatch(unsetLoading());
            });
    }, [classroomID, user, dispatch]);
    /******************   useEffect()   **************/
    if (!theme[classroomID]) {
        return <Error />;
    }
    return (
        <div className="result-page">
            <Head theme={theme[classroomID]} active={getSubjectName(enrolledClassrooms, classroomID)} list={dropdownList} graphLink={`/class/${classroomID}/graphs`} />
            <div className="result-page-main">
                {!loading && !activities.length ? (
                    <NoData />
                ) : (
                    <>
                        <AverageSection marks={calcMarks(activities, classAverage)} theme={theme[classroomID]} />
                        {activities.map((activity, idx) => (
                            <Activity key={idx} activity={activity} theme={theme[classroomID]} link={`/class/${classroomID}/asg/${activity.assignmentID._id}`} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Results;
