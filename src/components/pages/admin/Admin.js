import React from "react";
import "./Admin.scss";
import AdminForms from "./AdminForms";
import UserCards from "./UserCards";

const Admin = () => {
    return (
        <div className="admin-container">
            <AdminForms />
            <UserCards />
        </div>
    );
};

export default Admin;
