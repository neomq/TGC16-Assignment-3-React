import React from "react";

export default function Home() {
    
   
    return (
        <React.Fragment>
            <div className="bg position-relative">
                    <div className="header-content position-absolute">
                        <div className="cta d-flex flex-column position-absolute top-50 start-50 translate-middle">
                            <h1 className="cta m-0 title text-center">Essential Oils for Your Mind & Body</h1>
                            <a className="shop-btn btn mx-auto mt-5 rounded-0" href="/products" role="button">SHOP NOW</a>
                        </div>
                    </div>
            </div>

        </React.Fragment>

    )
}