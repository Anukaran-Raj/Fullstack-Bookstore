import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import "./Cart.css"; // ✅ Import the CSS file

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Cart Items:", cartItems);

  // Calculate total amount safely
  const totalAmount = cartItems.reduce((total, item) => {
    if (!item.price) return total;

    let price = item.price;
    if (typeof price === "string") {
      price = parseFloat(price.replace(/[$,]/g, ""));
    }

    if (isNaN(price)) {
      console.warn(`Invalid price detected for item: ${item.title}`, item);
      return total; // Skip invalid prices
    }

    return total + price;
  }, 0);

  const handleProceedToPayment = () => {
    navigate("/payment", { state: { cartItems, totalAmount } });
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={item.id || index} className="cart-item">
                <span>{item.title} - ${item.price}</span>
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h4 className="total-amount">
            Total Amount: ${totalAmount.toFixed(2)}
          </h4>
          <div className="cart-actions">
            <button
              className="clear-cart-btn"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
            <button
              className="proceed-btn"
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
