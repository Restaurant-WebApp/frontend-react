import React, { useState } from "react";
import classes from "./CartItem.module.css";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={classes.cartItem}>
      <img
        src={item.productImageUrl}
        alt={item.productName}
        className={classes.cartItemImage}
      />
      <div className={classes.cartItemDetails}>
        <h4 className={classes.productName}>{item.productName} </h4>
        <div className={classes.quantityContainer}>
          <button
            className={classes.quantityButton}
            onClick={handleDecreaseQuantity}
          >
            -
          </button>
          <span className={classes.quantity}>{quantity}</span>
          <button
            className={classes.quantityButton}
            onClick={handleIncreaseQuantity}
          >
            +
          </button>
        </div>
        <p className={classes.price}>Price: ${item.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
