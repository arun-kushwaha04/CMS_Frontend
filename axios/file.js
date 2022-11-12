import axios from './config';

export const uploadFile = async (data) => {
    const url = '/files/upload-multiple'
    try {
        const res = await axios.post(url,data,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: 'Not Connected to server' };
    }
}