import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { pages } from "../constants/common"
import { getUserProfile } from "../utils/API"
import { endAuth } from "../utils/auth"

export default function Profile({ loggedIn, setUser }) {
    
    const [userData, setUserData] = useState({})
    const { name, email, address } = userData
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {        
            fetchProfile()
        }
    }, [])

    const fetchProfile = async () => {
        const token = localStorage.getItem('accessToken')
        const profileData = await getUserProfile(token)

        if (profileData.status === 200) {
            setUserData(profileData.data)
            setUser(profileData.data)
        }
    }

    return (
        <React.Fragment>
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
                            <button className="btn shop-btn px-5 rounded-0" onClick={()=>navigate(pages.products)}>Start Shopping</button>
                        </div>
                        <p className="mt-3 text-center page-subtitle">or <Link onClick={endAuth}>Log out</Link></p>
                    </div>

                </div>
            </div>
        </React.Fragment>

    )
}