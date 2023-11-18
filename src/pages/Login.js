import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
import API from '../constants/API';
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export default function Login({ setLoggedIn }) {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [unableToLogin, setUnableToLogin] = useState(false)

    const navigate = useNavigate();
    
    async function login() {

        //validation
        if (!email || !password){
            setUnableToLogin(true)
        } else {
            const response = await axios.post(BASE_URL + API.LOGIN, {
                'email': email,
                'password': password
            })

            if (response.status === 200) {
                localStorage.setItem("accessToken", response.data.accessToken)
                localStorage.setItem('refreshToken', response.data.refreshToken)
                localStorage.setItem('id', response.data.user_id)
            
                setLoggedIn(true)
                navigate('/profile')
                
            } else if (response.status === 204) {
                setUnableToLogin(true)
            }
        }

    }

    return (
        <React.Fragment>

            <div className="bg">
                <div className="login header-content">
                    <div className="page-overlay d-flex justify-content-center align-items-center">
                        <div className="cta mx-5 w-100 login d-flex flex-column shadow-lg">
                            <h1 className="text-center page-title-large">Welcome</h1>
                            <p className="text-center page-subtitle">Please login with your account details.</p>
                            <Form className="my-4">

                                <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" className="form-input bg-transparent rounded-0" placeholder="Email" />
                                {unableToLogin === true ? <Form.Text style={{ color: 'red' }}>Invalid email. Please try again.</Form.Text> : null}
                                <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input bg-transparent rounded-0 mt-3" placeholder="Password" />
                                {unableToLogin === true ? <Form.Text style={{ color: 'red' }}>Invalid password. Please try again.</Form.Text> : null}

                                <div className="d-grid mt-4">
                                    <button className="signin-btn text-uppercase" type="button" onClick={login}>Login</button>
                                </div>

                            </Form>
                            <hr></hr>
                            <p className="mt-3 text-center page-subtitle">Not our registered customer?</p>
                            <div className="d-grid">
                                <button className="card-btn btn text-uppercase" type="button" onClick={()=>{navigate('/register')}}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>

    )
}