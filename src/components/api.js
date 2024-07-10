import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dresscode-test.onrender.com', 
});

export default api;