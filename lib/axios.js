import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Check if the user is logged in
//     const isLogged = localStorage.getItem('isLogged');

//     if (!isLogged || isLogged !== 'true') {
//       throw new Error('Unauthenticated');
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosInstance;
