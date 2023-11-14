import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { leftNavMenu, rightNavMenu, mobileMenu } from "../constants";

export default function Navbar({ loggedIn, mainBannerHeight }) {

	// For navbar states
	const isHomePage = window.location.pathname === '/'
	const [showMenu, setShowMenu] = useState(false)
	const [blur, setBlur] = useState(false)
	const [darkText, setDarkText] = useState(false)
	
	// For responsive screen
	const [width, setWidth] = useState(window.innerWidth)
	const isDesktop = width >= 992

	// refs
	const togglerRef = useRef(null)
	const bannerHeightRef = useRef(0)
	
	useEffect(() => {
		bannerHeightRef.current = mainBannerHeight
	})

	// Navbar menu items
	const loginMenuItem = { 
        name: loggedIn ? "Profile" : "Login",
        link: loggedIn ? "/profile" : "/login",
    }
	
	const rightNavMenuItems = [...rightNavMenu, loginMenuItem]
	const mobileMenuItems = [...mobileMenu, loginMenuItem]

	// Handle events
	const handleWindowResize = () => {
		setWidth(window.innerWidth);
	}
	
	const handleScrollEvent = () => {
		if (window.scrollY > 0 && window.scrollY < bannerHeightRef.current) {
			setBlur(true)
			setDarkText(false)
		} else if (window.scrollY >= bannerHeightRef.current) {
			setBlur(true)
			setDarkText(true)
		} else {
			setBlur(false)
		}
	}
	
	useEffect(() => {
		window.addEventListener('resize', handleWindowResize)
		window.addEventListener("scroll", handleScrollEvent)

		return () => {
			window.removeEventListener('resize', handleWindowResize)
			window.removeEventListener("scroll", handleScrollEvent)
		};
	}, []);

	// Close mobile menu automatically when screen size is Desktop
	useEffect(() => {
		if (isDesktop && showMenu){
			// close Mobile Menu
			setShowMenu(false) 
			togglerRef.current.click()
		}
	}, [width])

	const NavbarClassName = showMenu
		? "navbar navbar-expand-lg fixed-top shadow-lg show-menu"
		: blur 
			? "navbar navbar-expand-lg fixed-top blur"
			: "navbar navbar-expand-lg fixed-top"

	const LogoClassName = "navbar-brand" + (
		!showMenu && isHomePage && !darkText ? " text-white" : ""
	)

	const TogglerClassName = showMenu
		? "navbar-toggler p-0 border-0"
		: isHomePage
			? "navbar-toggler p-0 border-0 text-white"
			: "navbar-toggler p-0 border-0"

	const MobileMenuClassName = showMenu
		? "d-flex flex-fill my-3 justify-content-start d-sm-flex d-md-flex d-lg-none"
		: "d-flex flex-fill my-3 justify-content-start d-sm-flex d-md-flex d-lg-none invisible"

	const NavItemClassName = isHomePage
		? darkText 
			? "navbar-item px-5 border-0 btn"
			: "navbar-item px-5 border-0 btn text-white"
		: "navbar-item px-5 border-0 btn"

	const ProductLogo = () => (
		<a className={LogoClassName} href="/">Aroma.</a>
	)

	return (
		<nav className={NavbarClassName}>
			<div className="container-fluid px-5">
				<div className="logo flex-fill m-auto d-lg-none d-sm-block d-md-block">
					<ProductLogo />
				</div>

				{/* Menu Toggler */}
				<button
					className={TogglerClassName}
					onClick={() => {
						setShowMenu(!showMenu)
					}}
					ref={togglerRef}
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#nav"
					aria-controls="nav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<AiOutlineMenu />
				</button>

				{/* Desktop Menu */}
				<div className="d-flex flex-fill px-5 justify-content-between d-lg-flex d-none">
					<div className="d-flex px-4">
						{leftNavMenu.map((item, index) => (
							<a className={NavItemClassName} href={item.link} key={index} role="button">
								<span className="text-uppercase">{item.name}</span>
							</a>
						))}
					</div>
					<div className="logo">
						<ProductLogo />
					</div>
					<div className="d-flex px-4">
						{rightNavMenuItems.map((item, index) => (
							<a className={NavItemClassName} href={item.link} key={index} role="button">
								<span className="text-uppercase">{item.name}</span>
							</a>
						))}
					</div>
				</div>
				
				{/* Mobile Menu */}
				{!isDesktop && 
					<div className="collapse navbar-collapse" id="nav">
						<div className={MobileMenuClassName}>
							<div className="d-flex flex-column w-100">
								{mobileMenuItems.map((item, index) => (
									<div className="mobile-menu-item" key={index}>
										<a className="navbar-item mobile my-4 border-0 btn text-start" href={item.link} role="button">
											<span className="text-uppercase">{item.name}</span>
										</a>
									</div>
								))}
							</div>
						</div>
					</div>}
			</div>
		</nav>
	)
}