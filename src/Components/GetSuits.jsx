import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "./Footer";

const GetSuits = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How may I help you today? Do you need me to help you select the perfect suit for your occasion?",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();
  const img_url = "https://crimsonclein.pythonanywhere.com/static/images/";

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://crimsonclein.pythonanywhere.com/api/get_product_details"
        );
        setProducts(response.data.products);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = storedCart.find(
      (item) => item.product_id === product.product_id
    );

    let updatedCart;
    if (existingProduct) {
      updatedCart = storedCart.map((item) =>
        item.product_id === product.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...storedCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);
  };

  const sendMessage = () => {
    if (!userInput.trim()) return;

    const newMessages = [...chatMessages, { sender: "user", text: userInput }];
    let botReply = "I'm not sure how to answer that yet.";

    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes("hello")) {
      botReply = "Hello there! 👋";
    } else if (lowerInput.includes("about")) {
      botReply =
        "We are SUTI FASHION KENYA, providing high-quality suits for every occasion, be it birthdays, weddings, work, dates, and even fashion.";
    } else if (lowerInput.includes("location") || lowerInput.includes("find")) {
      botReply =
        "You can visit our main store in Nairobi, Kenya, along Town Walk.";
    } else if (lowerInput.includes("contact")) {
      botReply =
        "You can contact us via email at sutifashionke@gmail.com or call us at +254-715-029-737.";
    } else if (
      lowerInput.includes("delivery") ||
      lowerInput.includes("ship") ||
      lowerInput.includes("shipping")
    ) {
      botReply =
        "We offer free delivery countrywide and also offer shipping services.";
    } else if (lowerInput.includes("product")) {
      botReply =
        "We offer a variety of stylish and affordable suits. Browse our collection!";
    } else if (lowerInput.includes("thank you")) {
      botReply = "You're welcome! Let me know if you need anything else.";
    }

    newMessages.push({ sender: "bot", text: botReply });
    setChatMessages(newMessages);
    setUserInput("");
  };

  return (
    <div className="container-fluid row">
      <div className="d-flex justify-content-end p-3">
        <button className="btn btn-success" onClick={() => navigate("/cart")}>
          View Cart {cartCount || 0}
        </button>
      </div>

      <h1>EXPLORE OUR SUITS</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search desired suit..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Carousel />

      <div className="row">
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-md-3 mb-4" key={product.product_id}>
              <div className="card shadow card-margin">
                <img
                  src={img_url + product.product_photo}
                  alt={product.product_name}
                  className="mt-4"
                />
                <div className="card-body">
                  <h5 className="mt-2">{product.product_name}</h5>
                  <p className="text-muted">{product.product_description}</p>
                  <b
                    className="text-warning"
                    style={{ marginBottom: "20px", display: "block" }}
                  >
                    Ksh. {Number(product.product_cost).toLocaleString()}
                  </b>
                  <button
                    className="btn btn-primary mt-2 w-100"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <br />
                  <button
                    className="btn btn-primary mt-2 w-100"
                    onClick={() => navigate("/payment", { state: { product } })}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info">
            No suits found. Try a different search term.
          </div>
        )}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <button
          className="btn btn-warning rounded-circle"
          onClick={() => setChatVisible(!chatVisible)}
        >
          💬
        </button>
      </div>

      {chatVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "350px",
            maxHeight: "400px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            padding: "10px",
            zIndex: 1000,
          }}
        >
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === "bot" ? "left" : "right",
                  margin: "5px 0",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "15px",
                    backgroundColor:
                      msg.sender === "bot" ? "#f1f1f1" : "#d1e7dd",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="d-flex mt-2">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Type a message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="btn btn-success" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GetSuits;
