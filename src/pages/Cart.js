import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const BASE_URL = "https://essential-oils-store.herokuapp.com"
// const BASE_URL = "https://3000-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"


export default function Cart() {
    const [loggedIn, setLoggedIn] = useState(true)
    const [cartItems, setCartItems] = useState([])
    const [orderTotal, setOrderTotal] = useState(0)

    useEffect(() => {
        // check if user is logged in
        if (localStorage.getItem("id") !== null) {
            // setLoggedIn(true)
            // get all cart items
            // let user_id = localStorage.getItem("id")
            fetch() 
        } else {
            setLoggedIn(false)
        }
    }, [])

    const fetch = async () => {
        let user_id = localStorage.getItem("id")
        const response = await axios.get(BASE_URL + "/api/cart/" + user_id)
        
        let orderSubTotal = 0;
        for (let i of response.data) {
            orderSubTotal += (i.sub_total_sgd * i.item_quantity)
        }
        setOrderTotal(orderSubTotal.toFixed(2))
        setCartItems(response.data)

        console.log("CART:",response.data)
    }

    const deleteCartItem = async (product_id) => {
        let user_id = localStorage.getItem("id")
        await axios.get(BASE_URL + "/api/cart/" + user_id + /remove/ + product_id)
        
        // refresh cart items
        let response = await axios.get(BASE_URL + "/api/cart/" + user_id)
        setCartItems(response.data)

        fetch()
    }

    const decreaseItemQty = async (product_id) => {
        // Get cart item index
        const index = cartItems.findIndex(i => i.product_id === parseInt(product_id))
        
        // Clone the state
        let cloned = [...cartItems]

        // Modify item quantity
        if (cloned[index].item_quantity > 1) {
            cloned[index].item_quantity -= 1;
        }
        // replace the state
        setCartItems(cloned)
        
        let user_id = localStorage.getItem("id")
        await axios.post(BASE_URL + "/api/cart/" + user_id + "/updateQuantity/" + product_id, {
            'newQuantity': cloned[index].item_quantity
        })
        
        fetch()
    }

    const increaseItemQty = async (product_id) => {
        // Get cart item index
        const index = cartItems.findIndex(i => i.product_id === parseInt(product_id))
        
        // Clone the state
        let cloned = [...cartItems]

        // Modify item quantity
        cloned[index].item_quantity += 1
        
        // replace the state
        setCartItems(cloned)
        
        let user_id = localStorage.getItem("id")
        await axios.post(BASE_URL + "/api/cart/" + user_id + "/updateQuantity/" + product_id, {
            'newQuantity': cloned[index].item_quantity
        })

        fetch()
    }

    return (
        <React.Fragment>

            <div className="page-container">
                <div className="row justify-content-center px-md-2">
                    <h1 className="mt-4 mb-0 text-center page-title-large">My Shopping Cart</h1>
                    {loggedIn === true ?
                        <>
                            {cartItems.length !== 0 ?
                                <div className="cart row mt-5">

                                    <div className="col-12 col-md-8">
                                        <div className="cart-heading text-center py-3">
                                            <div className="row">
                                                <div className="col-md-5 table-header">Item</div>
                                                <div className="d-none d-md-block col-7">
                                                    <div className="row">
                                                        <div className="col-md-5 table-header">Quantity</div>
                                                        <div className="col-md-4 table-header">Total</div>
                                                        <div className="col-md-3"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-3 cart-body">
                                            {cartItems.map((c, idx) => (
                                                <div className="cart-item">
                                                    <div className=" d-flex align-items-center text-start text-md-center row">
                                                        <div className="col-md-5 col-12">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <Link to={"/products/" + c.products.id} className="text-decoration-none text-reset">
                                                                    <div className="d-flex align-items-center col-10">
                                                                            <img src={c.products.image} width="100px" alt="..." />
                                                                            <div className="ps-3 text-start">
                                                                                <p className="mb-1 item-title">{c.products.essentialoil.name}</p>
                                                                                <div className="item-subtitle">{c.products.size.size}</div>
                                                                            </div>
                                                                    </div>
                                                                </Link>
                                                                <div className="d-md-none align-self-start text-center col-2" onClick={() => { deleteCartItem(c.product_id) }}>
                                                                    <Button variant="link" className="text-reset"><i class="text-reset bi bi-x-lg"></i></Button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-2 mt-md-0 col-md-7 col-12">
                                                            <div className="align-items-center row">
                                                                <div className="col-md-5">
                                                                    <div className="row align-items-center py-1">
                                                                        <div className="d-md-none col-6 table-header">Quantity</div>
                                                                        <div className="text-end text-md-center col-md-12 col-6">
                                                                            <div className="row d-flex align-items-center justify-content-end justify-content-md-center">
                                                                                <button class="col-3 btn btn-sm px-0 item-body" onClick={() => { decreaseItemQty(c.product_id) }}><AiOutlineMinus /></button>
                                                                                <div className="col-4 p-1 item-body qty-box text-center">{c.item_quantity}</div>
                                                                                <button class="col-3 btn btn-sm px-0 item-body" onClick={() => { increaseItemQty(c.product_id) }}><AiOutlinePlus /></button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="row align-items-center py-1">
                                                                        <div className="d-md-none col-6 table-header">Sub total</div>
                                                                        <div className="text-end text-md-center col-md-12 col-6 item-body">${c.sub_total_sgd}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="d-none d-md-block text-center col-3" onClick={() => { deleteCartItem(c.product_id) }}>
                                                                    <Button variant="link" className="text-reset"><i class="text-reset bi bi-x-lg"></i></Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-4">
                                        {/* Order Summary Section */}
                                        <div className="order-section p-4">
                                            <div>
                                                <div>
                                                    <h3 className="section-title">Order Summary</h3>
                                                </div>
                                                <div className="mt-4">
                                                    <div class="d-flex flex-row justify-content-between py-3 order-list">
                                                        <span className="pe-2">Order Subtotal </span>
                                                        <span className="ps-2">${orderTotal}</span>
                                                    </div>
                                                    <div class="d-flex flex-row justify-content-between py-3 order-list">
                                                        <span className="pe-2">Shipping & Handling</span>
                                                        <span className="ps-2">FREE</span>
                                                    </div>
                                                    <div class="d-flex flex-row justify-content-between pt-3 pb-0">
                                                        <span className="pe-2 order-total">Grand Total </span>
                                                        <span className="ps-2 order-total">${orderTotal}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Checkout Button */}
                                        <a className="btn checkout-btn rounded-0 p-2 px-3 w-100 my-4" role="button" href={BASE_URL + "/api/checkout/" + localStorage.getItem("id")}>PROCEED TO CHECKOUT <i class="bi bi-arrow-right"></i></a>
                                        <a className="text-decoration-none" href="/products"><p className="pb-3 text-center text-decoration-underline page-subtitle">Continue Shopping</p></a>
                                    </div>

                                </div>
                                :
                                <div>
                                    <p className="cart-message py-4 lead text-center">There are no items in your shopping cart.</p>
                                </div>
                            }
                        </>
                        :
                        <div>
                            <p className="cart-message py-4 lead text-center">Please log in to view or add items to your shopping cart.</p>
                        </div>
                    }
                </div>
            </div>
            

            
            
            
        </React.Fragment>

    )
}