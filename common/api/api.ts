import { get_async } from '@/services/store';
import axios from 'axios';



const publicInstance = axios.create({
    baseURL: "http://192.168.3.29:3000/",
});


const privateInstance = axios.create({
    baseURL: "http://192.168.3.29:3000/",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Accept-language' : 'ukr'
    },
});



publicInstance.interceptors.response.use(
    async (response: any) => response,
    async (error: { config: any; response: { status: number; }; }) => Promise.reject(error.response),
);


privateInstance.interceptors.request.use(
    async config => {
        const accessToken = await get_async('access_token');
        const refreshToken = await get_async('refresh_token');
        if (accessToken && config.headers) {
            config.headers.Authorization = 'Bearer ' + accessToken;
        }
        config.headers['Cookie'] = `${refreshToken}`;
        return config;
    },
    error => Promise.reject(error),
);


export const apiPublic = publicInstance;
export const apiPrivate = privateInstance;
