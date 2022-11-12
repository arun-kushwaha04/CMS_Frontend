import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { register, disable } from "../../../axios/admin";
import { MdCancel } from "react-icons/md";
import { CSV2JSON, isValidUserJSON } from "../../../helper";

const list = ["Student", "Teacher", "Admin"];

function AddUser() {
    const [active, setActive] = useState(list[0]);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userBatchCode, setUserBatchCode] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        register([{ name: userName, email: userEmail, batchCode: userBatchCode, role: active }])
            .then((resp) => {
                alert(resp.data);
            })
            .catch((e) => {
                console.error(e);
            });
    };
    return (
        <form className="admin-form" onSubmit={handleSubmit}>
            <h4>Add A User</h4>
            <div>
                <span className="admin-form-label">User Role:</span>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic" className="admin-form-drop-btn">
                        {active}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="drop-menu">
                        {list.map((item, idx) => (
                            <Dropdown.Item
                                className="drop-item"
                                key={idx}
                                onClick={() => {
                                    setActive(item);
                                }}
                            >
                                {item}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div>
                <span className="admin-form-label">User Name:</span>
                <input
                    required
                    value={userName}
                    type="text"
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                />
            </div>
            <div>
                <span className="admin-form-label">User Email:</span>
                <input
                    required
                    type="email"
                    value={userEmail}
                    onChange={(e) => {
                        setUserEmail(e.target.value);
                    }}
                />
            </div>
            <span className="admin-form-label">Batch Code:</span>
            <input
                required
                type="text"
                value={userBatchCode}
                onChange={(e) => {
                    setUserBatchCode(e.target.value);
                }}
            />
            <button onSubmit={handleSubmit} className="add-user-btn bold">
                + ADD
            </button>
        </form>
    );
}
function BulkAddUsers() {
    const [file, setFile] = useState();
    const [userJSONData, setUserJSONData] = useState([]);
    const fileUploadHandler = () => {
        document.querySelector("#files1").click();
    };
    useEffect(() => {
        // console.log(file);
        file?.text()
            .then((csvData) => {
                // console.log("csvData", csvData);
                const jsonData = CSV2JSON(csvData);
                // console.log("jsonData", jsonData);
                // console.log("isValidJSON", isValidUserJSON(jsonData));
                if (isValidUserJSON(jsonData)) {
                    setUserJSONData(jsonData);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }, [file]);
    const handleSubmit = () => {
        if (userJSONData.length < 1) {
            alert("CSV file missing or invalid");
            return;
        }
        register(userJSONData)
            .then((resp) => {
                alert(resp.data);
            })
            .catch((e) => {
                console.error(e);
            });
    };
    return (
        <div className="admin-form">
            <h4>Bulk Add Users</h4>
            {file ? (
                <h5 style={{ cursor: "default" }} className={`font-orange bold d-flex align-items-center justify-content-between`}>
                    <span className="csv-file">
                        <BsFileEarmarkCheck size={32} className="file-icon" />
                        {file?.name}
                    </span>
                    <span className="csv-cancel">
                        <MdCancel style={{ cursor: "pointer" }} color="red" size={30} onClick={() => setFile()} />
                    </span>
                </h5>
            ) : null}
            {file ? null : (
                <button className="upload-user-btn bold" onClick={fileUploadHandler}>
                    <input
                        id="files1"
                        type="file"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                    />
                    + UPLOAD .CSV
                </button>
            )}
            <div className="hidden-comment1">
                <div>The .CSV File should be structured as follows:</div>
                <div>Column 0: Name </div>
                <div>Column 1: Email </div>
                <div>Column 2: Role </div>
                <div>Column 3: Batch Code (if type is student)</div>
            </div>
            <button className="add-user-btn bold" onClick={handleSubmit}>
                + ADD
            </button>
        </div>
    );
}
function RemoveUser() {
    const [userEmail, setUserEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        disable([userEmail])
            .then((resp) => {
                alert(resp.data);
            })
            .catch((e) => {
                console.error(e);
            });
    };
    return (
        <div className="admin-form">
            <form  onSubmit={handleSubmit}>
                <h4>Disable A User</h4>
                <div>
                    <span className="admin-form-label">User Email:</span>
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => {
                            setUserEmail(e.target.value);
                        }}
                    />
                </div>
                <button onSubmit={handleSubmit} className="remove-user-btn bold">
                    REMOVE
                </button>
            </form>
        </div>
    );
}

// function RemoveMultipleUser() {
//     const [file, setFile] = useState([]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//     };
//     const fileUploadHandler = () => {
//         document.querySelector("#files2").click();
//     };
//     return (
//         <form className="admin-form" onSubmit={handleSubmit}>
//             <h4>Bulk Disable User</h4>

//             {file.map((item, idx) => {
//                 return (
//                     <h5 key={idx} style={{ cursor: "default" }} className={`font-orange bold d-flex align-items-center justify-content-between`}>
//                         <span className="csv-file">
//                             <BsFileEarmarkCheck size={32} className="file-icon" />
//                             {item.name}
//                         </span>
//                         <span className="csv-cancel">
//                             <MdCancel style={{ cursor: "pointer" }} color="red" size={30} onClick={() => setFile([])} />
//                         </span>
//                     </h5>
//                 );
//             })}
//             {file.length ? null : (
//                 <button className="upload-user-btn upload-user-btn2 bold" onClick={fileUploadHandler}>
//                     <input
//                         id="files2"
//                         type="file"
//                         onChange={(e) => {
//                             setFile(Array.from(e.target.files || []));
//                         }}
//                     />
//                     + UPLOAD .CSV
//                 </button>
//             )}
//             <div className="hidden-comment2">
//                 <div>The .CSV File should be structured as follows:</div>
//                 <div> Column 0: Email </div>
//             </div>
//             <button onSubmit={handleSubmit} className="remove-user-btn bold">
//                 REMOVE
//             </button>
//         </form>
//     );
// }
function AdminForms() {
    return (
        <div className="admin-forms">
            <AddUser />
            <BulkAddUsers />
            <RemoveUser />
        </div>
    );
}

export default AdminForms;
