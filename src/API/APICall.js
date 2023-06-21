import axios from "axios";
import authConfig from '../auth_config.json';

export const fetchData = async () => {
  try {
    const response = await axios.get("http://35.233.78.152/gateway/products");
    //const response = await axios.get("https://localhost:44379/products");
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
      //const response = await axios.post("https://localhost:44393/checkout", CheckoutHeader, {
      headers: {
        'Content-Type': 'application/json',
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
    await axios.delete(`https://${domain}/api/v2/users/${userId}`, {  // Deletes user from Auth0
      headers: {
        Authorization: `Bearer ${management_token}`
      }
    });
    console.log('User successfully deleted in Auth0.');
    await deleteUserData(email);    // Deletes User Data from Database
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

export const deleteUserData = async (email) =>{
  console.log(email);
  try{
    const response = await axios.delete(`http://35.233.78.152/gateway/DeleteUserData?email=${email}`);
    if (response.status === 200){
      console.log('Successfully deleted user data!!')
    }
  }catch (err){
    console.log(err)
  }
}
