import axios from "axios";



// Base instance for non-authenticated calls  
export const starpiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
});

// Create a separate instance for authenticated calls
export const authenticatedStrapiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  headers: {
    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPIE_TOKEN}`,
    "Content-Type": "application/json"
  }
});
