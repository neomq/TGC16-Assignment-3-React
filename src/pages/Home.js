import React, { Fragment } from "react";
import { featuredContent } from "../constants"

export default function Home() {
    
   
    return (
        <Fragment>
            <div className="bg position-relative">
                    <div className="header-content position-absolute">
                        <div className="cta d-flex flex-column position-absolute top-50 start-50 translate-middle">
                            <h1 className="cta m-0 title text-center">Essential Oils for Your Mind & Body</h1>
                            <p className="cta mt-4 short-text text-center text-white">Elevate your everyday with the power of nature's essence.</p>
                            <a className="shop-btn btn mx-auto mt-3 text-uppercase" href="/products" role="button">Shop now</a>
                        </div>
                    </div>
            </div>
            <div className="section">
                <div className="section-content m-auto">
                    <div className="section-header mt-5">
                        <p className="section-title mb-1 text-center">Explore Essential Oils</p>
                        <p className="section-subtitle pb-2 text-center">&#x2022; Indulge Your Senses, Elevate Your Well-being &#x2022;</p>
                    </div>
                    <div className="section-body row row-cols-1 row-cols-md-3 g-4 mt-4 m-auto">
                        {/* card */}
                        {featuredContent.map((item, index) => (
                            <div class="col">
                                <div className="card h-100" key={index}>
                                    <div className="card-body">
                                        <p className="card-label m-0">{item.label}</p>
                                        <h5 className="card-title mt-2 mb-0">{item.title}</h5>
                                    </div>
                                    <img src={item.image} class="card-img-top rounded-0" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text mt-0 mb-4 pb-2">{item.description}</p>
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