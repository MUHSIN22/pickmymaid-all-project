import axios from 'axios';
import { validateAuthToken } from '../utils/validateJWT/validateJWT';

export const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8080/api/v1/',
  baseURL: 'https://api.pickmymaid.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
});

export const axiosInstanceV2 = axios.create({
  // baseURL: 'http://localhost:8080/api/v2/',
  baseURL: 'https://api.pickmymaid.com/api/v2/',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
})
// 'http://localhost:8080/api/v1/'
// 'https://api.pickmymaid.com/api/v1/'
axiosInstance.interceptors.request.use(validateAuthToken);
axiosInstanceV2.interceptors.request.use(validateAuthToken);
