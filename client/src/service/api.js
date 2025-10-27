import axios from 'axios';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const API = {
    userSignup: async (user) => {
        try {
            const response = await axiosInstance.post('/signup', user);
            return response.data;
        } catch (error) {
            console.log('Error while calling signup API ', error);
            throw error;
        }
    },

    authenticateLogin: async (user) => {
        try {
            const response = await axiosInstance.post('/login', user);
            if (response.data.accessToken) {
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', response.data.refreshToken);
            }
            return response.data;
        } catch (error) {
            console.log('Error while calling login API ', error);
            throw error;
        }
    }
};