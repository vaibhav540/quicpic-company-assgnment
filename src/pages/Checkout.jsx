import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
  const cart = useSelector((state) => state.handleCart);

  const EmptyCart = () => (
    <div className="text-center py-5">
      <h4>Your cart is empty!</h4>
      <Link to="/" className="btn btn-primary mt-3">
        Continue Shopping
      </Link>
    </div>
  );

  const ShowCheckout = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
    const shipping = 30.0;
    const totalItems = cart.reduce((total, item) => total + item.qty, 0);

    return (
      <div className="checkout">
        <div className="summary p-3 mb-4">
          <h4>Order Summary</h4>
          <p>Products: {totalItems}</p>
          <p>Subtotal: ₹{Math.round(subtotal)}</p>
          <p>Shipping: ₹{shipping}</p>
          <h5>Total: ₹{Math.round(subtotal + shipping)}</h5>
        </div>

        <div className="billing-form p-3">
          <h4>Billing Details</h4>
          <form>
            <input type="text" placeholder="First Name" className="form-control my-2" required />
            <input type="text" placeholder="Last Name" className="form-control my-2" required />
            <input type="email" placeholder="Email" className="form-control my-2" required />
            <input type="text" placeholder="Address" className="form-control my-2" required />
            <input type="text" placeholder="City" className="form-control my-2" required />
            <input type="text" placeholder="State" className="form-control my-2" required />
            <input type="text" placeholder="Zip Code" className="form-control my-2" required />
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Proceed to Checkout
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h2 className="text-center mb-4">Checkout</h2>
        {cart.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
