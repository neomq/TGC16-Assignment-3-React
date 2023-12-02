import React, { useState, useEffect, Fragment } from "react"
import { Form, Accordion } from 'react-bootstrap'
import { CiSearch } from "react-icons/ci"
import { TfiClose } from "react-icons/tfi"
import { PiSlidersHorizontalLight } from "react-icons/pi"
import { useNavigate } from "react-router-dom"
import { pages } from "../constants/constants"
import { 
    allProducts,
    allTypes,
    allUsages,
    allScents,
    allBenefits,
    productSearch,
} from "../utils/API"
import { 
    prepareProducts,
    displaySize,
    displayPrice,
} from "../helpers/productHelpers"
import {
    updateUsage,
    updateScent,
    updateBenefits,
} from "../helpers/searchHelpers"
import TextInput from "../components/TextInput"
import PageHeader from "../components/PageHeader"
import { getObjectKey } from "../utils/common"
export default function ProductListing() {
    const [products, setProducts] = useState([])
    const [productType, setProductType] = useState([])
    const [productUse, setProductUse] = useState([])
    const [productScent, setProductScent] = useState([])
    const [productBenefits, setProductBenefits] = useState([])
    const [displayProducts, setDisplay] = useState([])

    // kwyword search
    const [searchActive, setSearchActive] = useState(false)
    const [nameSearch, setNameSearch] = useState("")
    const [searchIsFocused, setFocused] = useState(false)
    
    //filters
    const [typeSearch, setTypeSearch] = useState("")
    const [useSearch, setUseSearch] = useState([])
    const [scentSearch, setScentSearch] = useState([])
    const [benefitsSearch, setBenefitsSearch] = useState([])
    const [clearFilter, setClearFilter] = useState(false)
    const [numOfFilters, setNumOfFilters] = useState(0)

    const pageName = getObjectKey(pages, window.location.pathname)
    const pageDesc = "Enhance your everyday with 100% pure natural essential oils extracted from nature, all around the world."

    const navigate = useNavigate()

    useEffect(() => {
        fetchProductListings()
    }, [])

    useEffect(() => {
        if (products.length > 0) {
            renderProducts(products)
        }
    }, [products])

    const fetchProductListings = async () => {
        const productsData = await allProducts()
        const typesData = await allTypes()
        const usageData = await allUsages()
        const scentData = await allScents()
        const benefitsData = await allBenefits()
        
        setProducts(productsData)
        setProductType(typesData)
        setProductUse(usageData)
        setProductScent(scentData)
        setProductBenefits(benefitsData)
    }

    const renderProducts = (products) => {
        const productsToDisplay = prepareProducts(products)
        if (productsToDisplay && productsToDisplay.length > 0) {
            setDisplay(productsToDisplay)
        }
    }

    const searchProducts = async () => {
        let searchObj = {}
        let filterCount = 0
        if (clearFilter && nameSearch) {
            searchObj.name = nameSearch
        } else if (clearFilter && !nameSearch) {
            resetSearch()
            setSearchActive(false)
        } else {
            if (nameSearch) {
                searchObj.name = nameSearch
            }
            if (typeSearch && typeSearch !== "Collection") {
                searchObj.type = typeSearch
                filterCount += 1
            }
            if (useSearch && useSearch.length > 0) {
                searchObj.use = useSearch
                filterCount += useSearch.length
            }
            if (scentSearch && scentSearch.length > 0) {
                searchObj.scent = scentSearch
                filterCount += scentSearch.length
            }
            if (benefitsSearch && benefitsSearch.length > 0) {
                searchObj.benefits = benefitsSearch
                filterCount += benefitsSearch.length
            }
        }
        const searchResults = await productSearch(searchObj)
        renderProducts(searchResults)
        setClearFilter(false)
        setNumOfFilters(filterCount)
    }

    useEffect(()=> {
        if (clearFilter) {
            searchProducts()
        }
    }, [clearFilter])

    // reset when no input in search field
    useEffect(() => {
        if (!nameSearch) {
            resetSearch()
            setSearchActive(false)
        }
    }, [nameSearch])

    const resetSearch = async () => {
        setNameSearch("")
        clearSearchFilters()
        renderProducts(products)
    }

    const handleClearFilter = () => {
        setClearFilter(true)
        clearSearchFilters()
    }

    const clearSearchFilters = () => {
        setTypeSearch("")
        setUseSearch([])
        setScentSearch([])
        setBenefitsSearch([])
    }

    const searchBar = () => {
        const customClass = searchIsFocused ? " focus" : ""
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                setSearchActive(true)
                searchProducts() 
            }
        }
        return (
            <div className={"input-box d-flex flex-row align-items-center px-2" + customClass}>
                <div className="me-2"><CiSearch color="#3B3530" fontSize="22px" /></div>
                <TextInput
                    type="text"
                    name="nameSearch"
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                    className="main-search py-2 bg-transparent border-0 rounded-0"
                    placeholder="Search Product"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                {nameSearch && 
                    <div
                        className="ms-2 clear-search-btn"
                        onClick={()=>resetSearch()}>
                        <TfiClose color="#3B3530" fontSize="14px" />
                    </div>
                }
            </div>
        )
    }

    const searchFilters = () => {
        return(
            <Fragment>
                <Form.Select
                    name="typeSearch"
                    value={typeSearch}
                    onChange={(e) => setTypeSearch(e.target.value)}
                    className="rounded-0 bg-transparent py-2 px-3">
                    <option>Collection</option>
                    {productType.map((types) =>
                        <option key={types[1]} value={types[1]}>
                            {types[1]}
                        </option>
                    )}
                </Form.Select>
                <Accordion defaultActiveKey="0" className="mt-3">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Usage</Accordion.Header>
                        <Accordion.Body>
                            {productUse.map((use) => (
                                <Form.Check
                                    inline key={use[0]}
                                    checked={useSearch.includes(use[0].toString())}
                                    label={use[1]}
                                    name="use"
                                    value={use[0]}
                                    onChange={(e) => 
                                        updateUsage(e, useSearch, setUseSearch)
                                    }
                                />
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Scent</Accordion.Header>
                        <Accordion.Body>
                            {productScent.map((scent) => (
                                <Form.Check
                                    key={scent[0]}
                                    checked={scentSearch.includes(scent[0].toString())}
                                    label={scent[1]}
                                    name="scent"
                                    value={scent[0]}
                                    onChange={(e) => 
                                        updateScent(e, scentSearch, setScentSearch)
                                    }
                                />
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Accordion defaultActiveKey="2">
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Benefits</Accordion.Header>
                        <Accordion.Body>
                            {productBenefits.map((benefit) => (
                                <Form.Check
                                    key={benefit[0]}
                                    checked={benefitsSearch.includes(benefit[0].toString())}
                                    label={benefit[1]}
                                    name="benefit"
                                    value={benefit[0]}
                                    onChange={(e) => 
                                        updateBenefits(e, benefitsSearch, setBenefitsSearch)
                                    }
                                />
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div className="mt-3 d-grid gap-2">
                    <button
                        className="shop-btn btn text-uppercase"
                        onClick={()=>{searchProducts()}}
                    >Apply</button>
                </div>
            </Fragment>
        )
    }

    const displayListingTitle = () => {
        const hasSearch = searchActive && nameSearch
        const searchWord = () => {
            return <span className="searchword">{hasSearch ? `"${nameSearch}"` : ""}</span> 
        }
        return (
            <Fragment>
                {displayProducts && displayProducts.length > 0 &&
                    <p className="listing-title">
                        {hasSearch
                            ? (<>{displayProducts.length} results for {searchWord()}</>)
                            : (`${displayProducts.length} Product(s)`)
                        }
                        <span>&nbsp;&nbsp;|&nbsp;&nbsp;{numOfFilters} Filter(s)</span>
                    </p>
                }
            </Fragment>
        )
    }

    const navigateToProduct = (id, name, type) => {
        navigate(`${pages.products}/${id}`, {
            state: {
                navigateFrom: {
                    name: pageName,
                    path: window.location.pathname
                },
                navigateTo: {
                    name: `${name} ${type}`
                }
            }
        })
    }

    return (
        <Fragment>
            <PageHeader
                    name={pageName}
                    title="Shop Essential Oils"
                    description={pageDesc}>
                    {searchBar()}
                </PageHeader>
            <div className="page-container">
                

                <div className="page-body mt-md-5 row">
                {/* Mobile Filter Buttons*/}
                    <div className="py-0 d-flex my-4 d-md-none justify-content-between">
                        <button className="btn filter-btn d-flex align-items-center py-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFilter" aria-expanded="false" aria-controls="collapseFilter">
                            <PiSlidersHorizontalLight color="#3B3530" fontSize="22px"/>
                            <span className="p-2 px-2 mb-0">Filter</span>
                        </button>
                        <button className="transparent-btn" onClick={()=>{handleClearFilter()}}>
                            Clear Filter
                        </button>
                    </div>

                    {/* Mobile Filter */}
                    <div className="collapse d-md-none" id="collapseFilter">
                        <div className="search col-12 col-md-3 mb-5">
                            {searchFilters()}
                        </div>
                    </div>

                    <div className="d-flex flex-row">
                    {/* Desktop Filter */}
                    <div className="search filters d-none d-md-block mb-5">
                        <div className="d-flex flex-row justify-content-between align-items-center mb-3">
                            <p className="filter-title m-0">Filters</p>
                            <button className="flat-btn btn text-uppercase" onClick={()=>{handleClearFilter()}}>
                                Clear
                            </button>
                        </div>
                        {searchFilters()}
                    </div>

                    {/* Product Listing */}
                    <div className="products">
                        <div className="listing-title">
                            {displayListingTitle()}
                        </div>
                        <div className="row row-cols-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 g-3 g-md-4">
                            {displayProducts && displayProducts.map((product, index) => (
                                <div className="col" key={index}>
                                    {/* Card */}
                                    <div className="card d-flex flex-column justify-content-between border-0 rounded-0 h-100 bg-transparent">
                                        {/* Card Header */}
                                        <div onClick={()=>navigateToProduct(product.eo_id, product.name, product.type)}>
                                                {/* Card Img */}
                                                <div className="img">
                                                    <img src={product.image} className="card-img-top rounded-0" alt="..." />
                                                </div>
                                                {/* Card Body */}
                                                <div className="d-flex row justify-content-between my-3 mx-0">
                                                    <p className="product-label text-uppercase p-0">{product.type}</p>
                                                    <p className="product-title m-0 p-0">{product.name} {product.type}</p>
                                                    <p className="product-title m-0 mt-2 p-0">{displaySize(product.size)}</p>
                                                    <p className="product-title m-0 mt-3 p-0">{displayPrice(product.price)}</p>
                                                </div>
                                            {/* </Link> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}