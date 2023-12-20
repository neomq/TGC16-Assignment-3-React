import React from 'react'
import { featuredContent } from "../../constants/common"

export default function Feature() {

    return (
        <div className="section">
            <div className="section-content">
                <div className="section-header px-2 w-75 m-auto">
                    <p className="section-title mb-1 text-center">Explore Essential Oils</p>
                    <p className="section-subtitle pb-2 text-center">Transform your home into a sanctuary of serenity with our premium essential oils, crafted to enhance both mental clarity and physical vitality.</p>
                </div>
                <div className="section-body row row-cols-1 row-cols-md-3 g-3 mt-4 mb-5 m-auto">
                    {/* card */}
                    {featuredContent.map((item, index) => {
                        const className = index === featuredContent.length - 1
                            ? "col p-0"
                            : "col p-0 pe-md-3"
                        return (
                            <div className={className} key={index}>
                                <div className="feature-card card h-100">
                                    <div className="card-body header" style={{
                                        backgroundImage: `url(${item.image})`,
                                    }}>
                                        <div className="pb-5" >
                                            <p className="card-label m-0 text-uppercase text-white">{item.label}</p>
                                            <h5 className="card-title text-white m-0 mt-3">{item.title}</h5>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text m-0">{item.description}</p>
                                    </div>
                                    <div className="card-footer border-0 bg-transparent">
                                        <button type="button" className="btn card-btn text-uppercase">{item.button}</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}