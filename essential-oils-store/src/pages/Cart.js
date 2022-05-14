import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const BASE_URL = "https://essential-oils-store.herokuapp.com"
// const BASE_URL = "https://3000-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"


export default function Cart() {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        // check if user is logged in
        if (localStorage.getItem("id") !== null) {
            // get all cart items
            let user_id = localStorage.getItem("id")
            const fetch = async () => {
                const response = await axios.get(BASE_URL + "/api/cart/" + user_id)
                setCartItems(response.data)
                console.log("CART:",response.data)
            }
            fetch()
        } else {
            // direct user to login
        }
    }, [])

    return (
        <React.Fragment>
            <h1>My Shopping Cart</h1>

            <div className="cart-heading text-center bg-light py-3">
                <div className="row">
                    <div className="col-md-5">Item</div>
                    <div className="d-none d-md-block col">
                        <div className="row">
                            <div className="col-md-4">Quantity</div>
                            <div className="col-md-3">Total</div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="cart-body">
                {cartItems.map((c, idx) => (
                    <div className="cart-item">
                        <div className=" d-flex align-items-center text-start text-md-center row">
                            <div className="col-md-5 col-12">
                                <div className="d-flex align-items-center">
                                    <img src={c.products.image} width="80px" alt="..." />
                                    <div className="text-start">
                                        <strong>{c.products.essentialoil.name}</strong>
                                        <div className="text-muted text-sm">{c.products.size.size}</div>
                                    </div>
                                    <div className="d-md-none text-center col-2"><AiOutlineClose /></div>
                                </div>
                            </div>

                            <div className="mt-2 mt-md-0 col-md-7 col-12">
                                <div className="align-items-center row">
                                    <div className="col-md-4">
                                        <div className="row">
                                            <div className="d-md-none text-muted col-6">Quantity</div>
                                            <div className="text-end text-md-center col-md-12 col-6">{c.item_quantity}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="d-md-none text-muted col-6">Sub total</div>
                                            <div className="text-end text-md-center col-md-12 col-6">{c.sub_total}</div>
                                        </div>
                                    </div>
                                    <div className="d-none d-md-block text-center col-2"><AiOutlineClose /></div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
            
            {/* Order Summary */}
            <div className="bg-light">
                <div>
                    <div>
                        <h6>Order Summary</h6>
                    </div>
                    <div className="pt-1">
                        <ul className="mb-0">
                            <li><span>Order Subtotal </span><span>$</span></li>
                            <li><span>Shipping and handling </span><span>FREE</span></li>
                            <li><span>Order Total </span><strong>$</strong></li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </React.Fragment>

    )
}