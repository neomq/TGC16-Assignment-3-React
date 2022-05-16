import React from "react";
// import { Link } from "react-router-dom";
export default function CheckoutSuccess() {

    return (
        <React.Fragment>
            <div className="page-container">
                <div>
                    <h1>Order Confirmed</h1>
                    <p>Thank you for shopping with us</p>
                </div>
                <a class="btn btn-primary" href="/" role="button">Return to Home</a>
            </div>
        </React.Fragment>
    )
}