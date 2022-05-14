import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import axios from "axios";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const BASE_URL = "https://essential-oils-store.herokuapp.com"
// const BASE_URL = "https://3000-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"


export default function Cart() {
    const [loggedIn, setLoggedIn] = useState([])
    const [cartItems, setCartItems] = useState([])
    // const [cartItem, setCartItem] = useState([])

    useEffect(() => {
        // check if user is logged in
        if (localStorage.getItem("id") !== null) {
            setLoggedIn(true)
            // get all cart items
            let user_id = localStorage.getItem("id")
            const fetch = async () => {
                const response = await axios.get(BASE_URL + "/api/cart/" + user_id)
                setCartItems(response.data)
                console.log("CART:",response.data)
            }
            fetch()
        } else {
            setLoggedIn(false)
            // direct user to login
        }
    }, [])

    const deleteCartItem = async (product_id) => {
        let user_id = localStorage.getItem("id")
        await axios.get(BASE_URL + "/api/cart/" + user_id + /remove/ + product_id)
        
        alert("cart item deleted!!")
        // refresh cart items
        let response = await axios.get(BASE_URL + "/api/cart/" + user_id)
        setCartItems(response.data)
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

        alert("1 qty removed!")
        
        let user_id = localStorage.getItem("id")
        await axios.post(BASE_URL + "/api/cart/" + user_id + "/updateQuantity/" + product_id, {
            'newQuantity': cloned[index].item_quantity
        })
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

        alert("1 qty added!")
        
        let user_id = localStorage.getItem("id")
        await axios.post(BASE_URL + "/api/cart/" + user_id + "/updateQuantity/" + product_id, {
            'newQuantity': cloned[index].item_quantity
        })
    }

    return (
        <React.Fragment>
            <h1 class="text-center">My Shopping Cart</h1>

            {loggedIn === true ?
            <>
                {cartItems.length !== 0 ? 
                    <div>
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
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center col-10">
                                                    <img src={c.products.image} width="80px" alt="..." />
                                                    <div className="text-start">
                                                        <strong>{c.products.essentialoil.name}</strong>
                                                        <div className="text-muted text-sm">{c.products.size.size}</div>
                                                    </div>
                                                </div>
                                                

                                                <div className="d-md-none text-center col-2" onClick={()=>{deleteCartItem(c.product_id)}}>
                                                    <Button variant="link"><AiOutlineClose /></Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-2 mt-md-0 col-md-7 col-12">
                                            <div className="align-items-center row">
                                                <div className="col-md-4">
                                                    <div className="row">
                                                        <div className="d-md-none text-muted col-6">Quantity</div>
                                                        <div className="text-end text-md-center col-md-12 col-6">
                                                            <div className="row d-flex align-items-center justify-content-end justify-content-md-center">
                                                                <button class="col-2 btn btn-sm" onClick={() => {decreaseItemQty(c.product_id)}}><AiOutlineMinus/></button>
                                                                    <div className="col-3 p-1 border text-center">{c.item_quantity}</div>
                                                                <button class="col-2 btn btn-sm" onClick={() => {increaseItemQty(c.product_id)}}><AiOutlinePlus/></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="row">
                                                        <div className="d-md-none text-muted col-6">Sub total</div>
                                                        <div className="text-end text-md-center col-md-12 col-6">{c.sub_total}</div>
                                                    </div>
                                                </div>
                                                <div className="d-none d-md-block text-center col-2" onClick={()=>{deleteCartItem(c.product_id)}}>
                                                    <Button variant="link"><AiOutlineClose /></Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>
                        
                        {/* Order Summary Section */}
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
                    </div>
                : 
                <div>
                    <p className="lead text-center">There are no items in your shopping cart.</p>
                </div>
                }
            </>
            :
            <div>
                <p className="lead text-center">Please log in to add items to your shopping cart.</p>
            </div>
            }

            
            
            
        </React.Fragment>

    )
}