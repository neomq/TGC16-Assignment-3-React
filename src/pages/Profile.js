import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from '../constants/API';
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export default function Profile({ loggedIn, setLoggedIn, setUser }) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        // check if user is logged in
        if (localStorage.getItem("id") !== null) {
            const fetchProfile = async () => {
                let response = await axios.get(BASE_URL + API.PROFILE, {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem('accessToken')
                    }
                })
                
                setName(response.data.name)
                setEmail(response.data.email)
                setAddress(response.data.address)
                setUser(response.data)
                console.log("USER PROFILE", response.data)
            }
            fetchProfile()
            setLoggedIn(true)
        }
    }, [])

    // logout
    const logout = async () => {
        const response = await axios.post(BASE_URL + API.LOGOUT, {
            'refreshToken': localStorage.getItem('refreshToken')
        })

        if (response.data) {
            localStorage.clear()
        }
    }

    return (
        <React.Fragment>
            {loggedIn === true ?
            <div className="page-container">
                <div className="row">

                    <div className="mx-auto col-md-4 mt-4">
                        <h1 className="text-center page-title-large">Welcome,<br/>{name}!</h1>

                        <div className="profile-section mt-3">
                            <p className="section-title text-center">Account Information</p>
                            <div className="mt-5">
                                <p className="m-0 text-center profile-details-name">{name}</p>
                                <p className="m-0 text-center profile-details">{email}</p>
                                <p className="m-0 text-center profile-details">{address}</p>
                            </div>
                        </div>

                        <div className="mt-5 d-flex justify-content-center">
                            <button className="btn shop-btn px-5 rounded-0" onClick={()=>navigate('/products')}>Start Shopping</button>
                        </div>
                        <p className="mt-3 text-center page-subtitle">or <Link onClick={logout} to="/">Log out</Link></p>
                    </div>

                </div>
            </div>
            : null}
        </React.Fragment>

    )
}