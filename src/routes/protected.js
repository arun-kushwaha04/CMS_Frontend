import Assignment from "../components/pages/Assignment/Assignment";
import Results from "../components/pages/results/Results";
import Upload from "../components/common/file-upload/Upload";
import Classroom from "../components/pages/classroom/Classroom";
import Home from "../components/pages/home/Home";
import ToDos from "../components/pages/todos/ToDos";
import VideoConference from "../components/pages/video-conference/VideoConference";
import Admin from "../components/pages/admin/Admin";
import Graph from "../components/pages/result-graph/Graph";

export const protectedRoutes = [
    {
        component: Home,
        path: "/",
    },
    {
        component: Assignment,
        path: "/class/:classroomID/asg/:assignmentID",
    },
    {
        component: Results,
        path: "/class/:classroomID/results",
    },
    {
        component: Graph,
        path: "/class/:classroomID/graphs",
    },
    {
        component: ToDos,
        path: "/class/:classroomID/todos",
    },
    {
        component: Upload,
        path: "/upload",
    },
    {
        component: Classroom,
        path: "/class/:classroomID",
    },
    {
        component: VideoConference,
        path: "/class/:classroomID/meet/:meetingID",
    },
];

export const adminRoutes = [
    {
        component: Admin,
        path: "/",
    },
];
