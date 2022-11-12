import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { getStudentAssignmentsGraphData, getStudentAverageGraphData } from "../../../axios/classroom";
import { setLoading, unsetLoading } from "../../../redux/actions/loading";
import LineGraph from "./graphs/LineGraph";
import LineGraph2 from "./graphs/LineGraph2";
import { BiArrowBack } from "react-icons/bi";
import Head from "../results/Head";

const getThemeColor = { red: "#ff6969", purple: "#b68ceb", blue: "#72cdf5", yellow: "rgb(241, 194, 72)", green: "#7ae24a", orange: "rgb(255, 146, 82)", black: "black" };
const getSubjectName = (enrolledClassrooms, classroonID) => {
    for (let i = 0; i < enrolledClassrooms.length; i++) {
        if (enrolledClassrooms[i]._id === classroonID) return enrolledClassrooms[i].subjectName;
    }
};
const Graph = () => {
    const history = useHistory();
    const { classroomID } = useParams();
    const [dataGraph1, setDataGraph1] = useState([]);
    const [dataGraph2, setDataGraph2] = useState([]);
    const theme = useSelector((state) => state.theme);
    const enrolledClassrooms = useSelector((state) => state.enrolledClassrooms);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const dropdownList = useMemo(() => {
        let result = [];
        for (let i = 0; i < enrolledClassrooms.length; i++) {
            result.push({
                name: enrolledClassrooms[i].subjectName,
                href: `/class/${enrolledClassrooms[i]._id}/graphs`,
            });
        }
        return result;
    }, [enrolledClassrooms]);

    useEffect(() => {
        dispatch(setLoading());
        getStudentAverageGraphData({ classroomID })
            .then((resp) => {
                // console.log("getStudentAverageGraphData_resp:", resp);
                const data = [
                    {
                        id: "Student Average",
                        color: "hsl(125, 70%, 50%)",
                        data: resp.data,
                    },
                ];
                setDataGraph1(data);
                dispatch(unsetLoading());
            })
            .catch((e) => {
                console.error(e);
                dispatch(unsetLoading());
            });

        dispatch(setLoading());
        getStudentAssignmentsGraphData({ classroomID })
            .then((resp) => {
                // console.log("getStudentAssignmentsGraphData:", resp);
                setDataGraph2(resp.data);
                dispatch(unsetLoading());
            })
            .catch((e) => {
                console.error(e);
                dispatch(unsetLoading());
            });
    }, [classroomID, dispatch]);

    return (
        <>
            <Head theme={theme[classroomID]} active={getSubjectName(enrolledClassrooms, classroomID)} list={dropdownList} />
            <div style={{ paddingTop: "6rem" }}>
                {user.role.toLowerCase() === "student" ? (
                    <div className="back-btn" onClick={() => history.push(`/class/${classroomID}/results`)}>
                        <BiArrowBack className="back-svg" />
                        BACK
                    </div>
                ) : null}
                <LineGraph data={dataGraph1} theme={getThemeColor[theme[classroomID]]} />
                <LineGraph2 data={dataGraph2} theme={getThemeColor[theme[classroomID]]} />
            </div>
        </>
    );
};

export default Graph;
