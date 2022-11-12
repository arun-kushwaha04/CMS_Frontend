import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { withStyles } from "react-jss";
import  "./ResetPassword.scss";
import { handleResetpassword } from "../../../axios/handleSession";

const alertStyles = () => ({
    "@keyframes slideRight": {
        from: {
            opacity: 0,
            transform: "translateX(-10px) scale(0.98)",
        },
        to: {
            opacity: 1,
            transform: "translateX(0px) scale(1)",
        },
    },
    alert: {
        animation: "$slideRight ease-in 0.3s",
        padding: "20px",
        background: (props) => {
            if (!props.type) return "#fff0f3";
            if (props.type === "success") return "#a7f3d0";
        },
        borderLeft: (props) => {
            if (!props.type) return "5px solid #FFB3C0";
            if (props.type === "success") return "5px solid #A7F3D0";
        },
        borderRadius: "4px",
        fontSize: ".875rem",
        margin: "10px 0px",
        color: "#000",
    },
    success: {
        background: "#fafffa",
        borderLeft: "5px solid #d4ffb3",
    },
    title: {
        fontWeight: 700,
    },
    link: {
        cursor: "pointer",
    },
});

function Alert(props) {
    const classes = props.classes;
    return (
        <>
            <div className={classes.alert}>
                <summary className={classes.title}>{props.title}</summary>
                {props.children}
            </div>
        </>
    );
}
Alert = withStyles(alertStyles)(Alert);

const ResetPassword = () => {
    const { accessToken } = useParams();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrors(["Passwords not matching!"]);
            return;
        }
        setErrors([]);
        try {
            const data = {accessToken,newPassword};
            await handleResetpassword(data);
            setSuccess(true);
            setTimeout(function(){ window.location.replace("/")}, 2000);
        } catch (e) {
            console.error(e)
            setErrors([e.error]);
        }
    };

    return (
        <div className='reset-password-body'>
            <div className='forgot-pass-card'>
                <form onSubmit={handleSubmit}>
                    <h2 className="title"> Reset Password</h2>
                    {success ? (
                        <Alert title="Successfully changed your password..." type='success'/>
                    ) : null}

                    {errors.length ? (
                        <Alert title="Failed to reset">
                            {errors.map((err) => (
                                <div>{err}</div>
                            ))}
                        </Alert>
                    ) : null}
                    <hr />
                    <div className="email-login">
                        <label for="email">
                            {" "}
                            <b>New Password</b>
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <label for="psw">
                            <b>Confirm Password</b>
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button onSubmit={handleSubmit} className="cta-btn">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
