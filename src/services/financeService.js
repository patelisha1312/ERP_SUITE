import axios from 'axios';

const API = 'http://localhost:5000/api/finance';


// Add Transaction
export const addTransaction = async (data) => {

  return await axios.post(
    `${API}/add`,
    data
  );

};


// Get Transactions
export const getTransactions = async () => {

  return await axios.get(API);

};