import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useHistory } from 'react-router';

const ResultDropdown = ({list=[],active,...props}) => {
    const history = useHistory();
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" className={`font-${props.theme} drop-btn`}>
                    {active}
                </Dropdown.Toggle>

                <Dropdown.Menu className='drop-menu'>
                    {
                        list.map((item,idx)=><Dropdown.Item className='drop-item' key={idx} onClick={()=>history.push(item.href)}>{item.name}</Dropdown.Item>)
                    }
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default ResultDropdown
