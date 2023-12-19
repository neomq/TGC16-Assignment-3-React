import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import Preloader from "../components/Preloader"
import Feature from "../components/Home/Feature"

export default function Home({ setLoading }) {

    const [showLoader, setShowLoader] = useState(true)
    const navigate = useNavigate()

    window.onload = (event) => {
        setShowLoader(false)
        setLoading(false)
    }
    
    return (
        <div>
            {showLoader && <Preloader/>}
            <div className="bg position-relative">
                    <div className="header-content position-absolute">
                        <div className="cta d-flex flex-column position-absolute top-50 start-50 translate-middle">
                            <p className="cta m-0 title text-center">Essential Oils For Your Mind & Body</p>
                            <p className="cta mt-4 short-text text-center text-white">Elevate your everyday with the power of nature's essence.</p>
                            <button className="shop-btn btn mx-auto mt-3 text-uppercase" onClick={()=>navigate('/products')}>Shop now</button>
                        </div>
                    </div>
            </div>
            <Feature />
        </div>
    )
}