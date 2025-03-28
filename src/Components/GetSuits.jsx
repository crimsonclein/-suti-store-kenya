import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "./Footer";


const GetSuits = () => {
  const [products, setProducts] = useState([]);
  const img_url = "https://crimsonclein.pythonanywhere.com/static/images/";
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate("");

  const getProducts = async () => {
    setLoading("please wait...");

    try {
      const response = await axios.get(
        "https://crimsonclein.pythonanywhere.com/api/get_product_details"
      );
      setLoading("");
      setProducts(response.data.products);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid row">
      <h1>EXPLORE OUR SUITS</h1>
      {error}
      {loading}

      <br />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search desired suit..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Carousel />
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card shadow card-margin">
                <img
                  src={img_url + product.product_photo}
                  className="mt-4"
                  alt={product.product_photo}
                />
                <div className="card-body">
                  <h5 className="mt-2">{product.product_name}</h5>
                  <p className="text-muted">{product.product_description}</p>
                  <b className="text-warning">{product.product_cost}</b>
                  <br />
                  <br />
                  <button
                    className="btn btn-primary mt-2 w-100"
                    onClick={() => navigate("/payment", { state: { product } })}
                  >
                    Show details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No Suits found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GetSuits;

