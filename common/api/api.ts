import { get_async } from '@/services/store';
import axios from 'axios';


const publicInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});


const privateInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Accept-language' : 'ukr'
    },
});



publicInstance.interceptors.response.use(
    async (response: any) => {
        if (response.status === 401) {
            console.log(response)
        }
        else{
            console.log(response)
        }
        return response;
    },
    async (error: { config: any; response: { status: number; }; }) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            console.log(error)
        }
        return Promise.reject(error.response.data);
    },
);


privateInstance.interceptors.request.use(
    async config => {
        const accessToken = await get_async('access_token');
        const refreshToken = await get_async('refresh_token');
        if (accessToken && config.headers) {
            config.headers.Authorization = 'Bearer ' + accessToken;
        }
        config.headers['Cookie'] = `refreshToken=${refreshToken}`;
        return config;
    },
    error => Promise.reject(error),
);


export const apiPublic = publicInstance;
export const apiPrivate = privateInstance;
