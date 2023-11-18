import React, {useState, useEffect} from 'react';
import { Accordion, Toast } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../constants/API';
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export default function Product() {
    
    const [currentEssentialOil, setCurrentEssentialOil] = useState("");
    const [currentType, setCurrentType] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentSize, setCurrentSize] = useState("");
    const [currentImage, setCurrentImage] = useState("");
    const [currentUse, setCurrentUse] = useState([]);
    const [currentScent, setCurrentScent] = useState([]);

    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    // const params = useParams();
    let { product_id } = useParams();

    useEffect(()=>{
        const fetchProduct = async () => {
            let response = await axios.get(BASE_URL + API.PRODUCTS + product_id)
            
            // setCurrentProduct(response.data)
            setCurrentEssentialOil(response.data.essentialoil)
            setCurrentType(response.data.itemtype.name)
            setCurrentSize(response.data.size)
            setCurrentPrice(response.data.price_sgd)
            setCurrentImage(response.data.image)
            setCurrentUse(response.data.usage)
            setCurrentScent(response.data.scent)
            
            console.log(response.data)
            
        }
        fetchProduct();
    }, [product_id])

    // Add to cart
    const addToCart = async () => {
        // check if user is logged in
        if (localStorage.getItem("id") !== null) {

            // add item to cart
            let user_id = localStorage.getItem("id")
            await axios.get(BASE_URL + API.CART + user_id + "/add/" + product_id)
            setShow(true) // display toast notification
        } else {
            // redirect user to login
            navigate('/login')
        }
    }

    return <React.Fragment>

        <div className="page-container">
            <div className="page-header-2 pt-5 pb-4 my-2 mx-auto">
                <nav aria-label="breadcrumb d-flex justify-content-center mb-2">
                    <ol class="breadcrumb b-crumb d-flex justify-content-center">
                        <li class="breadcrumb-item"><a href="/products">Products</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{currentEssentialOil.name} {currentType}</li>
                    </ol>
                </nav>
            </div>

            <div className="row d-flex justify-content-center p-md-5">
                    <div className="col-12 col-md-6 px-3 px-md-4 py-4 py-md-0">
                        <img src={currentImage} className="mx-auto d-block img-fluid" alt="..."/>
                    </div>
                    <div className="col-12 col-md-6 px-3 px-md-4 product">
                        <div className="pt-3 pb-5">
                            <h1 className="header-text">{currentEssentialOil.name} {currentType}</h1>
                            <p className="header-small">({currentSize.size}ml)</p>
                            <h3 className="subheader-text">${currentPrice}</h3>
                            <p className="mt-4 mb-0 body-text"><strong>Use:</strong> {currentUse.map( (u) => (u.type)).join(", ")}</p>
                            <p className="m-0 body-text"><strong>Scent Profile:</strong> {currentScent.map( (s) => (s.type)).join(", ")}</p>
                            <div className="mt-4">
                                <button className="btn rounded-0 p-2 px-5 addtocart-btn" onClick={addToCart}>Add To Cart</button>
                                {/* alert */}
                                <Toast className="cart-toast box rounded-0 border-0 position-absolute mt-3" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                                    <div className="toast-div d-flex">
                                        <Toast.Body><i className="bi bi-check-circle"></i> Item added to shopping cart!</Toast.Body>
                                        <button type="button" className="btn cart-toast me-2 m-auto" data-bs-dismiss="toast"><i className="bi bi-x-lg"></i></button>
                                    </div>
                                </Toast>
                            </div>
                        </div>
                        
                        <div className="description pt-5 border-top">
                            <p className="body-text">{currentEssentialOil.description}</p>
                        </div>
                    </div>

            </div>
            
            <div className="product-info mb-5 mt-4 mt-md-0 px-3 px-md-5 py-4">
                <Accordion defaultActiveKey="0" className="p-2">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Application</Accordion.Header>
                        <Accordion.Body className="body-text">
                            <p className="mt-2 body-text">{currentEssentialOil.application}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Directions</Accordion.Header>
                        <Accordion.Body>
                            <p className="mt-2 body-text">{currentEssentialOil.directions}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header className="mb-3">Benefits</Accordion.Header>
                        <Accordion.Body>
                            <p className="mt-2 body-text"><strong>Beauty</strong><br/>{currentEssentialOil.beauty_benefits}</p>
                            <p className="body-text"><strong>Body</strong><br/>{currentEssentialOil.body_benefits}</p>
                            <p className="body-text"><strong>Emotional Health</strong><br/>{currentEssentialOil.emotional_benefits}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

        </div>
        
    </React.Fragment>
}