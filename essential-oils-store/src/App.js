import './App.css';
import ProductListing from './pages/ProductListing';
import Product from './pages/Product';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import Login from './pages/Login';

// import react router stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
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
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
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

        {/* Contact Us route */}
        <Route path="/contact" element={<ContactUs/>} />

        {/* Login route */}
        <Route path="/login" element={<Login/>} />

      </Routes>

    </Router>
  );
}

export default App;
