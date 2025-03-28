import React from "react";
import photo from "../Components/Images/insatagram.jpeg";
import photo1 from "../Components/Images/fb.png";
import photo2 from "../Components/Images/twitter.avif";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          <p style={copyrightStyle}>
            &copy; 2025 SUTI FASHION KENYA. All rights reserved.
          </p>
          <nav>
            <ul style={navStyle}>
              <li>
                <h6 style={headStyle}>About Us</h6>
              </li>
              <br />
              <p style={linkStyle}>
                Welcome to <b>SUTI FASHION KENYA</b>, the most trusted suit
                company in kenya . Our sits are designed to make you look callsy
                with a touch of egegance and style. . When you shop with
                <b>SUTI FASHOIN KENYA </b>, you're not just a loyal customer
                ,but you're part of the <b>SUTI FASHOIN KENYA </b>, family. We
                believe that the best memories of your favourite ocassions
                wheather Weddings,Birthdays or even Work experiences are defined
                by what you wear.we do free delivery world-wide
              </p>
              <br />
              <li>
                <h6 style={headStyle}>Contact Us</h6>{" "}
              </li>
              <p style={linkStyle}>
                We'd love to hear from you! Whether you have questions about our
                suit designs, need for classy suit designs and any other ideas
                to make our suits your favourite.
                <br />
                Phone: Call us at 0715029737 for inquiries, orders, or just to
                chat about your next order!
                <br />
                Email: Send us an email at sutifashionke@gmail.com and we’ll get
                back to you as soon as possible. We love to hear from our
                customers!
              </p>
              <li>
                <h6 style={headStyle}>Private Policy</h6>
              </li>
              <p style={linkStyle}>
                At <b>SUTI FASHION KENYA </b>, we respect your privacy and are
                committed to protecting the personal information you share with
                us. This Privacy Policy outlines how we collect, use, and
                protect your personal data when you visit our website or order
                from us.
              </p>
            </ul>
          </nav>
        </div>
        <div style={socialIconsStyle}>
          <h4 class="text-center text-primary">Stay Connected</h4>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={iconStyle}
          >
            <img src={photo1} alt="Facebook" style={iconImageStyle} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={iconStyle}
          >
            <img src={photo} alt="Instagram" style={iconImageStyle} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={iconStyle}
          >
            <img src={photo2} alt="Twitter" style={iconImageStyle} />
          </a>
        </div>
      </div>
      <br />
      <div class="bg-dark text-light text-center">
        <b class="text-light">
          Created and  Developed by CLEIN, &copy; 2025 . All Rights Resevered
        </b>
      </div>
    </footer>
  );
};

// Inline styles for the footer
const footerStyle = {
  backgroundColor: " light blue", // Light blue background to represent the ocean
  backgroundSize: "cover",
  color: "black",
  padding: "20px 0",
  textAlign: "center",
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 20px",
  alignitems: "center",
  justifyContent: "space-between",
};

const contentStyle = {
  marginBottom: "30px",
};

const copyrightStyle = {
  fontSize: "1.2rem",
  marginBottom: "10px",
};

const navStyle = {
  listStyleType: "none",
  padding: "0",
  margin: "0",
  display: "flex",
  justifyContent: "center",
  backgroundColor: " white",
};

const linkStyle = {
  color: "black",
  textDecoration: "none",
  margin: "5px 5px",
  textAlign: "left",
};

const socialIconsStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "20px",
};

const iconStyle = {
  display: "block",
  width: "40px",
  height: "40px",
};

const iconImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
};
const headStyle = {
  color: "blue",
  textDecoration: "none",
  margin: "5px 5px",
  textAlign: "left",
};

export default Footer;
