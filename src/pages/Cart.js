import React, { useEffect, useState, Fragment } from "react"
import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { pages, emptyCartMessage } from "../constants/common"
import { allCartItems, deleteItemFromCart, updateCartItemQty } from "../utils/API"
import { TfiClose } from "react-icons/tfi"
import API from '../constants/APIs'
import PageHeader from '../components/PageHeader'

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export default function Cart({ user, loggedIn }) {
    const [cartItems, setCartItems] = useState([])
    const [orderTotal, setOrderTotal] = useState(0)
    const { notFound, noItems } = emptyCartMessage
    
    const navigate = useNavigate()
    
    useEffect(() => {
        if (loggedIn && Object.keys(user).length > 0) {
            fetchCartItems()
        }
    }, [])

    useEffect(() => {
        calcOrderAmount()
    },[cartItems])

    const fetchCartItems = async () => {
        const cartData = await allCartItems(user.id)
        setCartItems(cartData)        
    }

    const calcOrderAmount = () => {
        let orderSubTotal = 0
        for (let item of cartItems) {
            orderSubTotal += (item.sub_total_sgd * item.item_quantity)
        }
        setOrderTotal(orderSubTotal.toFixed(2))
    }

    const deleteCartItem = async (product_id) => {
        const response = await deleteItemFromCart(user.id, product_id)
        if (response === 200){
            fetchCartItems()
        }
    }

    const updateCartItem = async (product_id, cartItem) => {
        const response = await updateCartItemQty(user.id, product_id, cartItem)
        if (response === 200){
            fetchCartItems()
        }
    }

    const decreaseItemQty = async (product_id) => {
        const index = cartItems.findIndex(i => i.product_id === parseInt(product_id))
        let cloned = [...cartItems]
        if (cloned[index].item_quantity > 1) {
            cloned[index].item_quantity -= 1;
        }
        setCartItems(cloned)
        updateCartItem(product_id, cloned[index])
    }

    const increaseItemQty = async (product_id) => {
        const index = cartItems.findIndex(i => i.product_id === parseInt(product_id))
        let cloned = [...cartItems]
        cloned[index].item_quantity += 1
        setCartItems(cloned)
        updateCartItem(product_id, cloned[index])
    }

    const checkout = () => {
        //redirect
        window.location.href = BASE_URL + API.CHECKOUT + localStorage.getItem("id")
    }

    const navigateToProduct = (id) => {
        navigate(`${pages.products}/${id}`)
    }

    const renderHeader = () => (
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
    )

    const renderCartItem = (item, idx) => {
        const { products, product_id, sub_total_sgd } = item
        return (
            <div className="cart-item" key={idx}>
                <div className=" d-flex align-items-center text-start text-md-center row">
                    <div className="col-md-5 col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            {renderItemDetail(products)}
                            <div className="d-md-none align-self-start text-end text-md-center col-2">
                                {renderDeleteBtn(product_id)}
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
                                            {renderQtyInput(item)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row align-items-center py-1">
                                    <div className="d-md-none col-6 table-header">Sub total</div>
                                    <div className="text-end text-md-center col-md-12 col-6 item-body">${sub_total_sgd}</div>
                                </div>
                            </div>
                            <div className="d-none d-md-block text-center col-3">
                                {renderDeleteBtn(product_id)}
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        )
    }

    const renderItemDetail = (products) => {
        const { essentialoil_id, essentialoil, image, itemtype, size } = products
        return (
            <div onClick={() => navigateToProduct(essentialoil_id)}>
                <div className="d-flex align-items-center col-10">
                    <img src={image} width="100px" alt="..." />
                    <div className="ps-3 text-start">
                        <p className="mb-1 item-title">{essentialoil.name} {itemtype.name}</p>
                        <div className="item-subtitle">({size.size}ml)</div>
                    </div>
                </div>
            </div>
        )
    }

    const renderQtyInput = (item) => {
        const { product_id, item_quantity } = item
        return (
            <Fragment>
                <button className="col-2 btn btn-sm px-0 item-body" onClick={() => {decreaseItemQty(product_id)}}>
                    <AiOutlineMinus />
                </button>
                <div className="col-3 col-md-4 p-2 d-flex item-body qty-box justify-content-center align-items-center">
                    <div>{item_quantity}</div>
                </div>
                <button className="col-2 btn btn-sm px-0 item-body" onClick={() => {increaseItemQty(product_id)}}>
                    <AiOutlinePlus />
                </button>
            </Fragment>
        )
    }

    const renderDeleteBtn = (product_id) => (
        <Button variant="link" className="text-reset" onClick={()=>{deleteCartItem(product_id)}}>
            <TfiClose color="#3B3530" fontSize="15px" />
        </Button>
    )

    const renderOrderSummary = () => (
        <div className="order-section p-4">
            <div>
                <div>
                    <h3 className="section-title">Order Summary</h3>
                </div>
                <div className="mt-4">
                    <div className="d-flex flex-row justify-content-between py-3 order-list">
                        <span className="pe-2">Order Subtotal </span>
                        <span className="ps-2">${orderTotal}</span>
                    </div>
                    <div className="d-flex flex-row justify-content-between py-3 order-list">
                        <span className="pe-2">Shipping & Handling</span>
                        <span className="ps-2">FREE</span>
                    </div>
                    <div className="d-flex flex-row justify-content-between pt-3 pb-0">
                        <span className="pe-2 order-total">Grand Total </span>
                        <span className="ps-2 order-total">${orderTotal}</span>
                    </div>
                </div>
            </div>
        </div>
    )

    const EmptyState = ({message, btnLink, btnLabel}) => (
        <div style={{ 
            maxWidth: '300px',
            marginTop: '48px',
            height: '42vh' 
        }}>
            <div>
                <p className="cart-message lead text-center">{message}</p>
                <div className="d-grid mt-5">
                    <button className="signin-btn text-uppercase" type="button" onClick={()=>navigate(btnLink)}>
                        {btnLabel}
                    </button>
                </div>
            </div>
        </div>
    )

    return (
        <Fragment>
            <PageHeader title="My Shopping Cart" />
            <div className="page-container">
                <div className="row justify-content-center">
                    {(loggedIn && Object.keys(user).length > 0) ? (
                        <Fragment>
                            {cartItems.length > 0 ? (
                                <div className="cart row mt-4 mt-lg-5">
                                    <div className="col-12 col-md-8 p-0">
                                        <div className="cart-heading text-center py-3">
                                            {renderHeader()}
                                        </div>
                                        <div className="mt-3 cart-body">
                                            {cartItems.map((item, idx) => (
                                                renderCartItem(item, idx)
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-3 mt-md-0 px-0 ps-md-3 ps-lg-4">
                                        {renderOrderSummary()}
                                        {/* Checkout Button */}
                                        <div className="btn checkout-btn w-100 my-4 text-uppercase" onClick={checkout}>Proceed to checkout</div>
                                        <div className="text-decoration-none" onClick={() => navigate(pages.products)}>
                                            <p className="pb-3 text-center text-decoration-underline page-subtitle">Continue Shopping</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <EmptyState
                                    message={noItems.message}
                                    btnLink={noItems.buttonLink}
                                    btnLabel={noItems.buttonLabel}
                                />
                            )}
                        </Fragment>
                    ) : (
                        <EmptyState
                            message={notFound.message}
                            btnLink={notFound.buttonLink}
                            btnLabel={notFound.buttonLabel}
                        />
                    )}
                </div>
            </div>
        </Fragment>

    )
}