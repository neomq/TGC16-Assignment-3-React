import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, CardGroup, Accordion } from 'react-bootstrap';
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

// const BASE_URL = "https://essential-oils-store.herokuapp.com"
const BASE_URL = "https://8080-neomq-tgc16assignment3-9unf8jw59sc.ws-us45.gitpod.io"

export default function ProductListing() {
    const [products, setProducts] = useState([])
    const [productType, setProductType] = useState([])
    const [productUse, setProductUse] = useState([])

    //search
    const [nameSearch, setNameSearch] = useState("")
    const [typeSearch, setTypeSearch] = useState("")
    const [useSearch, setUseSearch] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            let response = await axios.get(BASE_URL + "/api/products");
            setProducts(response.data)
            console.log("setProducts", response.data)
        }
        fetchProducts()
    }, []) // emulate componenetDidMount

    useEffect(() => {
        const fetch = async () => {
            let response = await axios.get(BASE_URL + "/api/products/types");

            console.log("product type", response.data)
            setProductType(response.data)
            console.log("setProductType", response.data)
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            let response = await axios.get(BASE_URL + "/api/products/usages");

            console.log("setProductUse", response.data)
            setProductUse(response.data)
        }
        fetch()
    }, [])

    const updateUsage = (e) => {
        // if the value is in the array,
        if (useSearch.includes(e.target.value)) {
            // clone
            let clone = useSearch.slice();
            // modify
            let indexToRemove = useSearch.findIndex(i => i === e.target.value);
            clone.splice(indexToRemove, 1) // remove the value from the array
            // replace
            setUseSearch(clone)
        } else {
            // the array don't have the value
            // clone
            let clone = useSearch.slice();
            // modify
            clone.push(e.target.value); // add the value to the array
            // replace
            setUseSearch(clone)
        }
    }

    const addToCart = async (product_id) => {
        // check if user is logged in
        if (localStorage.getItem("id") !== null) {

            // add item to cart
            let user_id = localStorage.getItem("id")
            await axios.get(BASE_URL + "/api/cart/" + user_id + "/add/" + product_id)
            alert("item added to cart!")
        } else {
            // direct user to login
            navigate('/login')
        }
    }

    const search = async () => {
        // alert("start search")

        let getSearch = {}
        if (nameSearch) {
            getSearch.name = nameSearch
        }
        if (typeSearch && typeSearch !== "-- Collection --") {
            getSearch.type = typeSearch
        }
        if (useSearch && useSearch.length !== 0) {
            getSearch.use = useSearch
        }

        console.log("getSearch", getSearch)
        const response = await axios.post(BASE_URL + "/api/products/search", getSearch)
        console.log("search results:", response.data)
        setProducts(response.data)
    }

    const resetSearch = async () => {
        const response = await axios.get(BASE_URL + "/api/products")

        setProducts(response.data)
    }

    return (
        <React.Fragment>
            <div className="page-container">

                <div className="page-header py-5 my-2">
                    <p className="mb-0 page-title text-center">Shop Essential Oils</p>
                    <p className="mt-2 mb-0 page-subtitle text-center mx-auto w-50">Improve your everyday life with 100% pure natural essential oils extracted from nature, all around the world.</p>
                </div>
                
                <div className="page-body row">

                    <div className="search col-3">
                        <div className="input-box d-flex flex-row align-items-center ps-3">
                            <FiSearch/><Form.Control type="text" name="nameSearch" value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} placeholder="Search Product" className="py-2 bg-transparent border-0 rounded-0"/>
                        </div>
                        <Form.Select name="typeSearch" value={typeSearch} onChange={(e) => setTypeSearch(e.target.value)} className="rounded-0 bg-transparent mt-3 py-2">
                            <option>-- Collection --</option>
                            {productType.map((t) =>
                                <option key={t[1]} value={t[1]}>{t[1]}</option>
                            )}
                        </Form.Select>
                        <Accordion defaultActiveKey="0" className="mt-3" alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Usage</Accordion.Header>
                                <Accordion.Body>

                                    {productUse.map((u) =>(
                                        <Form.Check inline key={u[0]} label={u[1]} name="use" value={u[0]} onChange={updateUsage} />
                                    ))}

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Scent Profile</Accordion.Header>
                                <Accordion.Body>
                                    <select className="form-select bg-transparent border-0" multiple aria-label="multiple select example">
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </select>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Health Benefits</Accordion.Header>
                                <Accordion.Body>
                                    <select className="form-select bg-transparent border-0" multiple aria-label="multiple select example">
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </select>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        
                        <div className="mt-4 d-grid gap-2">
                            <button className="btn search-btn-pri rounded-0 p-2" onClick={search}>Search</button>
                            <button className="btn search-btn-sec rounded-0 p-2" onClick={resetSearch}>Clear All Filters</button>
                        </div>
                    </div>

                    <div className="products col-9">
                        <CardGroup>
                            <Row xs={1} md={3} className="g-4">
                                {products.map((p, idx) => (
                                    <Col key={p.id}>
                                        <Card className="rounded-0 h-100 border-0 bg-transparent">
                                            <Link to={"/products/" + p.id} className="text-decoration-none text-reset">
                                                <Card.Img className="rounded-0" variant="top" src={p.image} />
                                                <Card.Body className="d-flex justify-content-between p-0 py-4">
                                                    <Card.Text className="product-title pe-2 mb-0">
                                                        {p.essentialoil.name}<br/><span className="small-text">({p.size.size})</span> {' '}
                                                    </Card.Text>
                                                    <Card.Text className="product-title ps-2" >
                                                        <span>${p.price_sgd}</span>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Link>
                                            <Card.Footer className="p-0 bg-transparent border-0 rounded-0">
                                                <div className="d-grid">
                                                    <button className="btn rounded-0 p-2 addtocart-btn" onClick={() => { addToCart(p.id) }}>
                                                        Add To Cart
                                                    </button>
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </CardGroup>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}