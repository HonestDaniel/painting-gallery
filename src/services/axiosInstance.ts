import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://test-front.framework.team',
});

axiosInstance.interceptors.response.use(
  (response) =>
    response.data
  ,
  (error) => Promise.reject(error),
);

export default axiosInstance;
