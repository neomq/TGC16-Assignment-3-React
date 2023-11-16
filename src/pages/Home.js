import React, { Fragment, useEffect, useRef } from "react";
import { featuredContent } from "../constants/constants"

export default function Home({ setBannerHeight }) {
    const mainBannerRef = useRef(null)
    
    useEffect(() => {
        setBannerHeight(mainBannerRef.current.clientHeight)
    })
    
    return (
        <Fragment>
            <div className="bg position-relative" ref={mainBannerRef}>
                    <div className="header-content position-absolute">
                        <div className="cta d-flex flex-column position-absolute top-50 start-50 translate-middle">
                            <p className="cta m-0 title text-center">Essential Oils For Your Mind & Body</p>
                            <p className="cta mt-4 short-text text-center text-white">Elevate your everyday with the power of nature's essence.</p>
                            <a className="shop-btn btn mx-auto mt-3 text-uppercase" href="/products" role="button">Shop now</a>
                        </div>
                    </div>
            </div>
            <div className="section">
                <div className="section-content">
                    <div className="section-header px-2 w-75 m-auto">
                        <p className="section-title mb-1 text-center">Explore Essential Oils</p>
                        <p className="section-subtitle pb-2 text-center">Transform your home into a sanctuary of serenity with our premium essential oils, crafted to enhance both mental clarity and physical vitality.</p>
                    </div>
                    <div className="section-body row row-cols-1 row-cols-md-3 g-3 mt-4 mb-5 m-auto">
                        {/* card */}
                        {featuredContent.map((item, index) => (
                            <div className="col" key={index}>
                                <div className="card h-100">
                                    <div className="card-body header" style={{
                                        backgroundImage: `url(${item.image})`,
                                    }}>
                                        <div className="pb-5" >
                                            <p className="card-label m-0 text-uppercase text-white">{item.label}</p>
                                            <h5 className="card-title text-white m-0 mt-3">{item.title}</h5>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text m-0 pb-4">{item.description}</p>
                                        <button type="button" className="btn card-btn text-uppercase">{item.button}</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}