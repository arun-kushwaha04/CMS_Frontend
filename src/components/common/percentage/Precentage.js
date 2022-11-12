import React from 'react'
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Animation
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

const Precentage = ({ percentage, width,...props }) => {
    return (
        <div style={{ width: `${width}`, color: 'green' }}>
            <AnimatedProgressProvider
                valueStart={0}
                valueEnd={percentage}
                duration={.9}
                easingFunction={easeQuadInOut}
            >
                {value => {
                    const roundedValue = Math.round(value);
                    return (
                        <CircularProgressbar
                            value={value}
                            text={`${roundedValue}%`}
                            /* This is important to include, because if you're fully managing the
                      animation yourself, you'll want to disable the CSS animation. */
                            styles={buildStyles({ pathTransition: "none",pathColor:`${props.color}`,textColor:`${props.color}` })}
                        />
                    );
                }}
            </AnimatedProgressProvider>
        </div>
    )
}

export default Precentage
