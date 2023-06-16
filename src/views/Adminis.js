import React, { useState, useEffect } from "react";
import { fetchData } from "../API/APICall";
import styles from "./Adminis.module.css";
import { AddItem, DeleteItem } from "../API/APICall";

const Adminis = () => {
  const [products, setProducts] = useState([]);
  const [newItem, setNewItem] = useState({
    productId: "",
    productName: "",
    productDescription: "",
    productImageUrl: "",
    price: 0,
  });
  const [isLoading, setIsLoading] = useState(false);


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

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await AddItem(newItem);
      setProducts([...products, response]);
      setNewItem({
        productId: "",
        productName: "",
        productDescription: "",
        productImageUrl: "",
        price: 0,
      });
    } catch (error) {
      console.log("Failed to add item:", error);
    }finally{
      setIsLoading(false);
    }
  };
  const handleDeleteItem = async (productId) => {
    try {
      const response = await DeleteItem(productId);
      if (response) {
        setProducts(products.filter((item) => item.productId !== productId));
      }
    } catch (error) {
      console.log("Failed to delete item:", error);
    }
  };

  

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>Add New Item</h1>
        <form className={styles.form_container} onSubmit={handleAddItem}>
          <label>
            Product ID:
            <input
              type="number"
              name="productId"
              value={newItem.productId}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Product Name:
            <input
              type="text"
              name="productName"
              value={newItem.productName}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Product Description:
            <input
              type="text"
              name="productDescription"
              value={newItem.productDescription}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Image URL:
            <input
              type="text"
              name="productImageUrl"
              value={newItem.productImageUrl}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={newItem.price}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit" className={styles.formButton}>
            Add Item
          </button>
        </form>
      </div>
      <div className={styles.right}>
        <h1>All Items</h1>
        {isLoading ? (
          <p>Loading...</p>
          ) : (
            products.map((item, index) => (
              <div key={index} className={styles.item_container}>
                <img
                  src={item.productImageUrl}
                  alt={item.productName}
                  className={styles.item_image}
                />
                <div className={styles.item_details}>
                  <p className={styles.item_name}>{item.productName}</p>
                  <div className={styles.item_buttons}>
                    <button className={styles.edit_button}>Edit</button>
                    <button className={styles.delete_button} onClick={() => handleDeleteItem(item.productId)}>Delete</button>
                  </div>
                </div>
              </div>
            ))            
        )}
      </div>
    </div>
  );
};

export default Adminis;
