import './App.css';
import ProductListing from './pages/ProductListing';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import axios from "axios"

// import react router stuff
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineShopping, AiOutlineMenu } from "react-icons/ai";

const BASE_URL = "https://essential-oils-store.herokuapp.com"
// const BASE_URL = "https://8080-neomq-tgc16assignment3-9unf8jw59sc.ws-us44.gitpod.io"

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  // const [userName, setUserName] = useState("")

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
        // setUserName(response.data.name)
      }
    }
    checkAccesssToken()
  }

  return (
    <Router>

      <nav className="navbar navbar-expand-lg fixed-top p-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Aroma.</a>
          <button className="navbar-toggler navbar-item border-0" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
            <AiOutlineMenu/>
          </button>
          <div className="collapse navbar-collapse" id="nav">
            <div className="d-flex flex-fill justify-content-between">
              <div className="d-flex align-items-center">
                <a className="navbar-item btn fs-6" href="/products" role="button">Products</a>
              </div>

              <div className="d-flex">
              {loggedIn === true ?
                <a className="btn navbar-item fs-5" href="/profile" role="button"><AiOutlineUser/></a>
                : <a className="btn navbar-item fs-5" href="/login" role="button"><AiOutlineUser/></a>
                }
                <a className="btn navbar-item fs-5" href="/cart" role="button"><AiOutlineShopping/></a>
              </div>
            </div>
          </div>
        </div>
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

        {/* Register route */}
        <Route path="/register" element={<Register/>} />

        {/* Welcome route */}
        <Route path="/welcome" element={<Welcome/>} />

      </Routes>

    </Router>
  );
}

export default App;
