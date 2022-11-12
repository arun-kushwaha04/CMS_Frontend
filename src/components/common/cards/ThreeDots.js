import React, { useMemo, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { unrollStudentFromClassroom, addStudentToClassroom, removeStudentFromClassroom, addAssistantToClassroom, removeAssistantFromClassroom } from "../../../axios/classroom";
import { removeFromClassroom } from "../../../redux/actions/enrolledClassrooms";
import { removeClassroomTheme } from "../../../redux/actions/theme";
import "./Card.scss";
import Modal from "../modal/Modal";

const ThreeDots = (props) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { details } = props;
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState(0);

    const list = useMemo(() => {
        if (user.role.toLowerCase() === "student")
            return [
                {
                    title: "Unroll",
                    handler: () => {
                        const classID = details._id;
                        unrollStudentFromClassroom({ classID })
                            .then((resp) => {
                                dispatch(removeFromClassroom(classID));
                                dispatch(removeClassroomTheme(classID));
                                alert(resp.data);
                                window.location.replace("/");
                            })
                            .catch((e) => {
                                console.error(e);
                                alert(e.error);
                            });
                    },
                },
            ];
        return [
            {
                title: "Add Student",
                handler: () => {
                    setOpenModal(true);
                    setModalType(1);
                },
            },
            {
                title: "Add Assistant",
                handler: () => {
                    setOpenModal(true);
                    setModalType(2);
                },
            },
            {
                title: "Remove Student",
                handler: () => {
                    setOpenModal(true);
                    setModalType(3);
                },
            },
            {
                title: "Remove Assistant",
                handler: () => {
                    setOpenModal(true);
                    setModalType(4);
                },
            },
        ];
    }, [user, details, dispatch]);

    const addStudentHandler = (data) => {
        console.log("Add Student handler");
        addStudentToClassroom({ classID: details._id, email: data["Email"] })
            .then((resp) => {
                // console.log(resp);
                alert(resp.data);
            })
            .catch((e) => {
                console.error(e);
                alert(e.error);
            });
        setOpenModal(false);
    };
    const addAssistantHandler = (data) => {
        console.log("Add Assistant handler");
        addAssistantToClassroom({ classID: details._id, email: data["Email"] })
            .then((resp) => {
                // console.log(resp);
                alert(resp.data);
            })
            .catch((e) => {
                console.error(e);
                alert(e.error);
            });
        setOpenModal(false);
    };
    const removeStudentHandler = (data) => {
        console.log("Remove Student handler");
        removeStudentFromClassroom({ classID: details._id, email: data["Email"] })
            .then((resp) => {
                // console.log(resp);
                alert(resp.data);
            })
            .catch((e) => {
                console.error(e);
                alert(e.message);
            });
        setOpenModal(false);
    };
    const removeAssistantHandler = (data) => {
        console.log("Remove Assistant handler");
        removeAssistantFromClassroom({ classID: details._id, email: data["Email"] })
            .then((resp) => {
                // console.log(resp);
                alert(resp.data);
            })
            .catch((e) => {
                console.error(e);
                alert(e.message);
            });
        setOpenModal(false);
    };

    const modalOptions = (num) => {
        switch (num) {
            case 1: {
                return {
                    form: [
                        {
                            name: "Email",
                            type: "email",
                        },
                    ],
                    theme: props.theme,
                    buttonName: "Add",
                    heading: "Classroom: Add Student",
                    handleSubmit: addStudentHandler,
                };
            }
            case 2: {
                return {
                    form: [
                        {
                            name: "Email",
                            type: "email",
                        },
                    ],
                    theme: props.theme,
                    buttonName: "Add",
                    heading: "Classroom: Add Assistant",
                    handleSubmit: addAssistantHandler,
                };
            }
            case 3: {
                return {
                    form: [
                        {
                            name: "Email",
                            type: "email",
                        },
                    ],
                    theme: props.theme,
                    buttonName: "Remove",
                    heading: "Classroom: Remove Student",
                    handleSubmit: removeStudentHandler,
                };
            }
            case 4: {
                return {
                    form: [
                        {
                            name: "Email",
                            type: "email",
                        },
                    ],
                    theme: props.theme,
                    buttonName: "Remove",
                    heading: "Classroom: Remove Assistant",
                    handleSubmit: removeAssistantHandler,
                };
            }
            default:
                return {
                    form: [
                        {
                            name: "Email",
                            type: "email",
                        },
                    ],
                    theme: props.theme,
                };
        }
    };
    return (
        <div className="dropdown">
            <Modal options={modalOptions(modalType)} open={openModal} setOpen={setOpenModal} />
            <button className="dropbtn" onClick={() => setOpen(!open)}>
                {!open ? <BiDotsVerticalRounded size={30} /> : <AiFillCloseCircle size={30} />}
            </button>
            <div className="dropdown-content" style={open ? { display: "block" } : {}}>
                {list.map((item, idx) => (
                    <span
                        key={idx}
                        onClick={async () => {
                            await item.handler();
                            setOpen(false);
                        }}
                    >
                        {item.title}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ThreeDots;
