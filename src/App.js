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
  const [isLoading, setLoading] = useState(true)
  const location = useLocation()

  const disableScroll = "overflow-hidden vh-100"
  const scrollStyle = isLoading ? disableScroll : ""

  const authProps = {
    loggedIn: loggedIn,
    setLoggedIn: setLoggedIn,
    user: user,
    setUser: setUser,
  }
  
  useEffect(() => {
    if (location.pathname !== '/'){
      setLoading(false)
    }
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
          <div className={scrollStyle}>
            <Navbar {...authProps} />
            <Routes>
              <Route path="/" element={<Home setLoading={setLoading}/>} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/products/:essentialoil_id" element={<Product {...authProps} />} />
              <Route path="/cart" element={<Cart {...authProps} />} />
              <Route path="/login" element={<Login {...authProps} />} />
              <Route path="/profile" element={<Profile {...authProps} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/paymentsuccess" element={<CheckoutSuccess />} />
            </Routes>
            <ScrollToTop />
            <Footer />
          </div>
        </AuthWrapper>
      </Fragment>
  )
}

export default App;
