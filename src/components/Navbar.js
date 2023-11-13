import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { leftNavMenu, rightNavMenu, mobileMenu } from "../constants";

export default function Navbar({ loggedIn }) {

	const [width, setWidth] = useState(window.innerWidth);
	const [showMenu, setShowMenu] = useState(false)
	const isHomePage = window.location.pathname === '/'
	const isDesktop = width >= 992
	const togglerRef = useRef(null)

	const loginMenuItem = { 
        name: loggedIn ? "Profile" : "Login",
        link: loggedIn ? "/profile" : "/login",
    }

	const rightNavMenuItems = [...rightNavMenu, loginMenuItem]
	const mobileMenuItems = [...mobileMenu, loginMenuItem]
	
	useEffect(() => {
		const handleWindowResize = () => {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', handleWindowResize);
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	useEffect(() => {
		if (isDesktop && showMenu){
			// close Mobile Menu
			setShowMenu(false) 
			togglerRef.current.click()
		}
	}, [width])

	const NavbarClassName = showMenu
		? "navbar navbar-expand-lg fixed-top shadow-lg show-menu"
		: "navbar navbar-expand-lg fixed-top"

	const LogoClassName = showMenu
		? "navbar-brand"
		: isHomePage 
			? "navbar-brand text-white"
			: "navbar-brand"

	const TogglerClassName = showMenu
		? "navbar-toggler p-0 border-0"
		: isHomePage
			? "navbar-toggler p-0 border-0 text-white"
			: "navbar-toggler p-0 border-0"

	const MobileMenuClassName = showMenu
		? "d-flex flex-fill my-3 justify-content-start d-sm-flex d-md-flex d-lg-none"
		: "d-flex flex-fill my-3 justify-content-start d-sm-flex d-md-flex d-lg-none invisible"

	const NavItemClassName = isHomePage
		? "navbar-item px-5 border-0 btn text-white"
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
						{leftNavMenu.map((item) => (
							<a className={NavItemClassName} href={item.link} role="button">
								<span className="text-uppercase">{item.name}</span>
							</a>
						))}
					</div>
					<div className="logo">
						<ProductLogo />
					</div>
					<div className="d-flex px-4">
						{rightNavMenuItems.map((item) => (
							<a className={NavItemClassName} href={item.link} role="button">
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
								{mobileMenuItems.map((item) => (
									<div className="mobile-menu-item">
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