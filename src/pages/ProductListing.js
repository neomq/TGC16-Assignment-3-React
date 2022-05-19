import React, { useState, useEffect } from "react";
import { Form, Accordion, Breadcrumb } from 'react-bootstrap';
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const BASE_URL = "https://essential-oils-store.herokuapp.com"
// const BASE_URL = "https://8080-neomq-tgc16assignment3-9unf8jw59sc.ws-us45.gitpod.io"

export default function ProductListing() {
    const [products, setProducts] = useState([])
    const [productType, setProductType] = useState([])
    const [productUse, setProductUse] = useState([])
    const [productScent, setProductScent] = useState([])
    const [productBenefits, setProductBenefits] = useState([])

    //search
    const [nameSearch, setNameSearch] = useState("")
    const [typeSearch, setTypeSearch] = useState("")
    const [useSearch, setUseSearch] = useState([])
    const [scentSearch, setScentSearch] = useState([])
    const [benefitsSearch, setBenefitsSearch] = useState([])

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

    useEffect(() => {
        const fetch = async () => {
            let response = await axios.get(BASE_URL + "/api/products/scents");

            console.log("setProductScent", response.data)
            setProductScent(response.data)
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            let response = await axios.get(BASE_URL + "/api/products/benefits");

            console.log("setProductBenefits", response.data)
            setProductBenefits(response.data)
        }
        fetch()
    }, [])

    const updateUsage = (e) => {
        // console.log(e.target.value)
        // console.log(useSearch)
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

    const updateScent = (e) => {
        // if the value is in the array,
        if (scentSearch.includes(e.target.value)) {
            // clone
            let clone = scentSearch.slice();
            // modify
            let indexToRemove = scentSearch.findIndex(i => i === e.target.value);
            clone.splice(indexToRemove, 1) // remove the value from the array
            // replace
            setScentSearch(clone)
        } else {
            // the array don't have the value
            // clone
            let clone = scentSearch.slice();
            // modify
            clone.push(e.target.value); // add the value to the array
            // replace
            setScentSearch(clone)
        }
    }

    const updateBenefits = (e) => {
        // if the value is in the array,
        if (benefitsSearch.includes(e.target.value)) {
            // clone
            let clone = benefitsSearch.slice();
            // modify
            let indexToRemove = benefitsSearch.findIndex(i => i === e.target.value);
            clone.splice(indexToRemove, 1) // remove the value from the array
            // replace
            setBenefitsSearch(clone)
        } else {
            // the array don't have the value
            // clone
            let clone = benefitsSearch.slice();
            // modify
            clone.push(e.target.value); // add the value to the array
            // replace
            setBenefitsSearch(clone)
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
        if (scentSearch && scentSearch.length !== 0) {
            getSearch.scent = scentSearch
        }
        if (benefitsSearch && benefitsSearch.length !== 0) {
            getSearch.benefits = benefitsSearch
        }

        console.log("getSearch", getSearch)
        
        const response = await axios.post(BASE_URL + "/api/products/search", getSearch)
        console.log("search results:", response.data)

        setProducts(response.data)
    }

    const resetSearch = async () => {

        setNameSearch("")
        setTypeSearch("")
        setUseSearch([])
        setScentSearch([])
        setBenefitsSearch([])

        const response = await axios.get(BASE_URL + "/api/products")

        setProducts(response.data)
    }

    return (
        <React.Fragment>
            <div className="page-container">

                <div className="page-header py-5 my-2 mb-0 mx-auto">
                    
                        <Breadcrumb className="b-crumb mb-2 d-flex justify-content-center">
                            {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item> */}
                            <Breadcrumb.Item active>Products</Breadcrumb.Item>
                        </Breadcrumb>
                    
                    <p className="mb-0 px-3 page-title text-center">Shop Essential Oils</p>
                    <p className="mt-2 mb-0 page-subtitle text-center mx-auto w-75">Improve your everyday life with 100% pure natural essential oils extracted from nature, all around the world.</p>
                </div>
                
                <div className="page-body mt-md-5 row">
                    
                    <div className="px-3 py-0 d-flex my-3 d-md-none">
                        <button className="btn filter-btn d-flex align-items-center py-0 rounded-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <i className="bi bi-funnel px-0 py-2"></i><span className="p-2 px-1 mb-0">Filter</span>
                        </button>
                    </div>
                    
                    
                    <div className="collapse d-md-none" id="collapseExample">
                        {/* Search Filter */}
                        <div className="search col-12 col-md-3 mb-5">
                            <div className="input-box d-flex flex-row align-items-center ps-3">
                                <FiSearch /><Form.Control type="text" name="nameSearch" value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} placeholder="Search Product" className="py-2 bg-transparent border-0 rounded-0" />
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

                                        {productUse.map((u) => (
                                            <Form.Check inline key={u[0]} checked={useSearch.includes(u[0].toString())} label={u[1]} name="use" value={u[0]} onChange={updateUsage} />
                                        ))}

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Scent Profile</Accordion.Header>
                                    <Accordion.Body>

                                        {productScent.map((s) => (
                                            <Form.Check key={s[0]} checked={scentSearch.includes(s[0].toString())} label={s[1]} name="use" value={s[0]} onChange={updateScent} />
                                        ))}

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Health Benefits</Accordion.Header>
                                    <Accordion.Body>

                                        {productBenefits.map((b) => (
                                            <Form.Check key={b[0]} checked={benefitsSearch.includes(b[0].toString())} label={b[1]} name="use" value={b[0]} onChange={updateBenefits} />
                                        ))}

                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            <div className="mt-4 d-grid gap-2">
                                <button className="btn search-btn-pri rounded-0 p-2" onClick={search}>Search</button>
                                <button className="btn search-btn-sec rounded-0 p-2" onClick={resetSearch}>Clear All Filters</button>
                            </div>
                        </div>
                    </div>

                    {/* Search Filter */}
                    <div className="search d-none d-md-block col-12 col-md-3 mb-5">
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
                                        <Form.Check inline key={u[0]} checked={useSearch.includes(u[0].toString())} label={u[1]} name="use" value={u[0]} onChange={updateUsage} />
                                    ))}

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Scent Profile</Accordion.Header>
                                <Accordion.Body>

                                    {productScent.map((s) =>(
                                        <Form.Check key={s[0]} checked={scentSearch.includes(s[0].toString())} label={s[1]} name="use" value={s[0]} onChange={updateScent} />
                                    ))}

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Health Benefits</Accordion.Header>
                                <Accordion.Body>

                                    {productBenefits.map((b) => (
                                        <Form.Check key={b[0]} checked={benefitsSearch.includes(b[0].toString())} label={b[1]} name="use" value={b[0]} onChange={updateBenefits} />
                                    ))}
                                   
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        
                        <div className="mt-4 d-grid gap-2">
                            <button className="btn search-btn-pri rounded-0 p-2" onClick={search}>Search</button>
                            <button className="btn search-btn-sec rounded-0 p-2" onClick={resetSearch}>Clear All Filters</button>
                        </div>
                    </div>
                    
                    {/* Product Listing */}
                    <div className="products mb-5 col-12 col-md-9">
                        <div className="pb-3 row row-cols-2 row-cols-md-2 row-cols-lg-3 g-3 g-md-4">
                            {products.map((p) => (
                                <div className="col" key={p._id}>
                                    {/* Card */}
                                    <div className="card d-flex flex-column justify-content-between border-0 rounded-0 h-100 bg-transparent">
                                        {/* Card Header */}
                                        <div class="wrapper">
                                            <Link to={"/products/" + p.id} className="text-decoration-none text-reset">
                                                {/* Card Img */}
                                                <div className="img">
                                                    <img src={p.image} className="card-img-top rounded-0" alt="..." />
                                                </div>
                                                {/* Card Body */}
                                                <div className="d-flex row justify-content-between mt-3 mx-1">
                                                    <div className="col-12 col-md-7">
                                                        <p className="product-title">{p.essentialoil.name} <span className="small-text">({p.size.size})</span></p>
                                                    </div>
                                                    <div className="col-12 col-md-5">
                                                        <p className="product-title text-md-end text-start"><span>S${p.price_sgd}</span></p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        {/* Card Footer */}
                                        <div className="p-0 bg-transparent border-0 rounded-0">
                                            <div className="d-grid">
                                                <button className="btn rounded-0 p-2 addtocart-btn" onClick={() => { addToCart(p.id) }}>
                                                    Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}