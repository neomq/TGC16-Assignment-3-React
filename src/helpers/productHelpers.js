import React, { Fragment } from "react"

// for product listings
const prepareProducts = (productArray) => {
    if (productArray && productArray.length > 0) {
        // prune products data
        const pruned = productArray.map(item => {
            const { id, essentialoil, itemtype, image, size, price_sgd } = item
            let productInfo = {
                pd_id: id,
                eo_id: essentialoil.id,
                name: essentialoil.name,
                type: itemtype.name,
                image: image,
                size: size,
                price: price_sgd,
            }
            return productInfo
        })
        // group products by property name
        const grouped = pruned.reduce((acc, obj) => {
            const current = acc.find(item => item.name === obj.name)
            if (current) {
                if (Array.isArray(current.size)){
                    current.size.push(obj.size)
                    current.price.push(obj.price)
                    current.pd_id.push(obj.pd_id)
                } else {
                    current.size = [current.size, obj.size]
                    current.price = [current.price, obj.price]
                    current.pd_id = [current.pd_id, obj.pd_id]
                }
            } else {
                acc.push({
                    ...obj,
                    size: obj.size,
                    price: obj.price,
                    pd_id: obj.pd_id
                })
            }
            return acc
        }, [])
        return grouped
    }
}

// display product size
const displaySize = (sizeValue) => {
    const isMultiSize = Array.isArray(sizeValue)
    let sizeArr = []
    if (isMultiSize) {
        sizeValue.forEach(val => {
            sizeArr.push(`${val.size}ml`)
        })
    }
    const singleSize = `${sizeValue.size}ml`
    const multiSize = () => (
        <Fragment>
            {sizeArr.map((size, index) => (
                <span className="size-tag me-1" key={index}>{size}</span>
            ))}
        </Fragment>
    )
    return (
        <Fragment>
            {isMultiSize ? multiSize() :  <span className="size-tag">{singleSize}</span>}
        </Fragment>
    )
}

// display product price
const displayPrice = (priceValue) => {
    const isManyPrice = Array.isArray(priceValue)
    let lowestPrice = ""
    const compare = (a, b) => { return a - b }
    if (isManyPrice){
        const sorted = priceValue.sort(compare)
        lowestPrice = sorted[0]
    }
    return <span className="price-tag">{isManyPrice ? `from S$${lowestPrice}` : `S$${priceValue}`}</span>
}

export {
    prepareProducts,
    displaySize,
    displayPrice,
}