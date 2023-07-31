import React, { useEffect, useState } from 'react';
import * as Bootstrap from 'react-bootstrap';
import baseUrl from '../../../../data/URLpaths';
import myFetch from '../../../../functions/myFetch';
import SignUpModalFooter from './SignUpModalFooter';
import SuccessAlert from './SuccessAlert';
import DismissibleAlert from '../../../Alert';
import Checkbox from './Checkbox';
import postFetch from '../../../../functions/postFetch';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';
import Row4 from './Row4';

const modalSection = 'bgColor-primary border-0';
const emptyFormFields = { firstName: '', lastName: '', email: '', password: '', retypedPassword: '' };
const signUpUrl = `${baseUrl}/signUp`;

export default function SignUpModal({ show, setShow, setShowLogin, setLoggedIn }) {
    const [fields, setFields] = useState(emptyFormFields);
    const [savedEmails, setSavedEmails] = useState({});
    const [takenEmail, setTakenEmail] = useState(false);
    const [validated, setValidated] = useState(false);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [successfulSubmit, setSuccessfulSubmit] = useState(false);
    const [showError, setShowError] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const { firstName, lastName, email, password, retypedPassword } = fields;

    useEffect(() => { myFetch(signUpUrl, setSavedEmails)}, []);

    const setField = (fieldKeyAsString, value) => setFields({ ...fields, [fieldKeyAsString]: value });
    const isObjectEmpty = (obj) => Object.keys(obj).length === 0;
    const handleClose = () => setShow(false);
    const clearFields = () => setFields(emptyFormFields);
    const handleOpenLogin = () => {
        handleClose();
        setShowLogin(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAttemptedSubmit(true);
        setValidated(true);
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return;
        }
        if (isObjectEmpty(savedEmails)) {
            setShowError(true);
            return;
        }
        const emailAlreadyExists = savedEmails.some(obj => obj.email === email);
        if (emailAlreadyExists) {
            setTakenEmail(<span className='text-danger ps-3 '>Email is already taken</span>);
            return;
        }
        // Sign up requirements met:
        postFetch(signUpUrl, fields);
        clearFields();
        handleClose();
        setLoggedIn(fields);
        setSuccessfulSubmit(true);
    };

    return (<>
            <Bootstrap.Modal show={show} onHide={handleClose}>
                <Bootstrap.Modal.Header closeButton className={modalSection}>
                    <Bootstrap.Modal.Title>Create an Account</Bootstrap.Modal.Title>
                </Bootstrap.Modal.Header>
                <DismissibleAlert heading='Error' text='No Access To The Server' show={showError} setShow={setShowError} />
                <Bootstrap.Modal.Footer className={modalSection}>
                    <Bootstrap.Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row1 firstName={firstName} lastName={lastName} setField={setField} />
                        <Row2 email={email} takenEmail={takenEmail} setField={setField} />
                        <Row3 password={password} attemptedSubmit={attemptedSubmit} setField={setField} retypedPassword={retypedPassword} setPasswordMatch={setPasswordMatch} />
                        <Row4 retypedPassword={retypedPassword} validated={validated} setField={setField} password={password} passwordMatch={passwordMatch} setPasswordMatch={setPasswordMatch} attemptedSubmit={attemptedSubmit} />
                        <Checkbox handleClose={handleClose} />
                        <SignUpModalFooter handleClose={handleClose} handleOpenLogin={handleOpenLogin} />
                    </Bootstrap.Form>
                </Bootstrap.Modal.Footer>
            </Bootstrap.Modal>
            <SuccessAlert name={`${firstName} ${lastName}`} show={successfulSubmit} hide={() => setSuccessfulSubmit(false)} />
        </>);
}
