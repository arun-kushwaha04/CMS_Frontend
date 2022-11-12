import React from 'react'
import './NoData.scss'
import img from '../../../images/no-data/no-data.jpg'

const NoData = () => {
    return (
        <div className='no-data'>
            <img src={img} alt='no-data'/>
        </div>
    )
}

export default NoData
