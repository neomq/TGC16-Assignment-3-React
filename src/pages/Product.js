import React, {Fragment, useState, useEffect} from 'react';
import { Accordion } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { essentialOilById, addItemToCart } from "../utils/API"
import { CiCircleInfo } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi"
import PageHeader from '../components/PageHeader';
import Alert from '../components/Alert';

export default function Product({ loggedIn, user }) {
    
    const [eoProduct, setEoProduct] = useState({})
    const [eoType, setEoType] = useState("")
    const [eoImage, setEoImage] = useState("")
    const [eoUsage, setEoUsage] = useState([])
    const [eoScent, setEoScent] = useState([])
    const [productOptions, setProductOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(0)
    const [eoPrice, setEoPrice] = useState(0)
    const [isLoaded, setLoaded] = useState(false)

    const [showToast, setShowToast] = useState(false)
    const [error, setError] = useState(false)

    const navigate = useNavigate()
    let { essentialoil_id } = useParams()

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

    useEffect(() => {
        const dataLoaded =
            eoUsage.length > 0 &&
            eoScent.length > 0 &&
            productOptions.length > 0 &&
            eoPrice > 0 
        if ( eoType && eoImage && dataLoaded ) {
            setLoaded(true)
        }

    },[ eoType,
        eoImage,
        eoUsage,
        eoScent,
        eoPrice,
        productOptions
    ]) 
 
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
        if (loggedIn) {
            const response = await addItemToCart(user.id, selectedOption)
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

    const renderProductSkeleton = () => (
        <div className="product-section skeleton">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-7 px-3 px-md-4 py-4 py-md-0">
                    <div className="img light"></div>
                </div>
                <div className="col-12 col-md-5 px-3 px-md-4 product">
                    <div className="pb-4">
                        <div className="skeleton-block light mt-3 mt-lg-0" style={{ maxWidth: "70%", minWidth: "230px", height: "40px" }}></div>
                        <div className="skeleton-block light mt-3" style={{ width: "75px", height: "40px" }}></div>
                        <div className="skeleton-block light mt-4" style={{ maxWidth: "30%", minWidth: "85px", height: "40px" }}></div>
                        <div className="mt-4 mb-5">
                            <div className="skeleton-block light mt-3" style={{ width: "100%", height: "180px" }}></div>    
                        </div>
                        <div className="mt-4">
                            <div className="skeleton-block light mt-3" style={{ width: "200px", height: "50px" }}></div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="product-bg">
            <PageHeader data={eoProduct} dataLoaded={isLoaded}/>
            <div className="page-container">
                {isLoaded ? (
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
                                            <CiCircleInfo fontSize="20px" /><span className="ps-2 pe-1">Read More</span>
                                        </button>
                                    </div>
                                    <div className="mt-4">
                                        <button className="shop-btn text-uppercase" onClick={() => addToCart(selectedOption)}>Add To Cart</button>
                                        <Alert
                                            showToast={showToast}
                                            setShowToast={setShowToast}
                                            error={error}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    renderProductSkeleton()
                )}
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