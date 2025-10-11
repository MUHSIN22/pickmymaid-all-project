import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}v1/`,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  withCredentials: true,
});

export const axiosInstanceV2 = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}v2/`,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  withCredentials: true,
});
// axiosInstance.interceptors.request.use(validateAuthToken);
