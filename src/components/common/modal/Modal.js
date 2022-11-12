import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import FileAtt from "../fileAtt/FileAtt";
import "./Modal.scss";

const createFormState = (form) => {
    let state = {};
    for (let i = 0; i < form.length; i++) {
        state[form[i].name] = "";
    }
    return state;
};

const TextInput = (props) => {
    const [input, setInput] = useState("");
    return (
        <div className="form-input">
            {input.length ? <h6>{props.input.name}</h6> : null}
            <input
                min={0}
                required
                type={props.input.type.toLowerCase()}
                placeholder={props.input.name}
                value={input}
                onChange={(e) => {
                    props.setForm((old) => {
                        let newForm = old;
                        newForm[props.input.name] = e.target.value;
                        return newForm;
                    });
                    setInput(e.target.value);
                }}
            />
        </div>
    );
};

const TextArea = (props) => {
    const [input, setInput] = useState("");
    return (
        <div className="form-input">
            {input.length ? <h6>{props.input.name}</h6> : null}
            <textarea
                placeholder={props.input.name}
                rows={6}
                value={input}
                onChange={(e) => {
                    props.setForm((old) => {
                        let newForm = old;
                        newForm[props.input.name] = e.target.value;
                        return newForm;
                    });
                    setInput(e.target.value);
                }}
            />
        </div>
    );
};

const FileInput = (props) => {
    const [file, setFile] = useState([]);
    const fileUploadHandler = () => {
        document.querySelector("#files").click();
    };
    return (
        <>
            <div style={file.length ? { minHeight: "93px" } : {}} className="selected-files">
                {file.map((file, key) => {
                    return <FileAtt fileData={file.name} key={key} />;
                })}
            </div>
            <div className="form-input file-input" onClick={fileUploadHandler}>
                <h6>ATTACH FILES</h6>
                <div className="file-upload-icon">
                    <AiOutlineCloudUpload />
                </div>
                <input
                    id="files"
                    type="file"
                    placeholder={props.input.name}
                    multiple
                    onChange={(e) => {
                        props.setForm((old) => {
                            let newForm = old;
                            newForm[props.input.name] = Array.from(e.target.files || []);
                            return newForm;
                        });
                        setFile(Array.from(e.target.files || []));
                    }}
                />
            </div>
        </>
    );
};

//props = {form,buttonName,theme,handleSubmit,heading,setopen}
const Modal = ({ options, setOpen, ...props }) => {
    const [form, setForm] = useState(createFormState(options?.form ? options.form : []));
    const closeOnOverlayClick = (e) => {
        if (e.target.classList[0] === "overlay") {
            setOpen(false);
        }
    };
    return !props.open ? (
        <></>
    ) : (
        <div className="overlay" onClick={closeOnOverlayClick}>
            <form
                className="modal-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    try {
                        options.handleSubmit(form);
                    } catch (error) {
                        console.warn(error);
                    }
                }}
            >
                <h2>{options?.heading}</h2>
                {options?.form?.map((item, idx) => {
                    if (item.type.toLowerCase() === "textarea") return <TextArea setForm={setForm} input={item} key={idx} />;
                    else if (item.type.toLowerCase() === "file") return <FileInput setForm={setForm} input={item} key={idx} />;
                    return <TextInput setForm={setForm} input={item} key={idx} />;
                })}
                {props.children}
                {!options?.buttonName ? null : (
                    <button
                        className={`bg-${options?.theme}`}
                        onSubmit={(e) => {
                            e.preventDefault();
                            try {
                                options.handleSubmit(form);
                            } catch (error) {
                                console.warn(error);
                            }
                        }}
                    >
                        {options?.buttonName}
                    </button>
                )}
                <div className="formclose-btn">
                    <GrFormClose onClick={() => setOpen(false)} />
                </div>
            </form>
        </div>
    );
};

export default Modal;
