import axios, { type AxiosRequestConfig } from 'axios';
import { apiRoutes } from './api-routes';
import { tgUser } from "@/stores/mainstore";


const isLive = false;
const baseURL = isLive ? 'https://www.statugram.com/api' : 'http://192.168.1.119:7979';

// Create Axios instance with baseURL
const api = axios.create({
    baseURL,
});

// Adding an interceptor
api.interceptors.request.use(
    (config) => {
        const userId = tgUser()?.id;
        if (userId) {
            config.headers['x-t-id'] = userId;
        } else {
            console.warn('User ID not found for header x-t-id');
        }
        return config;
    },
    (error) => {
        // Handle request error
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Adding a response interceptor
api.interceptors.response.use(
    (response) => {
        // Handle successful responses
        console.log('Response received:', response.data);
        return response;
    },
    (error) => {
        // Handle response error
        console.log(error?.response?.data)
        console.error('Response error:', error);
        return Promise.reject(error);
    }
);


// Function to make API calls using the defined routes
const apiCall = async (routeFunc: keyof typeof apiRoutes, pathTo: string = '/', ...args: any[]) => {
    const { method, path, data } = apiRoutes[routeFunc](args, pathTo);
    const config: AxiosRequestConfig = { method, url: path };

    if (data) {
        config.data = data;
    }

    try {
        const response = await api(config);
        return response.data;
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
};

// Export the configured Axios instance
export { api, apiCall };
