import React, { useState } from 'react';
import AddBlogModal from '../BlogList/AddBlogModal';
import { Card } from 'react-bootstrap';
import ExternalLink from '../../ExternalLink';

export default function SelectedBlog({ selectedBlog, loggedIn }) {
    const [show, setShow] = useState(null); //show update blog modal
    const { name, website, companyName, shortSummary, userId } = selectedBlog;

    let visibility = loggedIn && userId === loggedIn.userId ? 'visible' : 'invisible';
    const editInfoToggleStyle = `link text-decoration-none link-color fs-6 pointer p-0 m-0 ${visibility}`
    const editInfoModal = <AddBlogModal show={show} setShow={setShow} loggedIn={loggedIn} savedUpdateData={{ website, companyName, shortSummary }} />;
    const editInfoToggle = <div className={editInfoToggleStyle} onClick={() => setShow(true)} >Edit Your Info</div>
    return (<>
        <Card className='m-5 shadow'>
            <Card.Body>
                <div className={`h3 text-center block p-2 bgColor-primaryLight color-primary-reverse bg-transparent`}>
                    {editInfoToggle}
                    <span className='d-block display-1'>{name}</span>
                    <span className='d-block p-1'>{companyName}</span>
                    <span className='d-block' >
                        <ExternalLink link={addHttps(website)} text={website}/>
                    </span>
                    <p className='mt-1'>{shortSummary}</p> {/*shortSummary displays here in full. It displays in the bloglist Card with up to five lines which is about 250 character. The server as of writing this comment is set to 350 characters.*/}

                    {editInfoModal}
                </div>
            </Card.Body>
        </Card>
    </>)
}

function addHttps(str) {
    const h = 'https://';
    if (!str.startsWith(h)) {
        str = `${h}${str}`
    }
    return str;
}