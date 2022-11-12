import "./PeopleModal.scss";
import React from "react";
import Modal from "../../../common/modal/Modal";
import { emailToRNo } from "../../../../helper";

const PeopleModal = ({ people, showPeople, setShowPeople, theme }) => {
    const teacher = people.filter((p) => p.role.toLowerCase() === "teacher");
    const assistants = people.filter((p) => p.role.toLowerCase() === "assistant");
    const students = people.filter((p) => p.role.toLowerCase() === "student");
    return (
        <Modal setOpen={setShowPeople} open={showPeople}>
            <div className="class-teachers">
                <h4>Teacher</h4>
                <div className="teachers-list">
                    {teacher.map((p, key) => {
                        return (
                            <div key={key} className="person">
                                <div className={`avatar bg-${theme}`}>{p.name[0]}</div>
                                <div className="name">{p.name}</div>
                            </div>
                        );
                    })}
                </div>
                <br />
                {assistants.length ? assistants.length === 1 ? <h4>Assistant</h4> : <h4>Assistants</h4> : null}
                <div className="teachers-list">
                    {assistants.map((p, key) => {
                        return (
                            <div key={key} className="person">
                                <div className={`avatar bg-${theme}`}>{p.name[0]}</div>
                                <div className="name">{p.name}</div>
                            </div>
                        );
                    })}
                </div>
                <br />
                <h4>Students</h4>
                <div className="teachers-list">
                    {students.map((p, key) => {
                        return (
                            <div key={key} className="person">
                                <div className={`avatar bg-${theme}`}>{p.name[0]}</div>
                                <div className="name">
                                    {p.name} &bull; {emailToRNo(p.email)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Modal>
    );
};

export default PeopleModal;
