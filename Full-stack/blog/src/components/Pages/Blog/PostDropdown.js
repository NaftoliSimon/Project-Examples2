import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { BsThreeDotsVertical } from 'react-icons/bs'

export default function PostDropdown({ setShowEditPost }) {
    return (
        <Dropdown>
            <Dropdown.Toggle className='float-end position-relative p-0 m-0 dropdown-toggle' > {/*variant="" removes default react bootstrap color (bootstrap primary) */}
                <BsThreeDotsVertical size={20} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item className='dropdown' onClick={() => setShowEditPost(true)}>Edit</Dropdown.Item>
                <Dropdown.Item className='dropdown' >Delete</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
