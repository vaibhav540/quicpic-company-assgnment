import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  // Retrieve the cart items from Redux store
  const cartItems = useSelector((state) => state.handleCart);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        {/* Brand Logo */}
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          E-commerce Product Catalog
        </NavLink>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav m-auto text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="d-flex align-items-center justify-content-center">
            <NavLink to="/login" className="btn btn-outline-dark me-2">
              <i className="fa fa-sign-in-alt me-1"></i> Login
            </NavLink>
            <NavLink to="/register" className="btn btn-outline-dark me-2">
              <i className="fa fa-user-plus me-1"></i> Register
            </NavLink>
            <NavLink to="/cart" className="btn btn-outline-dark">
              <i className="fa fa-cart-shopping me-1"></i> Cart ({cartItems.length})
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
