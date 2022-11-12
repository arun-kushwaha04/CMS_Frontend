import React, { useState } from "react";
import { uploadFile } from "../../../axios/file";
import "./Upload.scss";

const Upload = () => {
    const [selectedFiles, setselectedFiles] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        //Step1:check if file is selected
        if (!selectedFiles || !selectedFiles.length) {
            alert("No file is selected!");
            return;
        }

        //Step2:make form data
        const data = new FormData();
        data.append("name", "Ramesh");
        data.append("age", 45);
        for (let i = 0; i < selectedFiles.length; i++) {
            data.append(`file`, selectedFiles[i]);
        }

        //Step3:Send to backend server
        try {
            const res = await uploadFile(data);
            console.log("Files Details:", res);
        } catch (error) {
            alert("Failed");
            console.error(error);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    multiple
                    type="file"
                    id="files"
                    onChange={(e) => setselectedFiles(e.target.files)}
                />
                <button type="submit" onSubmit={handleSubmit}>
                    Submit
                </button>
            </form>
        </>
    );
};

export default Upload;
