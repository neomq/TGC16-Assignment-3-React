import React, { Fragment, useState, useEffect } from 'react';
import { GoArrowUp } from "react-icons/go";

export default function ScrollToTop() {
    const [showScrollToTop, setShowScrollToTop] = useState(false)

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    const showHideScrollToTop = () => {
        if (window.scrollY > window.innerHeight) {
            setShowScrollToTop(true)
        } else {
            setShowScrollToTop(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', showHideScrollToTop)
        return () => {
            window.removeEventListener('scroll', showHideScrollToTop)
        }
    }, [])

    return (
        <Fragment>
            {showScrollToTop &&
                <div className="scrolltop d-grid gap-2 d-md-flex justify-content-md-end mb-5 me-5">
                    <div className="scroll-btn p-0 d-flex justify-content-center align-items-center" onClick={scrollToTop}>
                        <GoArrowUp color="#E7E4DE" size="22px" />
                    </div>
                </div>
            }
        </Fragment>
    )
}