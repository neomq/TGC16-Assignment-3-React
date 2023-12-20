import React from 'react';


export default function Preloader() {
    
    return (
        <div className="preloader d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column align-items-center h-100">
                <div className="loader-body">
                    <div className="d-flex flex-column justify-content-between align-items-center h-100">
                        <div className="navbar-brand opacity-25">Aroma.</div>
                        
                        <div className="loader-section fade-in">
                            <div className="loader mx-auto"></div>
                            {/* <p className="loading mt-3 mb-1 ms-2">Infusing<span className="navbar-brand" style={{ fontSize: "16px" }}> Aroma.</span> into every pixel </p> */}
                        </div>
                        <div className="mb-4 opacity-25">_</div>
                    </div>
                </div>
            </div>
        </div>
    )
}