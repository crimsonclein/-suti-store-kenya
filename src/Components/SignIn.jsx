import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("connecting........");
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "https://crimsonclein.pythonanywhere.com/api/signin",
        formData
      );
      setLoading("");

      if (response.data.user) {
        setSuccess(response.data.message);
        setError("");
        navigate("/");
      } else {
        setSuccess(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-2">
        <h1>SIGN IN</h1>
        {loading}
        {success}
        {error}
        <form action="" onSubmit={handleSubmit} className='form'>
          <input
            placeholder="enter your email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <br />
          <input
            placeholder="enter your password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <button type="submit" className="btn btn-light">
            SignIn
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
