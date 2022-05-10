import React, { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate} from "react-router-dom";
import axios from 'axios'

// const BASE_URL = "https://essential-oils-store.herokuapp.com"
const BASE_URL = "https://3000-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [unableToLogin, setUnableToLogin] = useState(false)

    const navigate = useNavigate();

    async function login() {
        const response = await axios.post(BASE_URL + "/api/users/login/", {
            'email': email,
            'password': password
        })

        console.log(response.data)

        if (response.status === 200) {
           
            localStorage.setItem("accessToken", response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            localStorage.setItem('id', response.data.id)
            navigate('/') //re-direct to home page

        } else if (response.status === 204) {
            setUnableToLogin(true)
        }
    }

    return (
        <React.Fragment>
            <h1>Login</h1>
            <Form>
                <p>Login to your account</p>
                <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

                <Alert variant="danger"
                    style={{ display: unableToLogin === true ? "block" : "none"}}>
                    Your password is incorrect or this account doesn't exist. Please try again.
                </Alert>

                <Button variant="primary" onClick={login}>Login</Button>
            </Form>
        </React.Fragment>

    )
}