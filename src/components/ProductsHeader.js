import React from 'react';
import { Breadcrumb } from 'react-bootstrap'

export default function ProductsHeader({children}) {
    return (
        <div className="page-header py-5 px-4 mb-0 mx-auto">
            <Breadcrumb className="b-crumb mb-2 d-flex justify-content-center">
                <Breadcrumb.Item active>Products</Breadcrumb.Item>
            </Breadcrumb>

            <div className="d-flex justify-content-center">
                <div className="page-header-content">
                    <p className="mb-0 px-3 page-title text-center">Shop Essential Oils</p>
                    <p className="mt-4 mb-0 page-subtitle text-center mx-auto">Enhance your everyday with 100% pure natural essential oils extracted from nature, all around the world.</p>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-5">
                {children}
            </div>
        </div>
    )
}