import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL
// const BASE_URL = "https://8080-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"

export default function Login({ setLoggedIn }) {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [unableToLogin, setUnableToLogin] = useState(false)

    const navigate = useNavigate();
    
    async function login() {

        console.log("email", email)
        console.log("password", password)

        //validation
        if (!email || !password){
            setUnableToLogin(true)
        } else {
            const response = await axios.post(BASE_URL + "/api/users/login/", {
                'email': email,
                'password': password
            })

            console.log("signing in", response.data)

            if (response.status === 200) {
                localStorage.setItem("accessToken", response.data.accessToken)
                localStorage.setItem('refreshToken', response.data.refreshToken)
                localStorage.setItem('id', response.data.user_id)
                // alert("logged in!")
                setLoggedIn(true)
                navigate('/profile') //re-direct to profile  
                
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
                                <button className="card-btn text-uppercase" type="button" onClick={()=>{navigate('/register')}}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Link to="/register">Register here.</Link> */}
            
            {/* <div className="page-container">
                <div className="row">
                    <div className="form mx-auto col-md-4 mt-4">
                        <h1 className="text-center page-title-large">Sign In</h1>
                        <p className="text-center page-subtitle">Sign in with your email and password.</p>
                        <Form className="my-4">
                            
                            <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" className="form-input bg-transparent rounded-0" placeholder="Email" />
                            {unableToLogin === true ? <Form.Text style={{color: 'red'}}>Invalid email. Please try again.</Form.Text>:null}
                            <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input bg-transparent rounded-0 mt-3" placeholder="Password" />
                            {unableToLogin === true ? <Form.Text style={{color: 'red'}}>Invalid password. Please try again.</Form.Text>:null}
                            
                            <div className="d-grid mt-4">
                                <button className="rounded-0 py-2 signin-btn" type="button" onClick={login}>SIGN IN</button>
                            </div>
                            
                        </Form>
                        <p className="mt-4 text-center page-subtitle">Not our registered customer? <Link to="/register">Register here.</Link></p>
                    </div>
                </div>
            </div> */}
        
        </React.Fragment>

    )
}