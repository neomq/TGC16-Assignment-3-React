import React, {Fragment, useState, useEffect} from 'react';
import { Accordion, Toast } from 'react-bootstrap';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { essentialOilById, addItemToCart } from "../utils/API"
import { CiCircleInfo } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi"
import PageHeader from '../components/PageHeader';

export default function Product() {
    
    const [eoProduct, setEoProduct] = useState("")
    const [eoType, setEoType] = useState("")
    const [eoImage, setEoImage] = useState("")
    const [eoUsage, setEoUsage] = useState([])
    const [eoScent, setEoScent] = useState([])
    const [productOptions, setProductOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(0)
    const [eoPrice, setEoPrice] = useState(0)

    const [showToast, setShowToast] = useState(false)
    const [error, setError] = useState(false)

    console.log(error)

    const navigate = useNavigate()
    let { essentialoil_id } = useParams()
    const location = useLocation()

    console.log("selectedOption", selectedOption)
    console.log("productOptions", productOptions)

    useEffect(() => {
        fetchEssentialOil()
    }, [essentialoil_id])

    useEffect(() => {
        if (Object.keys(eoProduct).length > 0) {
            setProductData(eoProduct)
        }
    }, [eoProduct])

    useEffect(() => {
        if (productOptions.length > 0) {
            setSelectedOption(productOptions[0].pd_id)
            setEoPrice(productOptions[0].price)
        }
    }, [productOptions])

    const fetchEssentialOil = async () => {
        const essentialOilData = await essentialOilById(essentialoil_id)
        setEoProduct(essentialOilData)
        console.log(essentialOilData)
    }
 
    const setProductData = (data) => {
        const type = data.products[0].itemtype.name
        const image = data.products[0].image
        const usage = data.products[0].usage.map(use => use.type)
        const scent = data.products[0].scent.map(sct => sct.type)
        const options = data.products.map(product => {
            const { id, size, price_sgd } = product
            let productOption = {
                pd_id: id,
                size: size.size,
                price: price_sgd,
            }
            return productOption
        })
        setEoType(type)
        setEoImage(image)
        setEoUsage(usage)
        setEoScent(scent)
        setProductOptions(options)
    }

    const addToCart = async (selectedOption) => {
        // check if user is logged in
        if (localStorage.getItem("id") !== null) {
            let user_id = localStorage.getItem("id")
            const response = await addItemToCart(user_id, selectedOption)
            if (response !== 200) {
                setError(true)
            } else {
                setError(false)
            }
            setShowToast(true)
        } else {
            navigate('/login')
        }
    }

    const handleOnChange = (e) => {
        setSelectedOption(e.target.value)
    }

    const renderOptions = () => (
        <Fragment>
            <div className="mt-3 price-label">S${eoPrice}</div>
            <div className="mt-4 d-flex flex-row"> 
                {productOptions.map((option, index) => {
                    const margin = (index === productOptions.length - 1) ? "" : " me-2"
                    const checked = selectedOption.toString() === option.pd_id.toString()
                    return (
                        <div className={"size-btn-radio" + margin} key={index}>
                            <input
                                type="radio"
                                className="btn-check"
                                value={option.pd_id}
                                id={option.pd_id}
                                autoComplete="off"
                                onChange={handleOnChange}
                                onClick={() => setEoPrice(option.price)}
                                checked={checked}
                            />
                            <label htmlFor={option.pd_id}>{option.size}ml</label>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )

    return (
        <div className="product-bg">
            {location.state && <PageHeader state={location.state}/>}
            <div className="page-container">
                <div className="product-section">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-7 px-3 px-md-4 py-4 py-md-0">
                            <img src={eoImage} className="mx-auto d-block img-fluid" alt="..." />
                        </div>
                        <div className="col-12 col-md-5 px-3 px-md-4 product">
                            <div className="pb-4">
                                <h1 className="header-text mt-3 mt-lg-0">{eoProduct.name} {eoType}</h1>
                                {renderOptions()}
                                <div className="description mt-4 mb-5">
                                    <p className="mb-0 body-text"><span>Use:</span> {eoUsage.map((use) => (use)).join(", ")}</p>
                                    <p className="m-0 body-text"><span>Scent:</span> {eoScent.map((sct) => (sct)).join(", ")}</p>
                                    <p className="mt-3 body-text">{eoProduct.description}</p>
                                    <button type="button" class="moreinfo-btn rounded-pill" data-bs-toggle="modal" data-bs-target="#productInfo">
                                        <CiCircleInfo fontSize="20px"/><span className="ps-2 pe-1">Read More</span>
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <button className="shop-btn text-uppercase" onClick={() => addToCart(selectedOption)}>Add To Cart</button>
                                    {/* alert */}
                                    <Toast className="cart-toast box rounded-0 border-0 position-absolute mt-3" onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                                        <div className="toast-div d-flex">
                                            <Toast.Body><i className="bi bi-check-circle"></i> Item added to shopping cart!</Toast.Body>
                                            <button type="button" className="btn cart-toast me-2 m-auto" data-bs-dismiss="toast"><i className="bi bi-x-lg"></i></button>
                                        </div>
                                    </Toast>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Information Modal */}
            <div class="modal fade" id="productInfo" tabindex="-1" aria-labelledby="productInfoModalLabel" aria-hidden="true">
                <div class="product modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <p class="modal-title mt-2" id="exampleModalLabel">{eoProduct.name} {eoType}</p>
                            <button type="button" className="close-modal border-0 p-0" data-bs-dismiss="modal" aria-label="Close"><TfiClose color="#3B3530" fontSize="15px" /></button>
                        </div>
                        <div class="modal-body">
                            <div className="product-info">
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Application</Accordion.Header>
                                        <Accordion.Body className="body-text">
                                            <p className="mt-2 body-text">{eoProduct.application}</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Directions</Accordion.Header>
                                        <Accordion.Body>
                                            <p className="mt-2 body-text">{eoProduct.directions}</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header className="mb-3">Benefits</Accordion.Header>
                                        <Accordion.Body>
                                            <p className="mt-2 body-text"><strong>Beauty</strong><br />{eoProduct.beauty_benefits}</p>
                                            <p className="body-text"><strong>Body</strong><br />{eoProduct.body_benefits}</p>
                                            <p className="body-text"><strong>Emotional Health</strong><br />{eoProduct.emotional_benefits}</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}