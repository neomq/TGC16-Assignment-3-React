import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
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

                navigate('/welcome', {
                    'state': {
                        'formData': formState
                    }
                })
        }
    }

    return (
        <React.Fragment>
            <h1>Sign Up</h1>
            <Form>
                <Form.Control type="text" name="username" value={formState.username} onChange={updateFormField} placeholder="Your Name" autoComplete="off" />
                {invalidName === true ? <Form.Text style={{color: 'red'}}>Please enter a valid username.</Form.Text>:null}

                <Form.Control type="email" name="email" value={formState.email} onChange={updateFormField} placeholder="Enter email" />
                {invalidEmail === true ? <Form.Text style={{color: 'red'}}>Please enter a valid email</Form.Text>:null}

                <Form.Control type="text" name="address" value={formState.address} onChange={updateFormField} placeholder="Enter address" />
                {invalidAddress === true ? <Form.Text style={{color: 'red'}}>Please enter a valid address</Form.Text>:null}

                <Form.Control type="password" name="password" value={formState.password} onChange={updateFormField} placeholder="Password" />
                {invalidPassword === true ? <Form.Text style={{color: 'red'}}>Your password must be 8-20 characters long.</Form.Text>:<Form.Text className="text-muted">Please set a password that is at least 8-20 characters long and contain letters and numbers</Form.Text>}

                <Form.Control type="password" name="confirm_password" value={formState.confirm_password} onChange={updateFormField} placeholder="Confirm Password" />
                {invalidConfirmPassword === true ? <Form.Text style={{color: 'red'}}>Passwords do not match.</Form.Text>:null}
            </Form>
            <Button variant="primary" onClick={register}>Sign Up</Button>
            
        </React.Fragment>
    )

}