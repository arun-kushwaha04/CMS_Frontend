import axios from "./config";

export const postSubmission = async (data) => {
    const url = "/postSubmission";
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

export const getSubmission = async (data) => {
    const url = `/getSubmission?classID=${data.classroomID}&asgID=${data.assignmentID}`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const getSubmissions = async (data) => {
    const url = `/getSubmissions?classID=${data.classroomID}&asgID=${data.assignmentID}`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const saveMarks = async (data) => {
    const url = "/saveMarks";
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};
