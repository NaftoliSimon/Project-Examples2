import React, { useState } from 'react'
import { Col, Form, InputGroup, Row } from 'react-bootstrap'
import { BsLockFill } from 'react-icons/bs'
import InputIcon from './InputIcon';
import Eye from './Eye';

export default function Row3({password, handlePasswordChange, passwordValidated, attemptedSubmit}) {
    //TODO: fix error with retype password where if you match it to an improper password (that doesn't meet written requierments), then if you change the password without changing the retyped password it considers the retyped password valid and submits to the server
    const [passwordVisible, setPasswordVisible] = useState(false);

    const passwordMsg = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."

    const dangerOrSuccess = !passwordValidated ? 'border-danger' : 'border-success';
    const borderColor = attemptedSubmit ? dangerOrSuccess : ''; //if you have not tried to submit border shouldn't be colored, if you have clicked submit border will be either red or green depending on if the password is valid

    return (
        <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationSignUp04" className='mb-4 input-parent'>
                <Form.Label>Password</Form.Label>
                <InputIcon name={'password'} icon={<BsLockFill />} />
                <InputGroup className="mb-3" hasValidation>
                    <Form.Control
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={e => handlePasswordChange(e)}
                        aria-describedby="passwordHelpBlock"
                        className={`inputPadding ${borderColor} password-input`}//rounded-0 rounded-start border-end-0
                    />
                    <Eye setVisible={setPasswordVisible} visible={passwordVisible} />
                </InputGroup>
                <Form.Text type="invalid" className='text-dark password-msg'>
                    {passwordMsg}
                </Form.Text>
            </Form.Group>
        </Row>
    )
}
