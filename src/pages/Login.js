import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Alert } from 'react-bootstrap';
import axios from 'axios'

const BASE_URL = "https://essential-oils-store.herokuapp.com"
// const BASE_URL = "https://8080-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"

export default function Login() {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [unableToLogin, setUnableToLogin] = useState(false)

    const navigate = useNavigate();
    
    async function login() {

        console.log(email)
        console.log(password)
        const response = await axios.post(BASE_URL + "/api/users/login/", {
            'email': email,
            'password': password
        })

        console.log(response.data)

        if (response.status === 200) {
            localStorage.setItem("accessToken", response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            localStorage.setItem('id', response.data.user_id)
            alert("logged in!")
            navigate('/profile') //re-direct to profile  
            
        } else if (response.status === 204) {
            setUnableToLogin(true)
        }
    }

    return (
        <React.Fragment>
            
            <div className="page-container">
                <div className="row">
                    <div className="form mx-auto col-md-4 mt-4">
                        <h1 className="text-center page-title-large">Sign In</h1>
                        <p className="text-center page-subtitle">Sign in with your email and password.</p>
                        <Form className="my-4">
                            
                            <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input bg-transparent rounded-0" placeholder="Email" />
                            <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input bg-transparent rounded-0 mt-3" placeholder="Password" />

                            <Alert variant="danger"
                                style={{ display: unableToLogin === true ? "block" : "none" }}>
                                Your password is incorrect or this account doesn't exist. Please try again.
                            </Alert>
                            
                            <div className="d-grid mt-4">
                                <button className="rounded-0 py-2 signin-btn" type="button" onClick={login}>SIGN IN</button>
                            </div>
                            
                        </Form>
                        <p className="mt-4 text-center page-subtitle">Not our registered customer? <Link to="/register">Register here.</Link></p>
                    </div>
                </div>
            </div>
        
        </React.Fragment>

    )
}