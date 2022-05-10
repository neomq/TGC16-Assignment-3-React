import './App.css';
import ProductListing from './pages/ProductListing';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import axios from "axios"

// import react router stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from 'react';


// const BASE_URL = "https://essential-oils-store.herokuapp.com"
const BASE_URL = "https://3000-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [userId, setUserId] = useState(0)

  // check for access token
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    const checkAccesssToken = async () => {
      const response = await axios.get(BASE_URL + "/api/users/profile", {
        headers: {
          authorization: "Bearer " + accessToken
        }
      })
      console.log("access token", response.data)
      setUserId(response.data.id)

      // see if the id and returning access token is the same
      if (userId === parseInt(localStorage.getItem('id'))) {
        setLoggedIn(true)
        setUserId(userId)
      }
    }
    checkAccesssToken()
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
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link style={{
              display: loggedIn === true ? "block" : "none"
            }}>Welcome {userId}</Link>
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

      </Routes>

    </Router>
  );
}

export default App;
