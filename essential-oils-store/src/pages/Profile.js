import React, { useEffect, useState } from "react";
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


    return (
        <React.Fragment>
            <h1>My Profile</h1>
            <h4>Account Information</h4>
            <p>{name}</p>
            <p>{email}</p>
            <p>Log Out</p>
        </React.Fragment>

    )
}