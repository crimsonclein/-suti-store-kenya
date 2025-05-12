import axios from "axios";
import React, { useState } from "react";
import Footer from "./Footer";

const AddSuit = () => {
  const [product_name, setProduct_name] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [product_cost, setProduct_cost] = useState("");
  const [product_photo, setProduct_photo] = useState("");

  const [adminPassword, setAdminPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  const correctAdminPassword = "@ajcsbest$"; // Admin password

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (adminPassword !== correctAdminPassword) {
      setError("Access denied: Incorrect admin password.");
      setSuccess("");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_description", product_description);
      formData.append("product_cost", product_cost);
      formData.append("product_photo", product_photo);

      const response = await axios.post(
        "https://crimsonclein.pythonanywhere.com/api/add_product",
        formData
      );
      if (response.data.message);
      setLoading("");
      setSuccess(response.data.message);
      setError("");
      setProduct_name("");
      setProduct_description("");
      setProduct_cost("");
      setProduct_photo("");
      setAdminPassword("");
    } catch (error) {
      setLoading("");
      setSuccess("");
      setError(error.message);
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-2">
        <h1>ADD SUIT</h1>
        {loading}
        {success && <div className="text-success">{success}</div>}
        {error && <div className="text-danger">{error}</div>}
        <form action="" onSubmit={handleSubmit} className="form">
          {/* Admin Password Input */}
          <div className="mb-3">
            <input
              placeholder="Enter admin password"
              type={passwordVisible ? "text" : "password"} // Toggle between text and password input type
              className="form-control"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            {/* Toggle password visibility */}
            <div>
              <input
                type="checkbox"
                checked={passwordVisible}
                onChange={() => setPasswordVisible(!passwordVisible)}
              />
              <label className="ms-2">Show Password</label>
            </div>
          </div>

          {/* Product Name Input */}
          <input
            placeholder="Enter product name"
            type="text"
            className="form-control"
            value={product_name}
            onChange={(e) => {
              setProduct_name(e.target.value);
            }}
          />
          <br />
          {/* Product Description Input */}
          <textarea
            placeholder="Enter product description"
            className="form-control"
            value={product_description}
            onChange={(e) => {
              setProduct_description(e.target.value);
            }}
          />
          <br />
          {/* Product Cost Input */}
          <input
            placeholder="Enter product cost"
            type="number"
            className="form-control"
            value={product_cost}
            onChange={(e) => {
              setProduct_cost(e.target.value);
            }}
          />
          <br />
          {/* Product Photo Input */}
          <input
            placeholder="Enter product photo"
            type="file"
            className="form-control"
            onChange={(e) => {
              setProduct_photo(e.target.files[0]);
            }}
          />
          <br />
          {/* Submit Button */}
          <button type="submit" className="btn btn-light">
            Add Suit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddSuit;
