import axios from "axios";

export const fetchData = async () => {
  try {
    const response = await axios.get("http://35.233.78.152/gateway/products");
    if (response.data.isSuccess) {
      return response.data.result;
    } else {
      throw new Error(response.data.displayMessage);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data");
  }
};

export const CheckoutCart = async (CheckoutHeader) => {
  try {
    console.log(CheckoutHeader);
    const response = await axios.post("http://35.233.78.152/gateway/checkout", CheckoutHeader, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000' // Add this header
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
