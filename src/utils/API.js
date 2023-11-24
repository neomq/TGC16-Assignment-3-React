import API  from "../constants/api"
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL

const allProducts = async () => {
    const response = await axios.get(BASE_URL + API.PRODUCTS)
    const data = response.data
    return data
}

const allTypes = async () => {
    const response = await axios.get(BASE_URL + API.PRODUCT_TYPES)
    const data = response.data
    return data
}

const allUsages = async () => {
    const response = await axios.get(BASE_URL + API.PRODUCT_USAGE)
    const data = response.data
    return data
}

const allScents = async () => {
    const response = await axios.get(BASE_URL + API.PRODUCT_SCENT)
    const data = response.data
    return data
}

const allBenefits = async () => {
    const response = await axios.get(BASE_URL + API.PRODUCT_BENEFITS)
    const data = response.data
    return data
}

const productSearch = async (searchObj) => {
    const response = await axios.post(BASE_URL + API.PRODUCT_SEARCH, searchObj)
    const data = response.data
    return data
}

export { 
    allProducts,
    allTypes,
    allUsages,
    allScents,
    allBenefits,
    productSearch,
}

