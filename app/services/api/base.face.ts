import axios from 'axios';

const axiosFakeApi = axios.create({
  baseURL: 'https://fakestoreapi.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosFakeApi;
