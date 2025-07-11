import axios from 'axios';
import store from '../app/store';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/adminpanel',
});

axiosInstance.interceptors.request.use((config) => {
    const access = localStorage.getItem('access');
    if (access) {
        config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
});

export default axiosInstance;
