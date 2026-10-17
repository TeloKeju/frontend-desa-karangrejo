import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';

// Create an instance of axios
const apiKarangrejo = axios.create({
    baseURL: import.meta.env.VITE_SEVER_ENDPOINT,
});

// Request interceptor
apiKarangrejo.interceptors.request.use(
    (config) => {
        // Kirim token Sanctum hasil login admin (jika ada)
        const token = getCookie('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
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
        // Token tidak valid / kedaluwarsa: hapus sesi dan arahkan ke halaman login admin
        const isLoginRequest = error?.config?.url?.includes('/login');
        if (error?.response?.status === 401 && !isLoginRequest) {
            deleteCookie('token');
            deleteCookie('username');
            if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiKarangrejo;

