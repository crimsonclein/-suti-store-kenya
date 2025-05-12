import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import { BrowserRouter, Route, Routes, Link} from "react-router-dom";
import SignUp from "./Components/ SignUp";
import SignIn from "./Components/SignIn";
import AddSuit from "./Components/AddSuit";
import GetSuits from "./Components/GetSuits";
import Payment from "./Components/Payment";
import NotFound from "./Components/NotFound";
import Cart from './Components/Cart';  // Cart component (now in cart.jsx)
import { CartProvider } from './Components/CartContext'; // Corrected path
import AllComments from "./Components/AllComments";
import Fix from "./Fix";



const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="/signup" className="links">
            Signup
          </Link>
          <Link to="/signin" className="links">
            Signin
          </Link>
          <Link to="/addsuit" className="links">
            addsuits
          </Link>
          <Link to="/getsuit" className="links">
            getsuits
          </Link>

          <Link to="/chatbot" className="links">
            chatbot
          </Link>
        </nav>
        <header className="App-header">
          <h1>SUTI FASHION KENYA</h1>
        </header>

        <CartProvider>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/addsuit" element={<AddSuit />} />
            <Route path="/getsuit" element={<GetSuits />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<GetSuits />} />
            <Route path="/cart" element={<Cart />} /> {/* Cart page */}
            <Route path="/comments" element={<AllComments />} />
            <Route path="/chatbot" elements={<Fix />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
