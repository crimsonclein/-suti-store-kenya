import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartAndPayment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  // Update localStorage whenever cartItems change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Function to remove an item from the cart with confirmation
  const removeFromCart = (productId) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this item?"
    );
    if (!confirmRemove) return;

    const updatedCart = cartItems.filter(
      (item) => item.product_id !== productId
    );
    setCartItems(updatedCart); // Update the state
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]); // Clear the cart in state
    localStorage.removeItem("cart"); // Remove cart from localStorage
  };

  // Function to increase the quantity of an item
  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.product_id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart); // Update the state
  };

  // Function to decrease the quantity of an item
  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.product_id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCart); // Update the state
  };

  // Calculate total cost of items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.product_cost * item.quantity;
    }, 0);
  };

  // Function to handle form submission for M-Pesa payment
  const handlesubmit = async (e) => {
    e.preventDefault();

    // Validate phone number format
    const phoneRegex = /^254\d{9}$/; // Kenyan phone number format
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number in the format 254*********.");
      return;
    }

    // Clear previous messages
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("amount", calculateTotal());
      formData.append("phone", phone);

      const response = await axios.post(
        "https://crimsonclein.pythonanywhere.com/api/mpesa_payment",
        formData
      );

      if (response.status === 200) {
        setSuccess(
          "Payment request sent successfully. Please check your M-Pesa."
        );
      }
    } catch (err) {
      setError(
        "An error occurred while processing your payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Format the currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-Kenya", {
      style: "currency",
      currency: "KES",
    }).format(amount);
  };

  const totalAmount = calculateTotal();
  const totalAmountFormatted = formatCurrency(totalAmount);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>No items in cart.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/getsuit")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="row">
          {cartItems.map((item, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={`https://crimsonclein.pythonanywhere.com/static/images/${item.product_photo}`}
                  className="card-img-top"
                  alt={item.product_name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.product_name}</h5>
                  <p className="card-text">{item.product_description}</p>
                  <p className="text-warning">ksh {item.product_cost}</p>
                  <p className="text-muted">Quantity:</p>
                  <div className="d-flex flex-column align-items-start">
                    <div className="d-flex align-items-center mb-3">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => decreaseQuantity(item.product_id)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        className="form-control mx-2"
                        readOnly
                      />
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => increaseQuantity(item.product_id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.product_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Display the total amount and Pay button */}
      {cartItems.length > 0 && (
        <div className="d-flex justify-content-between mt-4">
          <h4>Total: {totalAmountFormatted}</h4>
          <button className="btn btn-danger" onClick={clearCart}>
            Clear Cart
          </button>
          <button
            className="btn btn-success"
            data-bs-toggle="collapse"
            data-bs-target="#paymentForm"
          >
            Pay Now
          </button>
        </div>
      )}

      {/* Payment Form */}
      <div className="collapse" id="paymentForm">
        <div className="card shadow mt-4 p-4">
          <h3 className="text-success">LIPA NA M-PESA</h3>
          <form onSubmit={handlesubmit}>
            <input
              type="tel"
              placeholder="Enter 254*********"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control mb-3"
              required
            />
            <button
              type="submit"
              className="btn btn-warning"
              disabled={loading}
            >
              {loading ? "Processing..." : "Purchase"}
            </button>
          </form>

          {/* Error and Success Messages */}
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          {success && <div className="alert alert-success mt-2">{success}</div>}
        </div>
      </div>
    </div>
  );
};

export default CartAndPayment;
