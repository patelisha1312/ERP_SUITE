import axios from 'axios';

const API = 'http://localhost:5000/api/employees';

export const addEmployee = async (employeeData) => {

  return await axios.post(
    `${API}/add`,
    employeeData
  );

};

export const getEmployees = async () => {

  return await axios.get(API);

};

export const deleteEmployee = async (id) => {

  return await axios.delete(
    `${API}/delete/${id}`
  );

};
export const updateEmployee = async (id, employeeData) => {

  return await axios.put(
    `${API}/update/${id}`,
    employeeData
  );

};