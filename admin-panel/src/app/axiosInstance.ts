import axios from 'axios';
import { validateAuthToken } from '../utils/validateJWT/validateJWT';

const apiEndpoint:string = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: `${apiEndpoint}v1/`,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
});

export const axiosInstanceV2 = axios.create({
  baseURL: `${apiEndpoint}v2/`,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
})
// 'http://localhost:8080/api/v1/'
// 'https://api.pickmymaid.com/api/v1/'
axiosInstance.interceptors.request.use(validateAuthToken);
axiosInstanceV2.interceptors.request.use(validateAuthToken);
