import axios from 'axios';

export const http = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000 * 15,
    headers: {
        'Content-Type': 'application/json'
    }
});
