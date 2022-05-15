import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const BASE_URL = "https://essential-oils-store.herokuapp.com"
// const BASE_URL = "https://8080-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"

export default function Profile() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        const fetchProfile = async () => {
            let response = await axios.get(BASE_URL + "/api/users/profile", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            })

            setName(response.data.name)
            setEmail(response.data.email)

            console.log("USER PROFILE", response.data)
        }
        fetchProfile();
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
            <h1>My Profile</h1>
            <h4>Account Information</h4>
            <p>{name}</p>
            <p>{email}</p>
            <Link onClick={logout} to="/"><button type="button" class="btn btn-dark">Log Out</button></Link>
        </React.Fragment>

    )
}