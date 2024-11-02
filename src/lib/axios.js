import axios from 'axios';

// Create an instance of axios
const apiKarangrejo = axios.create({
    baseURL: import.meta.env.VITE_SEVER_ENDPOINT,
});

// Request interceptor
apiKarangrejo.interceptors.request.use(
    (config) => {
        // Modify request config here if needed
        // For example, adding headers
        config.headers['Authorization'] = 'Bearer your_token_here';
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Response interceptor
apiKarangrejo.interceptors.response.use(
    (response) => {
        // Handle response data
        return response;
    },
    (error) => {
        // Handle response error
        return Promise.reject(error);
    }
);

export default apiKarangrejo;

