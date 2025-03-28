import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const { product } = useLocation().state || {};
  const [phone, setPhone] = useState("");
  const img_url = "https://crimsonclein.pythonanywhere.com/static/images/";
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("amount", product.product_cost);
      formData.append("phone", phone);

      const response = await axios.post(
        "https://crimsonclein.pythonanywhere.com/api/mpesa_payment",
        formData
      );
    } catch {}
  };

  return (
    <div className="row justify-content-center mt-5">
      <h1 className="m-2">Make m-pesa Payment-LIPA NA M-PESA</h1>
      <div className="card shadow col-md-6 p-2">
        <h1 className="text-success">LIPA NA M-PESA</h1>
        <h3 className="text-secondary">{product.product_name}</h3>
        <p className="text-danger">{product.product_cost}</p>
        <img className="eco mt-4" src={img_url + product.product_photo}></img>
        <form action="" onSubmit={handlesubmit} className='form'>
          <input
            type="tel"
            placeholder="Enter 254*********"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <br /> <br />
          <br />
          <button type="submit" className="btn btn-warning">
            Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
