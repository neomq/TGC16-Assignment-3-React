import React from "react"
import { useNavigate } from 'react-router-dom'
import { pages } from '../constants/common'
import { endAuth } from "../utils/auth"
import PageHeader from '../components/PageHeader'

export default function CheckoutSuccess() {

    const navigate = useNavigate()

    return (
        <React.Fragment>
            <PageHeader title="Order Confirmed" />
            <div className="page-container">
                <div>
                    <div className="mx-auto mt-5" style={{ maxWidth: "360px" }}>
                        <h1 className="text-center page-title-large">Thank You For Your Order!</h1>
                        <div className="mt-4 mb-5">
                            <p className="m-0 text-center body-text">Your order has been placed and we will prepare it for shipment soon! In the meantime, you can check the status of your order anytime in your account. Thank you for shopping with us!</p>
                        </div>
                        <hr></hr>
                        <div className="mt-5 d-flex flex-column justify-content-center">
                            <button className="btn shop-btn px-5 text-uppercase" onClick={() => navigate(pages.home)}>Return to Home</button>
                            <button className="card-btn btn mt-3 text-uppercase" type="button" onClick={endAuth}>Log out</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}