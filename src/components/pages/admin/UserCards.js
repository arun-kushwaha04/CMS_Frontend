import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FcApproval } from "react-icons/fc";
import { FaUserEdit } from "react-icons/fa";
import { getAllBatchCodes, getUserList, updateUser } from "../../../axios/admin";
import ToggleSwitch from "./toggle-switch/ToggleSwitch";
import noSearchIMG from "../../../images/no-search/no-search.png";
import { validateEmail } from "../../../helper";
import { useSelector } from "react-redux";

const BatchCodeDropdown = ({ batchCodes, activeRole, setActiveRole }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic" className="admin-form-drop-btn role-dropdown">
                {activeRole}
            </Dropdown.Toggle>
            <Dropdown.Menu className="drop-menu">
                {batchCodes.map((item, idx) => (
                    <Dropdown.Item
                        className="drop-item"
                        key={idx}
                        onClick={() => {
                            setActiveRole(item);
                        }}
                    >
                        {item}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

const UserCard = ({ details, batchCodes }) => {
    const [toggleEdit, setToggleEdit] = useState(false);
    const [user, setUser] = useState(details);
    const [status, setStatus] = useState(details.status.toLowerCase() === "active");
    const [activeRole, setActiveRole] = useState(details.batchCode);
    const adminUser = useSelector((state) => state.user);

    const handleSubmit = (status) => {
        if (user.name.length < 1 || !validateEmail(user.email)) {
            alert("Fill all details.");
            return;
        }
        let data = { ...user, status: status ? "active" : "inactive", batchCode: activeRole };
        updateUser(data)
            .then((resp) => {
                console.log(resp.data);
                setToggleEdit(false);
            })
            .catch((e) => {
                console.error(e);
                setToggleEdit(false);
            });
    };

    useEffect(() => {
        setToggleEdit(false);
        setUser(details);
        setActiveRole(details.batchCode);
        setStatus(details.status.toLowerCase() === "active")
    }, [details]);

    return (
        <div className="user-card">
            <div className="user-card-data">
                <div className="user-data-row">
                    <span>
                        User:
                        <input
                            disabled={!toggleEdit}
                            type="text"
                            required
                            className="user-edit-input"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            style={user.name.length === 0 ? { borderColor: "red" } : {}}
                        />
                    </span>
                </div>
                <div className="user-data-row">
                    <span>
                        Email:
                        <input
                            disabled={!toggleEdit}
                            type="email"
                            required
                            className="user-edit-input"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            style={user.email.length === 0 ? { borderColor: "red" } : {}}
                        />
                    </span>
                </div>
                {user.role.toLowerCase() !== "student" ? null : (
                    <div className="user-data-row">
                        {toggleEdit ? (
                            <span>
                                Batch:
                                <BatchCodeDropdown batchCodes={batchCodes} activeRole={activeRole} setActiveRole={setActiveRole} />
                            </span>
                        ) : (
                            <span>Batch: {user.batchCode}</span>
                        )}
                    </div>
                )}
                <div className="user-data-row">
                    <span>Role: {user.role}</span>
                </div>
            </div>
            <div className="user-card-rightcolumn">
                {toggleEdit ? (
                    <FcApproval style={{ margin: "0px" }} className="user-edit-icon" onClick={() => handleSubmit(status)} />
                ) : (
                    <FaUserEdit style={{ margin: "0px" }} className="user-edit-icon" onClick={() => setToggleEdit(true)} />
                )}
                <ToggleSwitch state={status} setState={setStatus} onStateChange={(newStatus) => handleSubmit(newStatus)} disabled={adminUser.email.toLowerCase() === user.email.toLowerCase()} />
            </div>
        </div>
    );
};

const list = ["Teacher", "Student", "Admin"];
function UserCards() {
    const [activeRole, setActiveRole] = useState(list[0]);
    const [batch, setBatch] = useState("");
    const [batchCodes, setbatchCodes] = useState([]);
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        getAllBatchCodes()
            .then((resp) => {
                setBatch(resp.data.length ? resp.data[0] : "");
                setbatchCodes(resp.data || []);
            })
            .catch((e) => console.error(e));
    }, []);

    useEffect(() => {
        getUserList({ role: activeRole.toLowerCase(), batchCode: batch })
            .then((resp) => {
                // console.log(resp);
                setUserList(resp.data);
            })
            .catch((e) => console.error(e));
    }, [activeRole, batch, batchCodes]);

    return (
        <div className="user-cards-container">
            <div className="admin-toprow">
                <div>
                    <span className="admin-select-role">
                        Role:
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" className="admin-form-drop-btn role-dropdown">
                                {activeRole}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="drop-menu">
                                {list.map((item, idx) => (
                                    <Dropdown.Item
                                        className="drop-item"
                                        key={idx}
                                        onClick={() => {
                                            setActiveRole(item);
                                        }}
                                    >
                                        {item}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </span>
                    {activeRole.toLowerCase() !== "student" ? null : (
                        <span className="admin-select-batch">
                            Batch:
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic" className="admin-form-drop-btn role-dropdown">
                                    {batch}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="drop-menu">
                                    {batchCodes.map((item, idx) => (
                                        <Dropdown.Item
                                            className="drop-item"
                                            key={idx}
                                            onClick={() => {
                                                setBatch(item);
                                            }}
                                        >
                                            {item}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </span>
                    )}
                </div>
                <h4>
                    <strong>Total Users: {userList.length}</strong>
                </h4>
            </div>
            {userList.length < 1 ? (
                <>
                    <img src={noSearchIMG} alt="no-search-found" /> <div className="no-results-found">No Results found</div>
                </>
            ) : null}
            <div className="user-cards">
                {userList.map((user, idx) => (
                    <UserCard key={idx} details={user} batchCodes={batchCodes} />
                ))}
            </div>
        </div>
    );
}

export default UserCards;
