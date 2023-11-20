import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

    const inputClass = "form-input bg-transparent rounded-0 "
    const errorClass = unableToLogin ? "error" : ""

    return (
        <React.Fragment>
            <div className="bg">
                <div className="login header-content">
                    <div className="page-overlay d-flex justify-content-center align-items-center">
                        <div className="cta mx-4 w-100 login d-flex flex-column shadow-lg">
                            <h1 className="text-center page-title-large">Welcome</h1>
                            <p className="text-center page-subtitle m-0">Login with your account details.</p>
                            <Form className="my-4">

                                <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" className={inputClass + errorClass} placeholder="Email" />
                                {unableToLogin && <Form.Text className="form-error">An error has occured. Please try again.</Form.Text>}
                                
                                <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className={"mt-3 " + inputClass + errorClass} placeholder="Password" />
                                {unableToLogin && <Form.Text className="form-error">An error has occured. Please try again.</Form.Text>}

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