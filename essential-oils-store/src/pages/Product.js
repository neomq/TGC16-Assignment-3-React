import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const BASE_URL = "https://essential-oils-store.herokuapp.com"
// const BASE_URL = "https://3000-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"

export default function Product() {
    
    // const [currentProduct, setCurrentProduct] = useState();
    const [currentEssentialOil, setCurrentEssentialOil] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentSize, setCurrentSize] = useState("");
    const [currentImage, setCurrentImage] = useState("");
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
            
            console.log(response.data)
            
        }
        fetchProduct();
    }, [product_id])

    return <React.Fragment>
        <h1>{currentEssentialOil.name} ({currentSize.size})</h1>
        <h3>{currentPrice}</h3>
        <img src={currentImage} alt="..." width="500px"/>
    </React.Fragment>
}