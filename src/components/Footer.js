import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFacebook, FaInstagram } from "react-icons/fa"
import { TbBrandYoutubeFilled } from "react-icons/tb"
import { pages, footerLinks } from "../constants/common"

export default function Footer() {
    const navigate = useNavigate()
    const { home } = pages

    const navigateToPage = (link) => {
        navigate(link)
    }

    const shopLinks = footerLinks.shop
    const serviceLinks = footerLinks.services

    const renderFooterLink = ({title, link}, index) => {
        return (
            <li key={index}>
                <div className="mb-1 footer-link text-white" onClick={()=>navigateToPage(link)}>{title}</div>
            </li>
        )
    }
  
    return (
        <div className="footer d-flex justify-content-center">
            <div className="footer-content">
                <div className="row m-0">
                    <div className="mb-5 p-0 mb-lg-0 col-lg-5">
                        <div className="footer-section">
                            <div className="mb-3">
                                <div className="navbar-brand text-white" onClick={()=>navigateToPage(home)}>Aroma.</div>
                            </div>
                            <p className="text-white">Hand-poured and hand-crafted using natural ingredients, therapeutic grade essential oils and a blend of fine fragrances. Aroma is focused on producing high quality essential oils at accessible prices.</p>
                        </div>
                    </div>
                    <div className="mb-5 p-0 mb-lg-0 col-lg-4 col-md-9">
                        <div className="row m-0">
                            <div className="col-6 p-0">
                                <div className="footer-title text-uppercase text-white mb-3">Shop</div>
                                <ul className="list-unstyled">
                                    {shopLinks.map((item, index) => (
                                        renderFooterLink(item, index)
                                    ))}
                                </ul>
                            </div>
                            <div className="col-6 p-0">
                                <div className="footer-title text-uppercase text-white mb-3">Services</div>
                                <ul className="list-unstyled">
                                    {serviceLinks.map((item, index) => (
                                        renderFooterLink(item, index)
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5 p-0 mb-lg-0 col-lg-3 col-md-3">
                        <div className="footer-title text-uppercase text-white mb-3">Never miss a drop</div>
                        <p className="mb-3 text-white">Follow us on our social media and be the first to know about our product launches and discounts.</p>
                        <div className="d-flex flex-row">
                            <div className="me-3"><FaFacebook color="white" fontSize="19px"/></div>
                            <div className="me-3"><FaInstagram color="white" fontSize="22px"/></div>
                            <div><TbBrandYoutubeFilled color="white" fontSize="22px"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}