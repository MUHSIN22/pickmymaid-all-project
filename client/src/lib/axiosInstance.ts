import axios from "axios";


const isBuildTime =
  process.env.NEXT_PUBLIC_DISABLE_API_DURING_BUILD === "true" &&
  process.env.NODE_ENV === "production";

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

if (isBuildTime) {
  const skipHandler = (config: any) => {
    console.warn("Skipping API call during build:", config.url);
    return Promise.reject(
      new Error("API calls are disabled during build in staging")
    );
  };

  axiosInstance.interceptors.request.use(skipHandler);
  axiosInstanceV2.interceptors.request.use(skipHandler);
}
// axiosInstance.interceptors.request.use(validateAuthToken);
