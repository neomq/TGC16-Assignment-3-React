import React, { Fragment, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form } from 'react-bootstrap'
import { REGISTER_ERROR } from "../constants/error"
import { placeholder } from "../constants/constants"
import TextInput from "../components/TextInput"
import API from '../constants/API'
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
    const [formState, setFormState] = useState(clearForm)
    const [createPassword, setCreatePassword] = useState(false)
    const [formError, setFormError] = useState({})
    const navigate = useNavigate()

    // Validation
    const isValidName = formState.username.length > 0
    const isValidEmail = formState.email.length > 4 && formState.email.includes('@') && formState.email.includes('.')
    const isValidAddress = formState.address.length > 0
    const isValidPassword = formState.password > 0 && formState.password.length > 8 && formState.password.length < 20
    const passwordNotMatched = formState.password !== formState.confirm_password

    // error messages
    const { 
        INVALID_NAME,
        INVALID_EMAIL,
        INVALID_ADDRESS,
        INVALID_PW,
        INVALID_PW_MATCH,
    } = REGISTER_ERROR

    // Functions
    const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const registerInfo = () => {
        setFormError({})
        let errorItems = {}

        if (!isValidName) { errorItems[INVALID_NAME.errorTitle] = INVALID_NAME }
        if (!isValidEmail) { errorItems[INVALID_EMAIL.errorTitle] = INVALID_EMAIL }
        if (!isValidAddress) { errorItems[INVALID_ADDRESS.errorTitle] = INVALID_ADDRESS }
        
        if (Object.keys(errorItems).length > 0) {
            setFormError(errorItems)
        } else {
            setCreatePassword(true)
        }
    }

    const createAccount = async () => {
        setFormError({})
        let errorItems = {}

        if (!isValidPassword) { errorItems[INVALID_PW.errorTitle] = INVALID_PW }
        if (passwordNotMatched) { errorItems[INVALID_PW_MATCH.errorTitle] = INVALID_PW_MATCH }

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
    const nameErrorClass = formError.INVALID_NAME ? "error" : ""
    const emailErrorClass = formError.INVALID_EMAIL ? "error" : ""
    const addErrorClass = formError.INVALID_ADDRESS ? "error" : ""
    const pwErrorClass = formError.INVALID_PW ? "error" : ""
    const cfmPwErrorClass = formError.INVALID_PW_MATCH ? "error" : ""

    const personalInfoForm = () => (
        <Fragment>
            <TextInput 
                type="text"
                name="username"
                value={formState.username}
                onChange={updateFormField}
                className={inputClass + nameErrorClass}
                placeholder={placeholder.name}
                errorState={formError?.INVALID_NAME}
                errorMessage={formError?.INVALID_NAME?.errorMessage}
            />
            <TextInput
                type="email"
                name="email"
                value={formState.email}
                onChange={updateFormField}
                className={"mt-3 " + inputClass + emailErrorClass}
                placeholder={placeholder.email}
                errorState={formError?.INVALID_EMAIL}
                errorMessage={formError?.INVALID_EMAIL?.errorMessage}
            />
            <TextInput
                type="text"
                name="address"
                value={formState.address}
                onChange={updateFormField}
                className={"mt-3 " + inputClass + addErrorClass}
                placeholder={placeholder.address}
                errorState={formError?.INVALID_ADDRESS}
                errorMessage={formError?.INVALID_ADDRESS?.errorMessage}
            />
            <div className="d-grid mt-4">
                <button className="signin-btn text-uppercase" type="button" onClick={registerInfo}>next</button>
            </div>
        </Fragment>
    )

    const createPasswordForm = () => (
        <Fragment>
            <TextInput
                type="password"
                name="password"
                value={formState.password}
                onChange={updateFormField}
                className={inputClass + pwErrorClass}
                placeholder={placeholder.create_pw}
                errorState={formError?.INVALID_PW}
                errorMessage={formError?.INVALID_PW?.errorMessage}
            />
            <TextInput
                type="password"
                name="confirm_password"
                value={formState.confirm_password}
                onChange={updateFormField}
                className={"mt-3 " + inputClass + cfmPwErrorClass}
                placeholder={placeholder.confirm_pw}
                errorState={formError?.INVALID_PW_MATCH}
                errorMessage={formError?.INVALID_PW_MATCH?.errorMessage}
            />
            <div className="d-grid mt-4">
                <button className="signin-btn text-uppercase" type="button" onClick={createAccount}>register</button>
                <button className="card-btn btn text-uppercase mt-3" type="button" onClick={cancel}>Cancel</button>
            </div>
        </Fragment>
    )

    return (
        <React.Fragment>
            <div className="login-page bg">
                <div className="login header-content">
                    <div className="page-overlay d-flex justify-content-center">
                        <div className="cta login mx-4 w-100 d-flex flex-column shadow-lg">
                            <p className="text-center page-title-large mb-2">Register</p>
                            <p className="text-center page-subtitle mb-1">{createPassword ? `Hello ${formState.username}, create your password below.` : "Enter your details."}</p>
                            <Form className="register-form my-4">
                                {createPassword ? createPasswordForm() : personalInfoForm()}
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