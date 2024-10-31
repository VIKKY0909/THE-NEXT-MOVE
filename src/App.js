import React, { useState, useEffect } from 'react';
import Home from './Pages/Home.js';
import FAQ from './Pages/FAQ.js';
import OrderNow from './Pages/OrderNow.js';
import ProductCatalog from './Pages/ProductCatalog.js';
import Blog from './Pages/Blog.js';
import ContactUs from './Pages/ContactUs.js';
import ContactManager from './Pages/ContactManager.js'; // Import ContactManager
import Navbar from './components/Navigation/NavBar.jsx';
import Footer from './components/Footer/Footer.js';
import Login from './Pages/Login.js';
import Dashboard from './Pages/Dashboard.js';
import ProductList from './Pages/ProductList.js';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BlogManager from './Pages/BlogManager.js';
import ReviewManager from './Pages/ReviewManager.js';
import FaqManager from './Pages/FaqManager.js';
import BlogDetail from './Pages/BlogDetail.js';

const App = () => {
  // Simulate user authentication (replace this with your actual authentication logic)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status when the component mounts (you can replace this logic with your own)
  useEffect(() => {
    const token = localStorage.getItem("token"); // Check if user token exists in localStorage
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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
          <Route path="/contact-manager" element={<ContactManager />} /> {/* New route for ContactManager */}
          <Route path="/znmd" element={<Login setIsAuthenticated={setIsAuthenticated} />} /> {/* Pass down login handler */} 
          <Route path="/blog/:id" element={<BlogDetail />} />
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="products" element={<ProductList />} />
            <Route path="blogs" element={<BlogManager />} />
            <Route path="reviews" element={<ReviewManager />} />
            <Route path="faqs" element={<FaqManager />} />
            <Route path="contacts" element={<ContactManager />} /> {/* Optionally include in protected routes */}
          </Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
