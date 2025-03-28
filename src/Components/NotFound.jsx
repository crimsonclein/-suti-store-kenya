import React from "react";
import { useNavigate } from "react-router-dom";
import sadboy from "./Images/sadboyinabag.jpg";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <h1>The URL you entered is not Not Found</h1>
      <img className="sadboy" src={sadboy} alt="" />

      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
    </div>
  );
};

export default NotFound;
