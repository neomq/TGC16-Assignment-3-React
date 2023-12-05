import API  from "../constants/APIs"
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

const essentialOilById = async (essentialoil_id) => {
    const response = await axios.get(BASE_URL + API.ESSENTIAL_OIL + essentialoil_id)
    const data = response.data
    return data
}

const allCartItems = async (user_id) => {
    const response = await axios.get(BASE_URL + API.CART + user_id)
    const data = response.data
    return data
}

const addItemToCart = async (user_id, id) => {
    const response = await axios.get(BASE_URL + API.CART + user_id + "/add/" + id)
    const status = response.status
    return status
}

const deleteItemFromCart = async (user_id, product_id) => {
    const response = await axios.get(BASE_URL + API.CART + user_id + /remove/ + product_id)
    const status = response.status
    return status
}

const updateCartItemQty = async (user_id, product_id, cartItem) => {
   const response = await axios.post(BASE_URL + API.CART + user_id + "/updateQuantity/" + product_id, {
        'newQuantity': cartItem.item_quantity
    })
    const status = response.status
    return status
}

export { 
    allProducts,
    allTypes,
    allUsages,
    allScents,
    allBenefits,
    productSearch,
    essentialOilById,
    addItemToCart,
    allCartItems,
    deleteItemFromCart,
    updateCartItemQty,
}

