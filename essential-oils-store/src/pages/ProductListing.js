import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, CardGroup, Accordion } from 'react-bootstrap';
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from 'axios'

const BASE_URL = "https://essential-oils-store.herokuapp.com"
// const BASE_URL = "https://8080-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"

export default function ProductListing() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            let response = await axios.get(BASE_URL + "/api/products");
            setProducts(response.data)
            console.log(response.data)
        }
        fetchProducts()
    }, []) // emulate componenetDidMount

    const addToCart = async (product_id) => {
        // check if user is logged in
        if (localStorage.getItem("id") !== null) {

            // add item to cart
            let user_id = localStorage.getItem("id")
            await axios.get(BASE_URL + "/api/cart/" + user_id + "/add/" + product_id)
            alert("item added to cart!")
        } else {
            // if user is not logged in, show alert and direct user to login
        }
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
                        <div className="search-box border d-flex flex-row align-items-center ps-3">
                            <FiSearch/><Form.Control type="text" placeholder="Search Products" className="py-2 bg-transparent border-0 rounded-0"/>
                        </div>
                        <Form.Select className="rounded-0 bg-transparent mt-3 py-2">
                            <option>Essential Oil Type</option>
                        </Form.Select>
                        <Accordion defaultActiveKey="0" className="mt-3" alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Usage</Accordion.Header>
                                <Accordion.Body>
                                    <Form.Check inline label="Aromatic" name="group1" type="checkbox" id={`inline-checkbox-1`} />
                                    <Form.Check inline label="Topical" name="group1" type="checkbox" id={`inline-checkbox-2`} />
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
                            <button className="btn search-btn-pri rounded-0 p-2">Search</button>
                            <button className="btn search-btn-sec rounded-0 p-2">Clear All Filters</button>
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