import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios'

const BASE_URL = "https://essential-oils-store.herokuapp.com"

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

    return (
        <React.Fragment>
            <p className="lead fs-2">Shop Essential Oils</p>

            <Row xs={1} md={3} className="g-3">
                {products.map((p, idx) => (
                    <Col>
                        <Card className="rounded-0">
                            <Card.Img className="rounded-0" variant="top" src={p.image} />
                            <Card.Body>
                                <Card.Text className="lead fs-5" >
                                    {p.essentialoil.name} ({p.size.size})
                                    ${p.price_sgd}
                                </Card.Text>
                            </Card.Body>
                            <><Button variant="dark" className="lead fs-5 rounded-0">Add to Cart</Button>{' '}</>
                        </Card>
                    </Col>
                ))}
            </Row>

        </React.Fragment>
    )
}