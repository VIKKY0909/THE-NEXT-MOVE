import React from 'react';
import Home from './Pages/Home.js';

import FAQ from './Pages/FAQ.js';

import OrderNow from './Pages/OrderNow.js';

import ProductCatalog from './Pages/ProductCatalog.js';

import Blog from './Pages/Blog.js';

import ContactUs from './Pages/ContactUs.js';

import Navbar from './components/Navigation/NavBar.jsx';
import './App.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer.js';



const App = () => {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/order-now" element={<OrderNow />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </div>
     
    <Footer/>
    </Router>

  );
};

export default App;
