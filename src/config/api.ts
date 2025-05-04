import axios from 'axios';

const API = axios.create({
    baseURL: `${import.meta.env.WXT_API_URL}/api`,
    headers: {
        "Content-Type": 'application/json',
        "ngrok-skip-browser-warning": "69420"
    },
    withCredentials: true,
})

export default API;