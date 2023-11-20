import React from "react";
import { useNavigate } from 'react-router-dom';
export default function CheckoutSuccess() {

    const navigate = useNavigate()

    return (
        <React.Fragment>
            <div className="page-container">
                
                <div className="page-container">
                    <div className="row">

                        <div className="mx-auto col-md-4 mt-3">
                            <h1 className="text-center page-title-large">Order Confirmed</h1>

                            <div className="mt-3">
                                    <p className="m-0 text-center page-subtitle">Thank you for shopping with us!</p>
                            </div>
                            <div className="d-grid mt-5 mx-auto">
                                <button className="btn shop-btn rounded-0" onClick={()=>navigate('/')}>Return to Home</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

           
        </React.Fragment>
    )
}