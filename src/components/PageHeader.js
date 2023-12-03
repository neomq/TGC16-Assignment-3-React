import React from 'react';
import { Breadcrumb } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function ProductsHeader({state = {}, name, title, description, children}) {
    const { navigateFrom, navigateTo } = state
    const navigate = useNavigate()
    const isProductPage = window.location.pathname.includes('/products/')
    const lightMode = isProductPage ? " light" : ""

    return (
        <div className={"page-header py-4 py-lg-5 px-4 mb-0 mx-auto" + lightMode}>
            <Breadcrumb className="b-crumb d-flex justify-content-center">
                {navigateFrom &&
                    <Breadcrumb.Item
                        onClick={() => {navigate(navigateFrom.path)}}>
                            {navigateFrom.name}
                    </Breadcrumb.Item>}
                <Breadcrumb.Item active>
                    {navigateTo ? navigateTo.name : name}
                </Breadcrumb.Item>
            </Breadcrumb>

            <div className="d-flex justify-content-center">
                <div className="page-header-content">
                    {title && <p className="mt-3 mb-0 px-3 page-title text-center">{title}</p>}
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