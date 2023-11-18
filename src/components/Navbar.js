import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import { leftNavMenu, rightNavMenu, mobileMenu } from "../constants/constants";
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export default function Navbar({ loggedIn, setLoggedIn, user }) {

	const navigate = useNavigate();
	const userSession = Object.keys(user).length > 0

	// For navbar states
	const isHomePage = window.location.pathname === '/'
	const [showMenu, setShowMenu] = useState(false)
	const [colour, setColour] = useState(false)
	const [darkText, setDarkText] = useState(false)

	// For responsive screen
	const [width, setWidth] = useState(window.innerWidth)
	const isDesktop = width >= 992

	// refs
	const togglerRef = useRef(null)

	// Navbar menu items
	const loginMenuItem = { 
        name: loggedIn ? "Account" : "Login",
        link: loggedIn ? "/profile" : "/login",
    }
	
	const rightNavMenuItems = [...rightNavMenu, loginMenuItem]

	// Handle events
	const handleWindowResize = () => {
		setWidth(window.innerWidth);
	}

	const handleScrollEvent = () => {
		if (window.scrollY > 0) {
			setColour(true)
			setDarkText(true)
		} else {
			setColour(false)
			setDarkText(false)
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

	const closeMobileMenu = () => {
		setShowMenu(false) 
		togglerRef.current.click()
	}

	// Close mobile menu automatically when screen size is Desktop
	useEffect(() => {
		if (isDesktop && showMenu){
			closeMobileMenu()
		}
	}, [width])

	// call logout
	const logout = async () => {
		closeMobileMenu()
		const response = await axios.post(BASE_URL + "/api/users/logout", {
			'refreshToken': localStorage.getItem('refreshToken')
		})
		if (response.data) {
			localStorage.clear()
			setLoggedIn(false)
			navigate('/')
		}
	}

	const navigateToLogin = () => {
		closeMobileMenu()
		navigate('/login')
	}

	const NavbarClassName = showMenu
		? "navbar navbar-expand-lg fixed-top shadow-lg show-menu"
		: colour 
			? "navbar navbar-expand-lg fixed-top colour shadow"
			: "navbar navbar-expand-lg fixed-top"

	const LogoClassName = "navbar-brand" + (
		!showMenu && isHomePage && !darkText ? " text-white" : ""
	)

	const TogglerClassName = "navbar-toggler p-0 border-0" + (
		!showMenu && isHomePage && !darkText ? " text-white" : ""
	)

	const MobileMenuClassName = showMenu
		? "d-flex flex-fill mt-4 mb-3 justify-content-start d-sm-flex d-md-flex d-lg-none"
		: "d-flex flex-fill mt-4 mb-3 justify-content-start d-sm-flex d-md-flex d-lg-none invisible"

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
								{(loggedIn && userSession)  && 
									<Fragment>
										<div className="mobile-menu-item">
											<p className="greeting-text my-4">Welcome, {user.name}</p>
										</div>
										<div className="mobile-menu-item">
										<a className="navbar-item mobile my-4 border-0 btn text-start" href={"/profile"} role="button">
											<span className="text-uppercase">Account</span>
										</a>
										</div>
									</Fragment>
								}
								{mobileMenu.map((item, index) => (
									<div className="mobile-menu-item" key={index}>
										<a className="navbar-item mobile my-4 border-0 btn text-start" href={item.link} role="button">
											<span className="text-uppercase">{item.name}</span>
										</a>
									</div>
								))}
								{loggedIn ?
									<button type="button" className="mobilelogin-btn mt-5 text-uppercase" onClick={logout}>Log Out</button>
									: <button type="button" className="mobilelogin-btn mt-5 text-uppercase" onClick={navigateToLogin}>Login</button>}
							</div>
						</div>
					</div>}
			</div>
		</nav>
	)
}