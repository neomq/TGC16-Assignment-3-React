import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Fragment, useState, useEffect } from 'react';
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
import API from './constants/api';
import axios from "axios"

const BASE_URL = process.env.REACT_APP_API_BASE_URL

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  const AuthProps = {
    loggedIn: loggedIn,
    setLoggedIn: setLoggedIn,
    user: user,
    setUser: setUser,
  }

  useEffect(() => {
    // check for existing token
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      console.log(accessToken)
      const checkAccesssToken = async () => {
        const response = await axios.get(BASE_URL + API.PROFILE, {
          headers: {
            authorization: "Bearer " + accessToken
          }
        })

        // see if the id and returning access token is the same
        if (response.data.id === parseInt(localStorage.getItem('id'))) {
          setLoggedIn(true)
          // setUserName(response.data.name)
        }
      }
      checkAccesssToken()
    }
  }, [])
  
  return (
    <Fragment>
      <Router>
        <Navbar {...AuthProps}/>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home/>}/>

          {/* Product Listing route */}
          <Route path="/products" element={<ProductListing/>} />

          {/* Individual product route */}
          <Route path="/products/:essentialoil_id" element={<Product/>} />

          {/* Cart route */}
          <Route path="/cart" element={<Cart/>} />

          {/* Login route */}
          <Route path="/login" element={<Login {...AuthProps}/>} />

          {/* Profile route */}
          <Route path="/profile" element={<Profile {...AuthProps}/>} />

          {/* Register route */}
          <Route path="/register" element={<Register/>} />

          {/* Checkout success route */}
          <Route path="/paymentsuccess" element={<CheckoutSuccess/>} />
        </Routes>
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
