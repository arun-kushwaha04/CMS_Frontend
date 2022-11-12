import axios from "./config";

export const getAssignmentDetails = async (data) => {
    const url = `/getAssignmentDetails?classID=${data.classroomID}&asgID=${data.assignmentID}`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};
