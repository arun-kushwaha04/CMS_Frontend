import React from "react";
import { ResponsiveLine } from "@nivo/line";
import "./LineGraph.scss";

const LineGraph2 = (props) => {
    return (
        <div className="line-graph-container">
            <h2>Students Assignments Trend</h2>
            <ResponsiveLine
                data={props.data}
                margin={{ top: 50, right: 40, bottom: 100, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: "0", max:'100', reverse: false }}
                yFormat=" >-.2f"
                curve="monotoneX"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Assignments",
                    legendOffset: 40,
                    legendPosition: "middle",
                }}
                axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Marks ( % )",
                    legendOffset: -40,
                    legendPosition: "middle",
                }}
                colors={[`darkgray`,props.theme]}
                pointSize={10}
                pointColor={{ from: "color", modifiers: [] }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                enablePointLabel={true}
                pointLabelYOffset={-12}
                // enableCrosshair={true}
                areaBaselineValue={0}
                areaOpacity={0.3}
                useMesh={true}
                motionConfig="default"
                enableSlices='x'
                enableArea={true}
            />
        </div>
    );
};

export default LineGraph2;
