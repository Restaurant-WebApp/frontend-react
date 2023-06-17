import axios from "axios";
import authConfig from '../auth_config.json';

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

export const AddItem = async (item) => {
  try {
    const response = await axios.post("http://35.233.78.152/gateway/product", item,{
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.data.isSuccess) {
      return response.data.result;
    } else {
      throw new Error(response.data.displayMessage);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add the item ");
  }
};

export const DeleteItem = async (itemId) => {
  console.log("before calling DeleteItem function");
  try {
    const response = await axios.delete(`http://35.233.78.152/gateway/product?id=${itemId}`);
    console.log(response.data);
    if (response.data.isSuccess) {
      return response.data.result;
    } else {
      throw new Error(response.data.displayMessage);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete the item ");
  }
};


export const CheckoutCart = async (CheckoutHeader) => {
  try {
    console.log(CheckoutHeader);
    const response = await axios.post("http://35.233.78.152/gateway/checkout", CheckoutHeader, {
      headers: {
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': 'http://localhost:3000' 
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (email) => {
  const { domain, management_token } = authConfig;

  try {
    const userId = await getUserIdFromDetails(email)
    console.log("Inside delete function: ", userId)
    await axios.delete(`https://${domain}/api/v2/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${management_token}`
      }
    });
    console.log('User deleted successfully.');
  } catch (error) {
    console.error('Failed to delete user:', error.response.data);
  }
};

export const getUserIdFromDetails = async (email) => {
  const { domain, management_token } = authConfig;
  const options = {
    method: 'GET',
    url: `https://${domain}/api/v2/users`,
    params: { q: `email:"${email}"`, search_engine: 'v3' },
    headers: { authorization: `Bearer ${management_token}` }
  };

  try {
    const response = await axios.request(options);
    const userId = response.data[0].user_id; 
    console.log("response :" , response);
    console.log(userId);
    return userId;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve user details');
  }
};
