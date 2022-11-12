import React, { useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import "./LineGraph.scss";
import Modal from "../../../common/modal/Modal"
import { emailToRNo } from "../../../../helper";

const LineGraph = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [modalDetails, setModalDetails] = useState({});
    const handleOnClick = (details) => {
        const { data } = details;
        setOpenModal(true);
        setModalDetails(data);
    };
    return (
        <div className="line-graph-container">
            <h2>Students Average Marks Trend</h2>
            <Modal open={openModal} setOpen={setOpenModal}>
                <div>
                    <strong>Class Rank:</strong> {parseInt(modalDetails.xFormatted)}
                </div>
                <div>
                    <strong>Name:</strong> {modalDetails.name}
                </div>
                <div>
                    <strong>Roll Number:</strong> {emailToRNo(modalDetails.email || "")}
                </div>
                <div>
                    <strong>Average Marks (%):</strong> {modalDetails.yFormatted}
                </div>
            </Modal>
            <ResponsiveLine
                data={props.data}
                margin={{ top: 50, right: 30, bottom: 100, left: 60 }}
                xScale={{ type: "linear", min: "auto" }}
                yScale={{ type: "linear", min: "0", max: "100", stacked: true, reverse: false }}
                yFormat=" >-.2f"
                curve="monotoneX"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Class students",
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
                // enableSlices='x'
                colors={props.theme || 'rgb(241, 194, 72)'}
                pointSize={10}
                pointColor={{ from: "color", modifiers: [] }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                enablePointLabel={true}
                pointLabelYOffset={-12}
                enableCrosshair={false}
                enableArea={true}
                areaBaselineValue={0}
                areaOpacity={0.3}
                useMesh={true}
                legends={[]}
                motionConfig="default"
                pointSymbol={(e) => {
                    if (e.datum.highlight) {
                        return <circle cx="0" cy="0" r="5" stroke="black" strokeWidth="2" fill="white" />;
                    }
                    return <circle cx="0" cy="0" r="4" stroke={e.color} strokeWidth="2" fill="white" />;
                }}
                onClick={handleOnClick}
            />
        </div>
    );
};

export default LineGraph;
