import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'test-front.framework.team',
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) =>
    // You can modify the response data here, e.g., handling pagination
    response.data
  ,
  (error) => Promise.reject(error)
);

export default axiosInstance;
