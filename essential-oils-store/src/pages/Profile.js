import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const BASE_URL = "https://essential-oils-store.herokuapp.com"
// const BASE_URL = "https://8080-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"

export default function Profile() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")

    useEffect(() => {
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

            <div className="page-container">

            <div className="row">
                <div className="mx-auto col-md-5 mt-4">
                <h1 className="text-center page-title-large">Welcome, {name}!</h1>

                    <div className="profile-section mt-3">
                        <p className="section-title text-center">Account Information</p>
                        <p className="m-0 text-center">{name}</p>
                        <p className="m-0 text-center">{email}</p>
                        <p className="m-0 text-center">{address}</p>
                        <p></p>
                    </div>
                    
                    <Link onClick={logout} to="/"><button type="button" class="btn btn-dark">Log Out</button></Link>
                </div>
            </div>
                
            </div>
            
        </React.Fragment>

    )
}