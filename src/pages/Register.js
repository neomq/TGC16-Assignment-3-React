import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { useState } from "react"
import axios from 'axios'

const BASE_URL = "https://essential-oils-store.herokuapp.com"
// const BASE_URL = "https://8080-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"

export default function Register() {

    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        'username': '',
        'email': '',
        'address': '',
        'password': '',
        'confirm_password': ''
    })
    // form validation
    const [invalidName, setinvalidName] = useState(false)
    const [invalidEmail, setinvalidEmail] = useState(false)
    const [invalidAddress, setinvalidAddress] = useState(false)
    const [invalidPassword, setinvalidPassword] = useState(false)
    const [invalidConfirmPassword, setinvalidConfirmPassword] = useState(false)

    const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const register = async () => {
        // validation
        let errorCount = 0
        if (formState.username === "") {
            setinvalidName(true)
            errorCount += 1
        }
        if (formState.email === "" || !formState.email.includes('@') || !formState.email.includes('.') ) {
            setinvalidEmail(true)
            errorCount += 1
        }
        if (formState.address === "") {
            setinvalidAddress(true)
            errorCount += 1
        }
        if (formState.password === "" || formState.password.length < 8 || formState.password.length > 20) {
            setinvalidPassword(true)
            errorCount += 1
        }
        if (formState.password !== formState.confirm_password) {
            setinvalidConfirmPassword(true)
            errorCount += 1
        }

        if (errorCount === 0){
                const response = await axios.post(BASE_URL + '/api/users/register', formState)
                console.log("New user created", response.data)

                alert("account created!")

                navigate('/login')
        }
    }

    return (
        <React.Fragment>

                <div className="page-container">
                    <div className="row">
                    <div className="form mx-auto col-md-4 mt-4">
                        <h1 className="text-center page-title-large">Register</h1>
                        <p className="text-center page-subtitle">Please fill in the information below.</p>
                            <Form className="register-form my-4">
                                <Form.Control type="text" name="username" value={formState.username} onChange={updateFormField} className="form-input bg-transparent rounded-0" placeholder="Your Name" autoComplete="off" />
                                {invalidName === true ? <Form.Text style={{color: 'red'}}>Please enter a valid username.</Form.Text>:null}

                                <Form.Control type="email" name="email" value={formState.email} onChange={updateFormField} className="form-input bg-transparent rounded-0 mt-3" placeholder="Enter email" />
                                {invalidEmail === true ? <Form.Text style={{color: 'red'}}>Please enter a valid email</Form.Text>:null}

                                <Form.Control type="text" name="address" value={formState.address} onChange={updateFormField} className="form-input bg-transparent rounded-0 mt-3" placeholder="Enter address" />
                                {invalidAddress === true ? <Form.Text style={{color: 'red'}}>Please enter a valid address</Form.Text>:null}

                                <Form.Control type="password" name="password" value={formState.password} onChange={updateFormField} className="form-input bg-transparent rounded-0 mt-3" placeholder="Password" />
                                {invalidPassword === true ? <Form.Text style={{color: 'red'}}>Your password must be 8-20 characters long.</Form.Text>:<Form.Text>Please set a password that is at least 8-20 characters long.</Form.Text>}

                                <Form.Control type="password" name="confirm_password" value={formState.confirm_password} onChange={updateFormField} className="form-input bg-transparent rounded-0 mt-3" placeholder="Confirm Password" />
                                {invalidConfirmPassword === true ? <Form.Text style={{color: 'red'}}>Passwords do not match.</Form.Text>:null}

                                <div className="d-grid mt-4">
                                    <button className="rounded-0 py-2 signin-btn" type="button" onClick={register}>CREATE ACCOUNT</button>
                                    {/* <Button variant="primary" onClick={register}>Create Account</Button> */}
                                </div>
                            </Form>

                            <p className="mt-4 text-center page-subtitle">Already our customer? <Link to="/login">Sign in here.</Link></p>

                    </div>
                        
                    </div>
                </div>
        </React.Fragment>
    )

}