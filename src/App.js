import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect, Fragment } from 'react';
import AuthWrapper, { useAuth } from './components/AuthWrapper';
import ProductListing from './pages/ProductListing';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const { isloggedIn, userData, authChecked } = useAuth()

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const location = useLocation()

  const authProps = {
    loggedIn: loggedIn,
    setLoggedIn: setLoggedIn,
    user: user,
    setUser: setUser,
  }
  
  useEffect(() => {
    window.scrollTo(0, -1)
  }, [location])

  useEffect(() => {
    if (authChecked) {
      setLoggedIn(isloggedIn)
      setUser(userData)
    }
  },[authChecked])

  return (
      <Fragment>
        <AuthWrapper loggedIn={loggedIn}>
          <Navbar {...authProps}/>
          <Routes>
            {/* Home route */}
            <Route path="/" element={<Home/>}/>

            {/* Product Listing route */}
            <Route path="/products" element={<ProductListing/>} />

            {/* Individual product route */}
            <Route path="/products/:essentialoil_id" element={<Product/>} />

            {/* Cart route */}
            <Route path="/cart" element={<Cart {...authProps}/>} />

            {/* Login route */}
            <Route path="/login" element={<Login {...authProps}/>} />

            {/* Profile route */}
            <Route path="/profile" element={<Profile {...authProps}/>} />

            {/* Register route */}
            <Route path="/register" element={<Register/>} />

            {/* Checkout success route */}
            <Route path="/paymentsuccess" element={<CheckoutSuccess/>} />
          </Routes>
          <ScrollToTop />
          <Footer />
        </AuthWrapper>
      </Fragment>
  )
}

export default App;
