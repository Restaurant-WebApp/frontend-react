import React, { useState, useEffect } from "react";
import classes from "./menu.css";
import { fetchData } from "../API/APICall";

const Menu = ({ addToCart }) => {

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchData();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);
  
  const handleAddToCart = (product) => {
    addToCart(product);
    setCartItems([...cartItems, product]); // Update the cartItems state
  };
  

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product.productId}>
          <img src={product.productImageUrl} alt={product.productName} className="product-image" />
          <h3 className="product-name">{product.productName}</h3>
          <p className="product-description">{product.productDescription}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <button className="btn-addtocart" onClick={() => handleAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
  
};

export default Menu;



