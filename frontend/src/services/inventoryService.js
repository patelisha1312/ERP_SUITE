import axios from 'axios';

const API = 'http://localhost:5000/api/inventory';


// Add Product
export const addProduct = async (data) => {

  return await axios.post(
    `${API}/add`,
    data
  );

};


// Get Products
export const getProducts = async () => {

  return await axios.get(API);

};