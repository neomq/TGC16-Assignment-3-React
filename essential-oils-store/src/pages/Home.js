import React from "react";
import { BsArrowRight } from "react-icons/bs";
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
                            <h1 className="cta title text-center col-md-6 mx-auto">Essential Oils for Your Mind & Body</h1>
                            <p className="cta my-3 short-text text-center col-md-6 mx-auto">The secret to long lasting mental & physical health</p>
                            <a className="mt-4 cta-btn btn col-lg-3 mx-auto p-3 px-4 rounded-0" href="/products" role="button">SHOP NOW <span className="fs-5"><BsArrowRight/></span></a>
                        </div>
                    </div>
            </div>  
        </React.Fragment>

    )
}