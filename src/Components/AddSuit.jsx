import axios from "axios";
import React, { useState } from "react";

const AddSuit = () => {
  const [product_name, setProduct_name] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [product_cost, setProduct_cost] = useState("");
  const [product_photo, setProduct_photo] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setProduct_name("");
      setProduct_description("");
      setProduct_cost("");
      setProduct_photo("");
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
        {success}
        {error}
        <form action="" onSubmit={handleSubmit} className='form'>
          <input
            placeholder="enter product name"
            type="text"
            className="form-control"
            value={product_name}
            onChange={(e) => {
              setProduct_name(e.target.value);
            }}
          />
          <br />
          <textarea
            placeholder="enter product description"
            className="form-control"
            value={product_description}
            onChange={(e) => {
              setProduct_description(e.target.value);
            }}
          />
          <br />
          <input
            placeholder="enter product cost"
            type="number"
            className="form-control"
            value={product_cost}
            onChange={(e) => {
              setProduct_cost(e.target.value);
            }}
          />
          <br />
          <input
            placeholder="enter product photo"
            type="file"
            className="form-control"
            onChange={(e) => {
              setProduct_photo(e.target.files[0]);
            }}
          />
          <br />
          <button type="submit" className="btn btn-light">
            Add Suit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSuit;
