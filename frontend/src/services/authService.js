import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const registerVendor = async (data) => {
  const response = await axios.post(`${API_URL}/register/vendor`, data);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const registerCustomer = async (data) => {
  const response = await axios.post(`${API_URL}/register/customer`, data);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  login,
  registerVendor,
  registerCustomer,
  logout,
  getCurrentUser,
};

export default authService;
