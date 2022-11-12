import React from 'react'
import Precentage from '../../common/percentage/Precentage'

const AverageSection = ({marks,theme}) => {
    return (
        <div className='result-percentage'>
            <div className='d-flex flex-column'>
                <span><strong>Total Marks:</strong></span>
                <span style={{fontSize:'25px'}}><strong className={`font-${theme}`}>{marks.yourMarks}</strong>/{marks.maxMarks}</span>
            </div>
            <div className='d-flex flex-column align-items-center'>
                <span className='text-nowrap'><strong>Your Average:</strong></span>
                <Precentage percentage={marks.yourAverage} width={'4.5rem'} color='rgb(20, 204, 20)' />
            </div>
            <div className='d-flex flex-column align-items-center'>
                <span className='text-nowrap'><strong>Class Average:</strong></span>
                <Precentage percentage={marks.classAverage} width={'4.5rem'} color='rgb(20, 204, 20)' />
            </div>
        </div>
    )
}

export default AverageSection
