import axios from "./config";

export const postComment = async (data) => {
    const url = "/postComment";
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};
