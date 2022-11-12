import React from 'react';
import './ToggleSwitch.scss'

const ToggleSwitch = ({state, setState,onStateChange,disabled = false}) => {
    const handleChange = async() => {
        await onStateChange(!state);
        setState(!state);
    };
    return (
        <>
            <label className="switch">
                <input type="checkbox" checked={state} onClick={handleChange} disabled={disabled}/>
                <span className="slider round"></span>
            </label>
        </>
    );
}
export default ToggleSwitch;