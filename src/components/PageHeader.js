import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import { pages } from "../constants/constants"

export default function PageHeader({data = {}, title, description, children}) {

    const navigate = useNavigate()
    const location = useLocation()
    const [pageData, setData] = useState({})
    const [crumbsArr, setCrumbsArr] = useState([])
    const isProductPage = location.pathname.includes('/products/')
    const lightMode = isProductPage ? " light" : ""
    
    useEffect(() => {
        prepareCrumbs()   
    }, [location.pathname, pageData])

    useEffect(() => {
        Object.keys(data).length > 0 && setData(data)
    },[data])

    const prepareCrumbs = () => {
        const pathArr = ("home" + location.pathname).split('/')
        let crumbsData = []

        if (isProductPage && Object.keys(pageData).length > 0){
            const indexOfEoId = pathArr && pathArr.findIndex(item => item === 'products') + 1
            const newPathArr = [...pathArr]
            newPathArr[indexOfEoId] = `${pageData.name} ${pageData.products[0].itemtype.name}`
            crumbsData = newPathArr
        } else {
            crumbsData = pathArr
        }
        setCrumbs(crumbsData)
    }

    const setCrumbs = (arr) => {
        let crumbsDataArr = []
        arr.forEach(item => {
            crumbsDataArr.push({
                name: item,
                path: pages[item] ? pages[item] : ''
            })
        })
        setCrumbsArr(crumbsDataArr)
    }

    return (
        <div className={"page-header px-4 mb-0 mx-auto" + lightMode}>
            {crumbsArr.length > 0 && 
                <Breadcrumb className="b-crumb d-flex justify-content-center">
                    {crumbsArr.map((crumb, index) => {
                        return (
                            (index !== crumbsArr.length -1) && 
                                <Breadcrumb.Item key={index} onClick={()=>navigate(crumb.path)}>
                                    {crumb.name}
                                </Breadcrumb.Item>
                        )
                    })}
                    <Breadcrumb.Item active>
                        {crumbsArr[crumbsArr.length - 1].name}
                    </Breadcrumb.Item>
                </Breadcrumb>}

            <div className="d-flex justify-content-center">
                <div className="page-header-content">
                    {title && <p className="mt-4 mb-0 px-3 page-title text-center">{title}</p>}
                    {description && <p className="mt-3 mb-0 page-subtitle text-center mx-auto">{description}</p>}
                </div>
            </div>

            {children && 
                <div className="d-flex justify-content-center mt-5">
                    {children}
                </div>
            }
        </div>
    )
}