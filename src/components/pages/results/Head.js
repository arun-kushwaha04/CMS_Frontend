import React from "react";
import { GoGraph } from "react-icons/go";
import { useHistory } from "react-router";
import ResultDropdown from "./ResultDropdown";

const Head = (props) => {
    const history = useHistory();
    return (
        <div className={`head-container bg-${props.theme}`}>
            <span>
                <strong>Results:</strong>
            </span>
            <span>
                <strong>
                    <ResultDropdown theme={props.theme} active={props.active} list={props.list} />
                </strong>
            </span>
            {props.graphLink ? (
                <strong>
                    <GoGraph onClick={() => history.push(props.graphLink)} className={`graph font-${props.theme}`} size={32} />
                </strong>
            ) : null}
        </div>
    );
};

export default Head;
