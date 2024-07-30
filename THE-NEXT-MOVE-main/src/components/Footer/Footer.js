import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import HLogo from '../../assets/HLogo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
        <div className="flex flex-col items-start sm:items-center sm:text-center lg:items-start lg:text-left">
          <div className="flex items-center mb-4">
            <img src={HLogo} alt="TNM Logo" className="w-24 h-12 mr-3" />
            <div>
              <h2 className="font-bold text-xl">The Next Move</h2>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            The advantage of hiring a workspace with us is that it gives you comfortable service and all-around facilities.
          </p>
          <p className="text-sm text-gray-600">© 2024</p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-bold text-gray-900">Services</h3>
          <ul className="text-gray-600">
            <li><a href="#" className="hover:text-black">Subscribe</a></li>
            <li><a href="product-catalog" className="hover:text-black">Product</a></li>
            <li><a href="order-now" className="hover:text-black">Orders</a></li>
            
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-bold text-gray-900">Website Links</h3>
          <ul className="text-gray-600">
            <li><a href="#" className="hover:text-black">Home</a></li>
            <li><a href="faq" className="hover:text-black">FAQs</a></li>
            <li><a href="blog" className="hover:text-black">Blogs</a></li>
            
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-bold text-gray-900">Follow Us</h3>
          <ul className="text-gray-600">
            <li>
              <a href="#" className="hover:text-black flex items-center">
                <FaFacebook className="mr-2" /> Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black flex items-center">
                <FaTwitter className="mr-2" /> Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black flex items-center">
                <FaInstagram className="mr-2" /> Instagram
              </a>
            </li>
          </ul>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
