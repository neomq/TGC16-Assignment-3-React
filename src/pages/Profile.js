import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { pages } from "../constants/common"
import { getUserProfile } from "../utils/API"
import { endAuth } from "../utils/auth"
import PageHeader from "../components/PageHeader"

export default function Profile({ setUser }) {
    
    const [userData, setUserData] = useState({})
    const { name, email, address } = userData
    const navigate = useNavigate()

    useEffect(() => {
        fetchProfile()
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
            <PageHeader title={`Welcome, ${name}`} />
            <div className="page-container">
                <div>
                    <div className="mx-auto mt-5" style={{ maxWidth: "350px" }}>
                        <div className="profile-section my-3">
                            <p className="section-title text-center">Account Information</p>
                            <div className="my-5">
                                <p className="m-0 text-center profile-details-name">{name}</p>
                                <p className="m-0 text-center profile-details">{email}</p>
                                <p className="m-0 text-center profile-details">{address}</p>
                            </div>
                        </div>

                       <hr></hr>
                       <div className="mt-5 d-flex flex-column justify-content-center">
                            <button className="btn shop-btn px-5 text-uppercase" onClick={()=>navigate(pages.products)}>Start Shopping</button>
                            <button className="card-btn btn mt-3 text-uppercase" type="button" onClick={endAuth}>Log out</button>
                        </div> 
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}