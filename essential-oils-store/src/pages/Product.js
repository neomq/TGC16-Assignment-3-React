import React, {useState, useEffect} from 'react';
import { Button, Accordion } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios'


// const BASE_URL = "https://essential-oils-store.herokuapp.com"
const BASE_URL = "https://8080-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"

export default function Product() {
    
    const [currentEssentialOil, setCurrentEssentialOil] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentSize, setCurrentSize] = useState("");
    const [currentImage, setCurrentImage] = useState("");
    const [currentUse, setCurrentUse] = useState([]);
    const [currentScent, setCurrentScent] = useState([]);

    // const params = useParams();
    let { product_id } = useParams();

    useEffect(()=>{
        const fetchProduct = async () => {
            let response = await axios.get(BASE_URL + "/api/products/" + product_id)
            
            // setCurrentProduct(response.data)
            setCurrentEssentialOil(response.data.essentialoil)
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
    // const addToCart = async (product_id) => {
    //         await axios.post(BASE_URL + "/api/shoppingcart/add/" + product_id)
    //         setAdded(true)
    //         setLoaded(true)
    // }

    return <React.Fragment>
        <h1>{currentEssentialOil.name} ({currentSize.size})</h1>
        <h3>${currentPrice}</h3>
        <img src={currentImage} alt="..." width="500px"/>
        <p>{currentEssentialOil.description}</p>
        <p>Use: {currentUse.map( (u) => (u.type)).join(", ")}</p>
        <p>Scent Profile: {currentScent.map( (s) => (s.type)).join(", ")}</p>

        <Button variant="dark">Add to Cart</Button>{' '}

        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Application</Accordion.Header>
                <Accordion.Body>
                    {currentEssentialOil.application}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Directions</Accordion.Header>
                <Accordion.Body>
                    {currentEssentialOil.directions}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Benefits</Accordion.Header>
                <Accordion.Body>
                    <p>Beauty<br/>{currentEssentialOil.beauty_benefits}</p>
                    <p>Health<br/>{currentEssentialOil.body_benefits}</p>
                    <p>Emotional Wellness<br/>{currentEssentialOil.emotional_benefits}</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        
    </React.Fragment>
}