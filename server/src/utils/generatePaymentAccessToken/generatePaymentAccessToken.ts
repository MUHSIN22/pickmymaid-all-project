import axios from "axios";

export const generateAccessToken = async () => {
    const api_key = process.env.PG_API_KEY;
    const baseURL = process.env.PG_BASE_URL;
    const {data:{access_token}} = await axios.post(`${baseURL}/identity/auth/access-token`,null, {
        headers: {
            'Content-Type': 'application/vnd.ni-identity.v1+json',
            'Authorization': `basic ${api_key}`

        }
    })
    return access_token as string;
}