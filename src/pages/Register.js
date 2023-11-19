import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { useState } from "react"
import API from '../constants/API';
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export default function Register() {

    const clearForm = {
        'username': '',
        'email': '',
        'address': '',
        'password': '',
        'confirm_password': ''
    }

    const navigate = useNavigate();
    const [formState, setFormState] = useState(clearForm)
    const [createPassword, setCreatePassword] = useState(false)
    const [formError, setFormError] = useState({})
    
    const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const registerInfo = () => {

        setFormError({})
        let errorItems = {}

        if (formState.username === "") {
            errorItems["invalidName"] = true
        }
        if (formState.email === "" || !formState.email.includes('@') || !formState.email.includes('.') ) {
            errorItems["invalidEmail"] = true
        }
        if (formState.address === "") {
            errorItems["invalidAddress"] = true
        }
        
        if (Object.keys(errorItems).length > 0) {
            setFormError(errorItems)
        } else {
            setCreatePassword(true)
        }
    }

    const register = async () => {

        setFormError({})
        let errorItems = {}

        if (formState.password === "" || formState.password.length < 8 || formState.password.length > 20) {
            errorItems["invalidPassword"] = true
        }
        if (formState.password !== formState.confirm_password) {
            errorItems["invalidConfirmPassword"] = true
        }

        if (Object.keys(errorItems).length > 0) {
            setFormError(errorItems)
        } else {
            const response = await axios.post(BASE_URL + API.REGISTER, formState)
            console.log("New user created", response.data)
            alert("account created!")
            navigate('/login')
        }
    }

    const cancel = () => {
        setCreatePassword(false)
        setFormState(clearForm)
        setFormError({})
    }

    const inputClass = "form-input bg-transparent rounded-0 "
    const nameErrorClass = formError.invalidName ? "error" : ""
    const emailErrorClass = formError.invalidEmail ? "error" : ""
    const addErrorClass = formError.invalidAddress ? "error" : ""
    const pwErrorClass = formError.invalidPassword ? "error" : ""
    const cfmPwErrorClass = formError.invalidConfirmPassword ? "error" : ""

    const renderInfoForm = () => (
        <Fragment>
            <Form.Control type="text" name="username" value={formState.username} onChange={updateFormField} className={inputClass + nameErrorClass} placeholder="Your Name" autoComplete="off" />
            {formError.invalidName && <Form.Text className="form-error" style={{ color: '#E91630' }}>Please enter a valid username.</Form.Text>}

            <Form.Control type="email" name="email" value={formState.email} onChange={updateFormField} className={"mt-3 " + inputClass + emailErrorClass} placeholder="Your Email" />
            {formError.invalidEmail && <Form.Text className="form-error" style={{ color: '#E91630' }}>Please enter a valid email</Form.Text>}

            <Form.Control type="text" name="address" value={formState.address} autoComplete="off" onChange={updateFormField} className={"mt-3 " + inputClass + addErrorClass} placeholder="Your Address" />
            {formError.invalidAddress && <Form.Text className="form-error" style={{ color: '#E91630' }}>Please enter a valid address</Form.Text>}

            <div className="d-grid mt-4">
                <button className="signin-btn text-uppercase" type="button" onClick={registerInfo}>next</button>
            </div>
        </Fragment>
    )

    const renderCreatePasswordForm = () => (
        <Fragment>
            <Form.Control type="password" name="password" value={formState.password} onChange={updateFormField} className={inputClass + pwErrorClass} placeholder="Create Password" />
            {formError.invalidPassword && <Form.Text className="form-error" style={{ color: 'red' }}>Your password must be 8-20 characters long.</Form.Text>}

            <Form.Control type="password" name="confirm_password" value={formState.confirm_password} onChange={updateFormField} className={"mt-3 " + inputClass + cfmPwErrorClass} placeholder="Confirm Password" />
            {formError.invalidConfirmPassword && <Form.Text className="form-error" style={{ color: 'red' }}>Passwords do not match.</Form.Text>}

            <div className="d-grid mt-4">
                <button className="signin-btn text-uppercase" type="button" onClick={register}>register</button>
                <button className="card-btn btn text-uppercase mt-3" type="button" onClick={cancel}>Cancel</button>
            </div>
        </Fragment>
    )

    return (
        <React.Fragment>
            <div className="bg">
                <div className="login header-content">
                    <div className="page-overlay d-flex justify-content-center align-items-center">
                        <div className="cta mx-4 w-100 login d-flex flex-column shadow-lg">
                            <h1 className="text-center page-title-large">Register</h1>
                            <p className="text-center page-subtitle m-0">{createPassword ? `Hello ${formState.username}, create your password below.` : "Enter your details."}</p>
                            <Form className="register-form my-4">
                                {createPassword ? renderCreatePasswordForm() : renderInfoForm()}
                            </Form>
                            <hr></hr>
                            <p className="mt-3 text-center page-subtitle">Already registered?</p>
                            <div className="d-grid">
                                <button className="card-btn btn text-uppercase" type="button" onClick={()=>{navigate('/login')}}>Login here</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}