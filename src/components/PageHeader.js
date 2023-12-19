import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import { pages } from "../constants/common"

export default function PageHeader({data = {}, dataLoaded, title, description, children}) {

    const navigate = useNavigate()
    const location = useLocation()
    const [pageData, setData] = useState({})
    const [crumbsArr, setCrumbsArr] = useState([])
    const [loaded, setLoaded] = useState(false)
    const isProductPage = location.pathname.includes('/products/')
    const lightMode = isProductPage ? " light" : ""
    const productDataLoaded = isProductPage && loaded
    
    useEffect(() => {
        prepareCrumbs()   
    }, [location.pathname, pageData])

    useEffect(() => {
        Object.keys(data).length > 0 && setData(data)
    },[data])

    useEffect(() => {
        if (dataLoaded) {
            setLoaded(true)
        }
    },[dataLoaded])

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

    const renderCrumbSkeleton = () => (
        <div className="d-flex justify-content-center">
            <div className="skeleton-block p-0" style={{ width: "30%", height: "20px" }}></div>
        </div>
    )

    const renderCrumbs = () => (
        <Breadcrumb className="b-crumb d-flex justify-content-center">
            {crumbsArr.map((crumb, index) => {
                return (
                    (index !== crumbsArr.length - 1) &&
                    <Breadcrumb.Item key={index} onClick={() => navigate(crumb.path)}>
                        {crumb.name}
                    </Breadcrumb.Item>
                )
            })}
            <Breadcrumb.Item active>
                {crumbsArr[crumbsArr.length - 1].name}
            </Breadcrumb.Item>
        </Breadcrumb>
    )

    return (
        <div className={"page-header px-4 mb-0 mx-auto" + lightMode}>
            {isProductPage
                ? ( productDataLoaded ? renderCrumbs() : renderCrumbSkeleton())
                : ( crumbsArr.length > 0 ? renderCrumbs() : renderCrumbSkeleton())}
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