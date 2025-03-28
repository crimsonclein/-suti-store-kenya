import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  //feedback states
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  //submit functon
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Loading................");
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      const response = await axios.post(
        "https://crimsonclein.pythonanywhere.com/api/signup",
        formData
      );
      setLoading("");

      setSuccess(response.data.success);
    } catch (error) {
      setLoading("");
      setSuccess("");
      setError(error.message);
    }
  };
  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-4 ">
        <h1 className="color-light">SIGN UP</h1>
        {loading}
        {success}
        {error}
        <form className="form" onSubmit={handleSubmit}>
          {/**Username input */}
          <input
            placeholder="  Enter  Username"
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          {/**email input */}
          <input
            placeholder=" Enter  email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <br />
          {/**phone input */}
          <input
            placeholder="  Enter  phone number"
            type="tel"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          {/**password input */}
          <input
            placeholder=" Enter password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {/**Submit Button */}
          <button type="submit" class="btn btn-light">
            Sign Up
          </button>
          <p>
            Already have an account?<Link to="/signin">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
