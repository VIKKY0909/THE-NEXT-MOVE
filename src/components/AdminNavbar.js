import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/dashboard/products" className="text-white">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/reviews" className="text-white">
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/faqs" className="text-white">
            FAQs
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
