import './App.css';
import ProductListing from './pages/ProductListing';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import axios from "axios"

// import react router stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from 'react';

// const BASE_URL = "https://essential-oils-store.herokuapp.com"
const BASE_URL = "https://8080-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  

  // check for access token
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    
    const checkAccesssToken = async () => {

      const response = await axios.get(BASE_URL + "/api/users/profile", {
        headers: {
          authorization: "Bearer " + accessToken
        }
      })
      
      console.log(response.data)
      console.log(response.data.id)
 
      // see if the id and returning access token is the same
      if (response.data.id === parseInt(localStorage.getItem('id'))) {
        setLoggedIn(true)
        setUserName(response.data.name)
      }
    }
    checkAccesssToken()
  }

  // logout
  const logout = async () => {
    const response = await axios.post(BASE_URL + "/api/users/logout", {
      'refreshToken': localStorage.getItem('refreshToken')
    })

    if (response.data) {
      localStorage.clear()
      setLoggedIn(false)
      setUserName("")
    }
  }

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link
              style={{ display: loggedIn === true ? "none" : "block" }}
              to="/login">Login
            </Link>
            <p className="m-0"
              style={{ display: loggedIn === true ? "block" : "none" }}>
              Welcome, {userName}
            </p>
            <Link 
              style={{ display: loggedIn === true ? "block" : "none" }}
              onClick={logout}
              to="/">Logout
            </Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
      
      <Routes>

        {/* Home route */}
        <Route path="/" element={<Home/>} />

        {/* Product Listing route */}
        <Route path="/products" element={<ProductListing/>} />

        {/* Individual product route */}
        <Route path="/products/:product_id" element={<Product/>} />

        {/* Cart route */}
        <Route path="/cart" element={<Cart/>} />

        {/* Login route */}
        <Route path="/login" element={<Login/>} />

        {/* Profile route */}
        <Route path="/profile" element={<Profile/>} />

      </Routes>

    </Router>
  );
}

export default App;
