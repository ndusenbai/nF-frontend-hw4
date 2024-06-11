import axios from 'axios';

const axiosUploadApi = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1/files/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosUploadApi;
