import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
    const navigate = useNavigate()

    return (
        <div class="footer">
            <div class="footer-content">
                <div class="row">
                    <div class="mb-5 mb-lg-0 col-lg-5">
                        <div className="w-75 w-md-100">
                            <div class="mb-3">
                                <div className="navbar-brand text-white" onClick={() => navigate('/')}>Aroma.</div>
                            </div>
                            <p class="text-white">Hand-poured and hand-crafted in small batches, using natural ingredients, therapeutic grade essential oils and a blend of fine fragrances. Aroma is focused on producing high quality essential oils at accessible prices.</p>
                        </div>
                    </div>
                    <div class="mb-5 mb-lg-0 col-lg-2 col-md-6">
                        <div class="footer-title text-uppercase text-white mb-3">Shop</div>
                        <ul class="list-unstyled">
                            <li><div class="text-white">Products</div></li>
                            <li><div class="text-white">Stores</div></li>
                            <li><div class="text-white">Our Blog</div></li>
                            <li><div class="text-white">About Us</div></li>
                        </ul>
                    </div>
                    <div class="mb-5 mb-lg-0 col-lg-2 col-md-6">
                        <div class="footer-title text-uppercase text-white mb-3">Services</div>
                        <ul class="list-unstyled">
                            <li><div class="text-white">Login</div></li>
                            <li><div class="text-white">Register</div></li>
                            <li><div class="text-white">Shipping</div></li>
                            <li><div class="text-white">Returns</div></li>
                        </ul>
                    </div>
                    <div class="mb-5 mb-lg-0 col-lg-3">
                        <div class="footer-title text-uppercase text-white mb-3">Never miss a drop</div>
                        <p class="mb-3 text-white">Follow us on our social media and be the first to know about our product launches and discounts.</p>
                        <div className="d-flex flex-row">
                            <div className="me-2"><FaFacebook color="white" fontSize="20px"/></div>
                            <div><FaInstagram color="white" fontSize="22px"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}