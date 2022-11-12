import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getUpcomingAssignments } from "../../../axios/classroom";
import { setLoading, unsetLoading } from "../../../redux/actions/loading";
import Error from "../error/Error";
import Head from "../results/Head";
import Activity from "../results/Activity";
import todoIMG from '../../../images/priorities/todo.png'

const getSubjectName = (enrolledClassrooms, classroonID) => {
    for (let i = 0; i < enrolledClassrooms.length; i++) {
        if (enrolledClassrooms[i]._id === classroonID) return enrolledClassrooms[i].subjectName;
    }
};

const ToDos = () => {
    const { classroomID } = useParams();
    const theme = useSelector((state) => state.theme);
    const enrolledClassrooms = useSelector((state) => state.enrolledClassrooms);
    const user = useSelector((state) => state.user);
    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();
    const [upcommingAssignment, setUpcommingAssignment] = useState([]);

    const dropdownList = useMemo(() => {
        let result = [];
        for (let i = 0; i < enrolledClassrooms.length; i++) {
            result.push({
                name: enrolledClassrooms[i].subjectName,
                href: `/class/${enrolledClassrooms[i]._id}/todos`,
            });
        }
        return result;
    }, [enrolledClassrooms]);

    /******************   useEffect()   **************/
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [classroomID]);

    useEffect(() => {
        //fetch from backend logic
        dispatch(setLoading());
        getUpcomingAssignments({ classroomID, studentID: user._id })
            .then((resp) => {
                // console.log("getUpcomingAssignments_resp:", resp);
                dispatch(unsetLoading());
                setUpcommingAssignment(resp.data.sort((a, b) => b.assignmentID.dueDate - a.assignmentID.dueDate));
            })
            .catch((err) => {
                console.error(err);
                setUpcommingAssignment([]);
                dispatch(unsetLoading());
            });
    }, [classroomID, dispatch, user]);
    /******************   useEffect()   **************/
    if (!theme[classroomID]) {
        return <Error />;
    }
    return (
        <div className="result-page">
            <Head theme={theme[classroomID]} active={getSubjectName(enrolledClassrooms, classroomID)} list={dropdownList} />
            <div className="result-page-main">
                {!loading && !upcommingAssignment.length ? (
                    <div className='no-data'>
                        <img src={todoIMG} alt='no todos' />
                    </div>
                ) : (
                    <>
                        {upcommingAssignment.map((activity, idx) => (
                            <Activity key={idx} activity={activity} theme={theme[classroomID]} link={`/class/${classroomID}/asg/${activity.assignmentID._id}`} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default ToDos;
