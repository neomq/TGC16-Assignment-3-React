import React, {useState, useEffect} from 'react';
import { Accordion, Breadcrumb } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'


const BASE_URL = "https://essential-oils-store.herokuapp.com"
// const BASE_URL = "https://8080-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"

export default function Product() {
    
    const [currentEssentialOil, setCurrentEssentialOil] = useState("");
    // const [currentType, setCurrentType] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentSize, setCurrentSize] = useState("");
    const [currentImage, setCurrentImage] = useState("");
    const [currentUse, setCurrentUse] = useState([]);
    const [currentScent, setCurrentScent] = useState([]);

    const navigate = useNavigate();

    // const params = useParams();
    let { product_id } = useParams();

    useEffect(()=>{
        const fetchProduct = async () => {
            let response = await axios.get(BASE_URL + "/api/products/" + product_id)
            
            // setCurrentProduct(response.data)
            setCurrentEssentialOil(response.data.essentialoil)
            // setCurrentType(response.data.itemtype.name)
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
            await axios.get(BASE_URL + "/api/cart/" + user_id + "/add/" + product_id)
            alert("item added to cart!")
        } else {
            // redirect user to login
            navigate('/login')
        }
    }

    return <React.Fragment>

        <div className="page-container">

            <div className="page-header-2 pt-5 pb-4 my-2 mx-auto">
                <Breadcrumb className="b-crumb mb-2 d-flex justify-content-center">
                    <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
                    <Breadcrumb.Item active>{currentEssentialOil.name}</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className="row d-flex justify-content-center p-md-5">
            
                    <div className="col-12 col-md-6 px-3 px-md-4 py-4 py-md-0">
                        <img src={currentImage} class="mx-auto d-block img-fluid" alt="..."/>
                    </div>
                    
                    <div className="col-12 col-md-6 px-3 px-md-4 product">
                        <div className="pt-3 pb-5">
                            <h1 className="header-text">{currentEssentialOil.name}</h1>
                            <p className="header-small">({currentSize.size})</p>
                            <h3 className="subheader-text">${currentPrice}</h3>
                            <p className="mt-4 mb-0 body-text"><strong>Use:</strong> {currentUse.map( (u) => (u.type)).join(", ")}</p>
                            <p className="m-0 body-text"><strong>Scent Profile:</strong> {currentScent.map( (s) => (s.type)).join(", ")}</p>
                            <div className="mt-4">
                                <button className="btn rounded-0 p-2 px-5 addtocart-btn" onClick={addToCart}>Add To Cart</button>
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