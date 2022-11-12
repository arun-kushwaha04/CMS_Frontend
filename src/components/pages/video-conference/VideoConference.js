import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { config } from "./jitsiConfig";
import "./VideoConference.scss";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "../../../redux/actions/loading";
import { validateMeetAccess } from "../../../axios/user";

const VideoConference = () => {
    const { meetingID, classroomID } = useParams();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const loadJitsiScript = () =>
        new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://meet.jit.si/external_api.js";
            script.async = true;
            script.onload = resolve;
            document.body.appendChild(script);
        });

    useEffect(() => {
        validateMeetAccess(classroomID, meetingID)
            .then((res) => {
                if (res.data !== "valid") {
                    window.location.replace(`/`);
                }
            })
            .catch((e) => {
                console.error(e);
                window.location.replace(`/`);
            });
    }, [classroomID,meetingID]);

    useEffect(() => {
        const initialiseJitsi = async () => {
            if (!window.JitsiMeetExternalAPI) {
                await loadJitsiScript();
            }

            return new window.JitsiMeetExternalAPI("meet.jit.si", {
                parentNode: document.getElementById("jitsi"),
                roomName: meetingID,
                ...config,
                userInfo: {
                    email: user.email,
                    displayName: user.name,
                },
            });
        };

        let jitsi;
        dispatch(setLoading());
        initialiseJitsi()
            .then((resp) => {
                dispatch(setLoading());
                jitsi = resp;
                jitsi.on("videoConferenceLeft", (e) => {
                    if (e) console.error(e);
                    window.location.replace(`/class/${classroomID}`);
                });
            })
            .catch((e) => {
                dispatch(setLoading());
                console.log(e);
                window.location.replace(`/class/${classroomID}`);
            });
        return () => {
            jitsi?.dispose?.();
            dispatch(unsetLoading());
        };
    }, [classroomID, user, meetingID, dispatch]);

    return <div id="jitsi"></div>;
};

export default VideoConference;
