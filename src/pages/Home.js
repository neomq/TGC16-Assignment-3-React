import React from "react";
// import axios from 'axios';
// import { Carousel } from 'react-bootstrap';

// const BASE_URL = "https://essential-oils-store.herokuapp.com"
// const BASE_URL = "https://8080-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"

export default function Home() {
    
   
    return (
        <React.Fragment>
            <div className="bg position-relative">
                    <div className="header-content position-absolute">
                        <div className="cta d-flex flex-column position-absolute w-75 top-50 start-50 translate-middle">
                            
                            <p className="cta py-3 short-text text-center col-md-6 mx-auto">The secret to healthy living</p>
                            <h1 className="cta title text-center py-3 col-md-6 mx-auto">Essential Oils for Your Mind & Body</h1>
                            <a className="mt-4 shop-btn btn mx-auto py-2 px-5 rounded-0" href="/products" role="button">SHOP NOW</a>
                        </div>
                    </div>
            </div>

        </React.Fragment>

    )
}