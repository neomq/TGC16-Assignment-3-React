import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import { leftNavMenu, rightNavMenu, mobileMenu } from "../constants/constants";
import API from '../constants/API';
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export default function Navbar({ loggedIn, setLoggedIn, user }) {

	const navigate = useNavigate()
	const userSession = Object.keys(user).length > 0

	// For navbar states
	const isLanding = ['/', '/login', '/register'].includes(window.location.pathname)
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
		if (window.scrollY > 5) {
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
		if (isDesktop && showMenu) {
			closeMobileMenu()
		}
	}, [width])

	// call logout
	const logout = async () => {
		closeMobileMenu()
		const response = await axios.post(BASE_URL + API.LOGOUT, {
			'refreshToken': localStorage.getItem('refreshToken')
		})
		if (response.data) {
			localStorage.clear()
			setLoggedIn(false)
			navigate('/')
		}
	}

	const navigateToPage = (link) => {
		if (!isDesktop) {
			closeMobileMenu()
		}
		navigate(link)
	}

	// Custom css classes
	const NavbarCustomClass = showMenu && !isDesktop
		? "h-100 d-flex flex-column fixed-top shadow-lg show-menu"
		: colour
			? "fixed-top colour shadow"
			: "fixed-top"
	const NavCustomClass = showMenu ? "bg-solid shadow-lg" : ""
	const LogoCustomClass = (!showMenu && isLanding && !darkText) ? "text-white" : ""
	const TogglerCustomClass = (!showMenu && isLanding && !darkText) ? "text-white" : ""
	const NavItemCustomClass = isLanding ? darkText ? "" : "text-white" : ""
	const MobileMenuCustomClass = showMenu ? "" : "invisible"

	// Navbar components
	const ProductLogo = () => (
		<div className={"navbar-brand " + LogoCustomClass} onClick={()=>navigate('/')}>Aroma.</div>
	)

	const desktopMenuItem = (link, title, index = 0) => (
		<div className="navbar-item-container" key={index}>
			<div className={"navbar-item border-0 btn " + NavItemCustomClass} onClick={()=>navigateToPage(link)}>
				<span className="text-uppercase">{title}</span>
			</div>
		</div>
	)

	const mobileMenuItem = (link, title, index = 0) => (
		<div className="mobile-menu-item" key={index}>
			<div className="navbar-item mobile my-4 border-0 btn text-start" onClick={()=>navigateToPage(link)}>
				<span className="text-uppercase">{title}</span>
			</div>
		</div>
	)

	const mobileMenuBtn = (handleClick, label) => (
		<button type="button" className="mobilelogin-btn mt-5 text-uppercase" onClick={handleClick}>{label}</button>
	)

	return (
		<nav className={"navbar navbar-expand-lg py-0 " + NavbarCustomClass}>
			<div className={"container-fluid p-4 " + NavCustomClass}>
				<div className="logo flex-fill m-auto d-lg-none d-sm-block d-md-block">
					<ProductLogo />
				</div>

				{/* Menu Toggler */}
				<button
					className={"navbar-toggler p-0 border-0 " + TogglerCustomClass}
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
				<div className="d-flex flex-fill px-4 justify-content-between d-lg-flex d-none">
					<div className="d-flex px-4">
						{leftNavMenu.map((item, index) => (
							desktopMenuItem(item.link, item.name, index)
						))}
					</div>
					<div className="logo">
						<ProductLogo />
					</div>
					<div className="d-flex px-4">
						{rightNavMenuItems.map((item, index) => (
							desktopMenuItem(item.link, item.name, index)
						))}
					</div>
				</div>

				{/* Mobile Menu */}
				{!isDesktop &&
					<div className="collapse navbar-collapse" id="nav">
						<div className={"d-flex flex-fill mt-4 mb-3 justify-content-start d-sm-flex d-md-flex d-lg-none " + MobileMenuCustomClass}>
							<div className="d-flex flex-column w-100">
								{(loggedIn && userSession) &&
									<Fragment>
										<div className="mobile-menu-item">
											<p className="greeting-text my-4">Welcome, {user.name}</p>
										</div>
										{mobileMenuItem("/profile", "Account")}
									</Fragment>
								}
								{mobileMenu.map((item, index) => (
									mobileMenuItem(item.link, item.name, index)
								))}
								{loggedIn ? mobileMenuBtn(logout, "Log Out") : mobileMenuBtn(()=>{navigateToPage('/login')}, "Login")}
							</div>
						</div>
					</div>}
			</div>
		</nav>
	)
}