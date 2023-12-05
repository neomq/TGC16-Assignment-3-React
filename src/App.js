import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect, Fragment } from 'react';
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
import API from './constants/APIs';
//import jwt_decode from 'jwt-decode';
import axios from "axios"

const BASE_URL = process.env.REACT_APP_API_BASE_URL

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const location = useLocation()

  const AuthProps = {
    loggedIn: loggedIn,
    setLoggedIn: setLoggedIn,
    user: user,
    setUser: setUser,
  }
  
  useEffect(() => {
    window.scrollTo(0, -1)
  }, [location])

  useEffect(() => {
    // check for existing token
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      console.log(accessToken)
      // let tokenExpiry = jwt_decode(accessToken).exp
      // let timeNow = Math.round(new Date().getTime() / 1000)
      // if (timeNow >= tokenExpiry) {
      //   console.log("token is expired")
      //   const refreshToken = localStorage.getItem("refreshToken")
      //   const getRefreshToken = async() => {
      //     console.log("getting refresh token")
      //     const refreshResponse = await axios.post(BASE_URL + "/api/users/refresh", {
      //     refreshToken: refreshToken,
      //   })
      //     console.log("refreshResponse", refreshResponse.data.accessToken)
      //     localStorage.setItem("accessToken", refreshResponse.data.accessToken)
      //   }
      //   getRefreshToken()
      // }
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
        <Navbar {...AuthProps}/>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home/>}/>

          {/* Product Listing route */}
          <Route path="/products" element={<ProductListing/>} />

          {/* Individual product route */}
          <Route path="/products/:essentialoil_id" element={<Product/>} />

          {/* Cart route */}
          <Route path="/cart" element={<Cart {...AuthProps}/>} />

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
      </Fragment>
  );
}

export default App;
