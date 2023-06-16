import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./menu.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:44379/products")
      .then(response => {
        if (response.data.isSuccess) {
          setProducts(response.data.result);
        } else {
          console.log(response.data.displayMessage);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <><div className="product-card" key={product.productId}>
          <img
            src={product.productImageUrl}
            alt={product.productName}
            className="product-image" />
          <h3 className="product-name">{product.productName}</h3>
          <p className="product-description">{product.productDescription}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <button className="btn-addtocart">Add to Cart</button>
        </div>
        </>
      ))}
    </div>
  );
};

export default ProductList;



