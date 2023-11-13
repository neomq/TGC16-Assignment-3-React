import React from 'react';
import { AiOutlineMenu } from "react-icons/ai";

export default function Navbar({ loggedIn, showMenu, setShowMenu }) {

	const NavbarClassName = showMenu
		? "navbar navbar-expand-lg fixed-top shadow-lg show-menu"
		: "navbar navbar-expand-lg fixed-top"

	const LogoClassName = showMenu
		? "navbar-brand"
		: "navbar-brand text-white"

	const TogglerClassName = showMenu
		? "navbar-toggler p-0 border-0 open"
		: "navbar-toggler p-0 border-0"

	const MobileMenuClassName = showMenu
		? "d-flex flex-fill mt-3 mb-1 justify-content-start d-sm-flex d-md-flex d-lg-none"
		: "d-flex flex-fill mt-3 mb-1 justify-content-start d-sm-flex d-md-flex d-lg-none invisible"

	return (
		<nav className={NavbarClassName}>
			<div className="container-fluid px-4">
				{/* Logo */}
				<div className="logo flex-fill m-auto d-lg-none d-sm-block d-md-block">
					<a className={LogoClassName} href="/">Aroma.</a>
				</div>

				{/* Menu Toggler */}
				<button
					className={TogglerClassName}
					onClick={() => {
						setShowMenu(!showMenu)
					}}
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#nav"
					aria-controls="nav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<AiOutlineMenu />
				</button>

				<div className="collapse navbar-collapse" id="nav">
					{/* Desktop Menu */}
					<div className="d-flex flex-fill px-5 justify-content-between d-lg-flex d-none">
						{/* Shop & About */}
						<div className="d-flex px-5">
							<a className="navbar-item px-5 border-0 btn" href="/products" role="button">
								<span className="text-uppercase text-white">Shop</span>
							</a>
							<a className="navbar-item px-5 border-0 btn" href="/" role="button">
								<span className="text-uppercase text-white">About</span>
							</a>
						</div>
						{/* Logo */}
						<div className="logo">
							<a className="navbar-brand text-white" href="/">Aroma.</a>
						</div>
						{/* Login & Cart */}
						<div className="d-flex px-5">
							<a className="navbar-item px-5 border-0 btn" href={loggedIn ? "/profile" : "/login"} role="button">
								<span className="text-uppercase text-white">{loggedIn ? "profile" : "login"}</span>
							</a>
							<a className="navbar-item px-5 border-0 btn" href="/cart" role="button">
								<span className="text-uppercase text-white">cart</span>
							</a>
						</div>
					</div>

					{/* Mobile Menu */}
					<div className={MobileMenuClassName}>
						<div className="d-flex flex-column">
							<a className="navbar-item mobile my-3 border-0 btn text-start" href="/products" role="button">
								<span className="text-uppercase">Shop</span>
							</a>
							<a className="navbar-item mobile my-3 border-0 btn text-start" href="/" role="button">
								<span className="text-uppercase">About us</span>
							</a>
							<a className="navbar-item mobile my-3 border-0 btn text-start" href="/cart" role="button">
								<span className="text-uppercase">cart</span>
							</a>
							<a className="navbar-item mobile my-3 border-0 btn text-start" href={loggedIn ? "/profile" : "/login"} role="button">
								<span className="text-uppercase">{loggedIn ? "profile" : "login"}</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}