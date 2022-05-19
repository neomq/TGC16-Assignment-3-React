import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const BASE_URL = "https://essential-oils-store.herokuapp.com"
// const BASE_URL = "https://8080-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"

export default function Profile() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        // check if user is logged in
        if (localStorage.getItem("id") !== null) {
            const fetchProfile = async () => {
                let response = await axios.get(BASE_URL + "/api/users/profile", {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem('accessToken')
                    }
                })
                
                setName(response.data.name)
                setEmail(response.data.email)
                setAddress(response.data.address)
    
                console.log("USER PROFILE", response.data)
            }
            fetchProfile();
            setLoggedIn(true)
        }
    }, [])

    // logout
    const logout = async () => {
        const response = await axios.post(BASE_URL + "/api/users/logout", {
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

                        <div className="d-grid mt-5 mx-auto">
                            <a className="btn shop-btn rounded-0" href="/products" type="button">Start Shopping</a>
                        </div>
                        <p className="mt-3 text-center page-subtitle">or <Link onClick={logout} to="/">Log out</Link></p>
                    </div>

                </div>
            </div>
            : null}
        </React.Fragment>

    )
}