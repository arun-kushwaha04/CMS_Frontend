import axios from "./config";

export const createClassroom = async (data) => {
    const url = "/createClassroom";
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const getPostFeed = async (data) => {
    const url = `/getPostFeed?classID=${data}`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const postAssignment = async (data) => {
    const url = "/postAssignment";
    try {
        const res = await axios.post(url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const postAnnouncement = async (data) => {
    const url = "/postAnnouncement";
    try {
        const res = await axios.post(url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const getUpcomingAssignments = async (data) => {
    const url = `/getUpcomingAssignments?classID=${data.classroomID}`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const getUserClassAssignments = async (data) => {
    const url = `/getUserClassAssignments?classID=${data.classroomID}`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};
export const getPeopleInClassroom = async (data) => {
    const url = `/getPeopleInClassroom?classID=${data}`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const addStudentToClassroom = async (data) => {
    const url = `/addStudentToClassroom`;
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const removeStudentFromClassroom = async (data) => {
    const url = `/removeStudentFromClassroom`;
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};


export const addAssistantToClassroom = async (data) => {
    const url = `/addAssistantToClassroom`;
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const removeAssistantFromClassroom = async (data) => {
    const url = `/removeAssistantFromClassroom`;
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const unrollStudentFromClassroom = async (data) => {
    const url = `/unrollStudentFromClassroom`;
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const getStudentAverageGraphData = async (data) => {
    const url = `/getStudentAverageGraphData?classID=${data.classroomID}`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const getStudentAssignmentsGraphData = async (data) => {
    const url = `/getStudentAssignmentsGraphData?classID=${data.classroomID}`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error(error)
        throw error.response ? error.response : { data: null, error: "Not Connected to server" };
    }
};

